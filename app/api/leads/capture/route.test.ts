/**
 * Test: /api/leads/capture Route Handler
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';

function makeRequest(body: unknown, init: RequestInit = {}) {
  return new Request('http://localhost:3000/api/leads/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...init.headers },
    body: JSON.stringify(body),
    ...init,
  });
}

describe('POST /api/leads/capture', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      FOLLOW_UP_BOSS_API_KEY: 'test-fub-key',
    };
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('returns 400 for empty JSON body', async () => {
    const response = await POST(makeRequest({}));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('required');
  });

  it('returns 400 when name is missing', async () => {
    const response = await POST(
      makeRequest({
        email: 'john@example.com',
      })
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Name');
  });

  it('returns 503 when FOLLOW_UP_BOSS_API_KEY is missing', async () => {
    delete process.env.FOLLOW_UP_BOSS_API_KEY;

    const response = await POST(
      makeRequest({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      })
    );
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toBeDefined();
  });

  it('posts a FUB event with standard source and person shape', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      makeRequest({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '7025551234',
        message: 'Interested in buying',
        source: 'website-form',
        formType: 'contact',
      })
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    expect(fetchMock).toHaveBeenCalledWith(
      FUB_EVENTS_URL,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'X-System': 'springvalleylasvegashomes.com',
        }),
      })
    );

    const callBody = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string
    );
    expect(callBody.source).toBe('springvalleylasvegashomes.com');
    expect(callBody.system).toBe('springvalleylasvegashomes.com');
    expect(callBody.type).toBe('General Inquiry');
    expect(callBody.person.emails).toEqual([{ value: 'john@example.com' }]);
    expect(callBody.person.phones).toEqual([{ value: '7025551234' }]);
    expect(callBody.person.tags).toContain('springvalleylasvegashomes.com');
  });

  it('maps home valuation to Seller Inquiry', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    await POST(
      makeRequest({
        firstName: 'Jane',
        lastName: 'Seller',
        email: 'jane@example.com',
        formType: 'home-valuation',
      })
    );

    const callBody = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string
    );
    expect(callBody.type).toBe('Seller Inquiry');
  });

  it('returns 502 when FUB responds with an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const response = await POST(
      makeRequest({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      })
    );

    expect(response.status).toBe(502);
  });

  it('returns success for honeypot without calling FUB', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      makeRequest({
        company: 'spam corp',
        firstName: 'Bot',
        email: 'bot@spam.com',
      })
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('includes property search details in the message', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    await POST(
      makeRequest({
        firstName: 'Buyer',
        lastName: 'Jones',
        email: 'buyer@example.com',
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        formType: 'property-search',
      })
    );

    const callBody = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string
    );
    expect(callBody.message).toContain('400,000');
    expect(callBody.message).toContain('Bedrooms: 3+');
  });
});
