import type {
  GeminiGroundedKind,
  GeminiListingContext,
  GeminiListingMediaTask,
} from "./types";

export const GEMINI_FAIR_HOUSING_RULES = `Fair Housing (mandatory):
- Do not mention protected classes or proxies ("safe neighborhood", "good schools", "family-friendly", "established community", race, religion, national origin, familial status, disability).
- Describe square footage, amenities, named schools (name only, no quality judgment), commute times, and physical features instead.
- Never invent a price, rate, inventory count, or days-on-market. If a sourced number is missing, write UNKNOWN.`;

export const GEMINI_VOICE_RULES = `Voice:
- Write as Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties, license S.0197614.LLC.
- Direct, warm, 8–15 word sentences. One specific number beats three adjectives.
- Client CTA phone is (702) 664-8424. Do not swap phone numbers.
- One audience, one CTA. A real address + price + date beats a market average when those facts are sourced.`;

export function baseSystemInstruction(): string {
  return `You draft real-estate content for Spring Valley / Las Vegas / Henderson sites.

${GEMINI_VOICE_RULES}

${GEMINI_FAIR_HOUSING_RULES}

Output plain text only unless the task asks for a short labeled list.`;
}

export function groundedSystemInstruction(kind: GeminiGroundedKind): string {
  const kindRule = groundedKindRule(kind);
  return `${baseSystemInstruction()}

Use Google Search grounding. Prefer recent, citable local sources (MLS recaps, county, reputable market reports). Attach facts only when the search results support them.

${kindRule}`;
}

function groundedKindRule(kind: GeminiGroundedKind): string {
  switch (kind) {
    case "gbp-post":
      return "Task: draft one Google Business Profile post (80–200 words) with a single CTA to call (702) 664-8424 or visit the site. Include 2–4 sourced numbers when available.";
    case "market-update":
      return "Task: draft a hyperlocal market-update brief (120–220 words) with sourced median price, inventory, or days-on-market when available. List sources as titles only at the end.";
    case "custom":
      return "Task: answer the topic with current, sourced local facts. Keep it publishable as a draft, not a final post.";
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function buildGroundedUserPrompt(input: {
  kind: GeminiGroundedKind;
  topic: string;
  market?: string;
  extraInstructions?: string;
}): string {
  const market = input.market?.trim() || "Spring Valley, Las Vegas, Nevada";
  const extra = input.extraInstructions?.trim();
  return [
    `Kind: ${input.kind}`,
    `Market: ${market}`,
    `Topic: ${input.topic.trim()}`,
    extra ? `Extra: ${extra}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function listingMediaSystemInstruction(
  mediaTask: GeminiListingMediaTask,
): string {
  const taskRule = listingMediaTaskRule(mediaTask);
  return `${baseSystemInstruction()}

You are looking at listing photo(s) or a short property video. Describe only what is visible plus the provided listing facts. Do not invent rooms, finishes, or views.

${taskRule}`;
}

function listingMediaTaskRule(mediaTask: GeminiListingMediaTask): string {
  switch (mediaTask) {
    case "alt-text":
      return "Task: write one SEO alt-text string (80–160 characters). Include the city or neighborhood when provided. No marketing adjectives that imply who should live there.";
    case "geo-description":
      return "Task: write a 1–2 sentence geo-tagged photo description naming the provided neighborhood/city/ZIP and visible features (pool, kitchen, elevation, mountain view if seen).";
    case "video-script":
      return "Task: write a 20–35 second listing video script (4–6 short lines) from the photos/video. No invented price. End with a call to (702) 664-8424.";
    case "tagging":
      return "Task: return a comma-separated list of 6–12 visual tags (e.g. granite counters, covered patio, 2-car garage). Physical features only.";
    default: {
      const exhaustive: never = mediaTask;
      return exhaustive;
    }
  }
}

export function buildListingMediaUserPrompt(input: {
  mediaTask: GeminiListingMediaTask;
  listing?: GeminiListingContext;
  extraInstructions?: string;
}): string {
  const listing = input.listing;
  const lines = [`Media task: ${input.mediaTask}`];

  if (listing) {
    if (listing.address) lines.push(`Address: ${listing.address}`);
    if (listing.neighborhood) {
      lines.push(`Neighborhood: ${listing.neighborhood}`);
    }
    if (listing.city) lines.push(`City: ${listing.city}`);
    if (listing.zip) lines.push(`ZIP: ${listing.zip}`);
    if (listing.bedrooms !== undefined) {
      lines.push(`Bedrooms: ${listing.bedrooms}`);
    }
    if (listing.bathrooms !== undefined) {
      lines.push(`Bathrooms: ${listing.bathrooms}`);
    }
    if (listing.squareFeet !== undefined) {
      lines.push(`Square feet: ${listing.squareFeet}`);
    }
  }

  if (input.extraInstructions?.trim()) {
    lines.push(`Extra: ${input.extraInstructions.trim()}`);
  }

  return lines.join("\n");
}

export function listingMediaTaskToGeminiTask(
  mediaTask: GeminiListingMediaTask,
): "bulk" | "content" {
  switch (mediaTask) {
    case "alt-text":
    case "tagging":
    case "geo-description":
      return "bulk";
    case "video-script":
      return "content";
    default: {
      const exhaustive: never = mediaTask;
      return exhaustive;
    }
  }
}
