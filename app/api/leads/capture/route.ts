/**
 * Lead Capture API — Follow Up Boss events (standard site pattern)
 */

import { NextRequest, NextResponse } from 'next/server';
import { leadFormLimiter, getClientId, checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

const FUB_SITE = 'springvalleylasvegashomes.com';

export interface LeadCaptureRequest {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  stage?: string;
  tags?: string[];
  message?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  neighborhoods?: string[];
  timeline?: string;
  financing?: string;
  preApproved?: boolean;
  turnstileToken?: string;
  customFields?: Record<string, unknown>;
  formType?: 'contact' | 'property-search' | 'home-valuation' | 'newsletter';
  sourceUrl?: string;
  description?: string;
  /** Honeypot — must stay empty */
  company?: string;
  website?: string;
}

type FubEventType =
  | 'General Inquiry'
  | 'Seller Inquiry'
  | 'Property Inquiry'
  | 'Registration';

async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not configured - skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function splitName(data: LeadCaptureRequest): { firstName: string; lastName: string } {
  if (data.firstName || data.lastName) {
    return {
      firstName: data.firstName?.trim() || '',
      lastName: data.lastName?.trim() || '',
    };
  }
  const parts = (data.name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function buildAttributionTags(
  data: LeadCaptureRequest,
  request: NextRequest
): string[] {
  const tags: string[] = [];
  const url = new URL(request.url);

  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');
  if (utmSource) {
    tags.push(`utm:${utmSource}`);
    if (utmMedium) tags.push(`utm-medium:${utmMedium}`);
    if (utmCampaign) tags.push(`utm-campaign:${utmCampaign}`);
  }

  if (data.source) {
    tags.push(`form-source:${data.source}`);
  }

  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      if (
        !refUrl.hostname.includes('springvalleylasvegashomes.com') &&
        !refUrl.hostname.includes('heyberkshire.com') &&
        !refUrl.hostname.includes('realscout.com') &&
        !refUrl.hostname.includes('localhost')
      ) {
        tags.push(`referrer:${refUrl.hostname}`);
      }
    } catch {
      // ignore invalid referrer
    }
  }

  return tags;
}

function resolveEventType(data: LeadCaptureRequest): FubEventType {
  const formType = data.formType;
  if (formType === 'home-valuation') return 'Seller Inquiry';
  if (formType === 'newsletter') return 'Registration';
  if (formType === 'property-search') return 'General Inquiry';

  const source = (data.source || '').toLowerCase();
  if (source.includes('seller') || source.includes('valuation') || source.includes('sell')) {
    return 'Seller Inquiry';
  }
  if (source.includes('newsletter') || source.includes('register') || source.includes('guide')) {
    return 'Registration';
  }
  if (source.includes('listing') || source.includes('property-inquiry')) {
    return 'Property Inquiry';
  }

  return 'General Inquiry';
}

function buildSearchCriteria(data: LeadCaptureRequest): string | null {
  const criteria: string[] = [];

  if (data.propertyType) criteria.push(`Type: ${data.propertyType}`);
  if (data.priceMin || data.priceMax) {
    const min = data.priceMin ? `$${data.priceMin.toLocaleString()}` : 'Any';
    const max = data.priceMax ? `$${data.priceMax.toLocaleString()}` : 'Any';
    criteria.push(`Price: ${min} - ${max}`);
  }
  if (data.bedrooms) criteria.push(`Bedrooms: ${data.bedrooms}+`);
  if (data.bathrooms) criteria.push(`Bathrooms: ${data.bathrooms}+`);
  if (data.neighborhoods?.length) {
    criteria.push(`Areas: ${data.neighborhoods.join(', ')}`);
  }
  if (data.timeline) criteria.push(`Timeline: ${data.timeline}`);
  if (data.financing) criteria.push(`Financing: ${data.financing}`);
  if (data.preApproved) criteria.push('Pre-approved: yes');
  if (data.stage) criteria.push(`Stage hint: ${data.stage}`);

  return criteria.length > 0 ? criteria.join('\n') : null;
}

function buildMessage(data: LeadCaptureRequest): string {
  const parts: string[] = [];
  if (data.message?.trim()) {
    parts.push(data.message.trim());
  }
  const criteria = buildSearchCriteria(data);
  if (criteria) {
    parts.push('', 'Additional details:', criteria);
  }
  return parts.join('\n').trim() || 'Website lead capture submission';
}

function formLabel(data: LeadCaptureRequest): string {
  if (data.description) return data.description;
  if (data.formType) return `Lead capture — ${data.formType}`;
  return data.source ? `Lead capture — ${data.source}` : 'Lead capture API';
}

async function postFubEvent(body: Record<string, unknown>): Promise<Response> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) {
    console.error(
      '[Lead Capture] FOLLOW_UP_BOSS_API_KEY is not configured — cannot send leads to FUB'
    );
    throw new MissingFubKeyError();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    'X-System': FUB_SITE,
  };

  const systemKey = process.env.FUB_SYSTEM_KEY;
  if (systemKey) {
    headers['X-System-Key'] = systemKey;
  }

  return fetch('https://api.followupboss.com/v1/events', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

class MissingFubKeyError extends Error {
  constructor() {
    super('FOLLOW_UP_BOSS_API_KEY missing');
    this.name = 'MissingFubKeyError';
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadCaptureRequest = await request.json();

    if (data.company?.trim() || data.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const clientId = getClientId(request);
    const rateLimit = await checkRateLimit(leadFormLimiter, clientId);

    if (!rateLimit.success) {
      const resetDate = new Date(rateLimit.reset);
      const minutesUntilReset = Math.ceil((rateLimit.reset - Date.now()) / 60000);

      return NextResponse.json(
        {
          error: `Too many submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
          retryAfter: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimit),
        }
      );
    }

    if (!data.email && !data.phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    const { firstName, lastName } = splitName(data);
    if (!firstName && !lastName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) {
      if (!data.turnstileToken) {
        return NextResponse.json(
          { error: 'CAPTCHA verification required' },
          { status: 400 }
        );
      }

      const isValid = await verifyTurnstileToken(data.turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    const formName = formLabel(data);
    const attributionTags = buildAttributionTags(data, request);
    const extraTags = (data.tags || []).filter(Boolean);
    const personTags = Array.from(
      new Set([FUB_SITE, formName, ...extraTags, ...attributionTags])
    );

    const sourceUrl =
      data.sourceUrl?.trim() ||
      request.headers.get('referer') ||
      `https://www.${FUB_SITE}/`;

    const eventBody = {
      source: FUB_SITE,
      system: FUB_SITE,
      type: resolveEventType(data),
      message: buildMessage(data),
      description: formName,
      sourceUrl,
      person: {
        firstName,
        lastName,
        emails: data.email ? [{ value: data.email.trim() }] : [],
        phones: data.phone ? [{ value: data.phone.trim() }] : [],
        tags: personTags,
      },
    };

    let fubResponse: Response;
    try {
      fubResponse = await postFubEvent(eventBody);
    } catch (error) {
      if (error instanceof MissingFubKeyError) {
        return NextResponse.json(
          { error: 'Lead capture is temporarily unavailable. Please call us directly.' },
          { status: 503 }
        );
      }
      console.error('[Lead Capture] FUB request failed:', error);
      return NextResponse.json(
        { error: 'Failed to send lead to CRM' },
        { status: 502 }
      );
    }

    if (!fubResponse.ok) {
      console.error('[Lead Capture] FUB API error status:', fubResponse.status);
      return NextResponse.json(
        { error: 'Failed to send lead to CRM' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true },
      { headers: getRateLimitHeaders(rateLimit) }
    );
  } catch (error) {
    console.error('[Lead Capture] Error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
