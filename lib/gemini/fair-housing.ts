/**
 * Lightweight Fair Housing scan for draft copy.
 * Drafts are not published — flags help a human reviewer before GBP / site use.
 *
 * Matches protected-class references and common proxies used in housing ads.
 */

const FAIR_HOUSING_PATTERNS: ReadonlyArray<{ id: string; pattern: RegExp }> = [
  { id: "safe-neighborhood", pattern: /\bsafe(?:r)?\s+neighborhood/i },
  { id: "good-schools", pattern: /\bgood\s+schools?\b/i },
  { id: "family-friendly", pattern: /\bfamily[-\s]?friendly\b/i },
  { id: "established-community", pattern: /\bestablished\s+community\b/i },
  {
    id: "exclusive",
    pattern: /\bexclusive(?:ly)?\s+(?:community|neighborhood)\b/i,
  },
  { id: "christian", pattern: /\bchristian\b/i },
  { id: "jewish", pattern: /\bjewish\b/i },
  { id: "muslim", pattern: /\bmuslim\b/i },
  {
    id: "racial",
    pattern:
      /\b(?:white|black|asian|hispanic|latino)\s+(?:area|neighborhood|community)\b/i,
  },
  {
    id: "kids",
    pattern: /\b(?:ideal|perfect|great)\s+for\s+(?:kids|children|families)\b/i,
  },
  { id: "senior-only", pattern: /\b(?:no\s+kids|adults?\s+only)\b/i },
];

export function flagFairHousingRisks(text: string): string[] {
  if (!text) {
    return [];
  }

  const flags: string[] = [];
  for (const { id, pattern } of FAIR_HOUSING_PATTERNS) {
    if (pattern.test(text)) {
      flags.push(id);
    }
  }
  return flags;
}
