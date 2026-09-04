#!/usr/bin/env node
/**
 * Upload H1/H2/H3 homepage photos to Cloudflare Images.
 * Git already stores JPEG backups under public/images/.
 *
 * Usage:
 *   CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… node scripts/upload-heading-images-to-cloudflare.mjs
 *
 * Token needs Account → Cloudflare Images → Edit.
 * Docs (Apr 2026): POST /accounts/{account_id}/images/v1
 */

import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const TOKEN = process.env.CLOUDFLARE_API_TOKEN?.trim();

/** @type {{ file: string, id: string, env: string, heading: string }[]} */
const assets = [
  {
    file: "public/images/hero/h1-spring-valley.jpg",
    id: "svlvh-h1-spring-valley",
    env: "NEXT_PUBLIC_CF_IMAGE_HERO_1_ID",
    heading: "H1 Spring Valley hero",
  },
  {
    file: "public/images/hero/h1-summerlin.jpg",
    id: "svlvh-h1-summerlin",
    env: "NEXT_PUBLIC_CF_IMAGE_HERO_2_ID",
    heading: "H1 Summerlin hero",
  },
  {
    file: "public/images/hero/h1-henderson.jpg",
    id: "svlvh-h1-henderson",
    env: "NEXT_PUBLIC_CF_IMAGE_HERO_3_ID",
    heading: "H1 Henderson hero",
  },
  {
    file: "public/images/properties/h2-listings.jpg",
    id: "svlvh-h2-listings",
    env: "NEXT_PUBLIC_CF_IMAGE_FEATURED_1_ID",
    heading: "H2 Listings",
  },
  {
    file: "public/images/properties/h2-home-search.jpg",
    id: "svlvh-h2-home-search",
    env: "NEXT_PUBLIC_CF_IMAGE_FEATURED_2_ID",
    heading: "H2 Home Search",
  },
  {
    file: "public/images/properties/h2-contact.jpg",
    id: "svlvh-h2-contact",
    env: "NEXT_PUBLIC_CF_IMAGE_FEATURED_3_ID",
    heading: "H2 Contact",
  },
  {
    file: "public/images/hero/h2-work-with-me.jpg",
    id: "svlvh-h2-work-with-me",
    env: "NEXT_PUBLIC_CF_IMAGE_WORK_WITH_ME_ID",
    heading: "H2 Work With Me",
  },
  {
    file: "public/images/neighborhoods/h3-spring-valley.jpg",
    id: "svlvh-h3-spring-valley",
    env: "NEXT_PUBLIC_CF_IMAGE_COMMUNITY_1_ID",
    heading: "H3 Spring Valley",
  },
  {
    file: "public/images/neighborhoods/h3-summerlin.jpg",
    id: "svlvh-h3-summerlin",
    env: "NEXT_PUBLIC_CF_IMAGE_COMMUNITY_2_ID",
    heading: "H3 Summerlin",
  },
  {
    file: "public/images/neighborhoods/h3-henderson.jpg",
    id: "svlvh-h3-henderson",
    env: "NEXT_PUBLIC_CF_IMAGE_COMMUNITY_3_ID",
    heading: "H3 Henderson",
  },
];

async function uploadAsset(asset) {
  const abs = resolve(asset.file);
  const bytes = await readFile(abs);
  const blob = new Blob([bytes], { type: "image/jpeg" });
  const form = new FormData();
  form.set("file", blob, basename(abs));
  form.set("id", asset.id);
  form.set("requireSignedURLs", "false");
  form.set(
    "metadata",
    JSON.stringify({
      heading: asset.heading,
      env: asset.env,
      gitBackup: asset.file,
    }),
  );

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: form,
    },
  );
  const json = await res.json();
  if (!res.ok || json.success === false) {
    const err = json.errors?.[0];
    // Image already exists with this custom id — treat as success.
    if (
      res.status === 409 ||
      err?.code === 5409 ||
      /already exists/i.test(err?.message ?? "")
    ) {
      return { id: asset.id, reused: true };
    }
    throw new Error(
      `${asset.heading}: ${res.status} ${JSON.stringify(json.errors ?? json)}`,
    );
  }
  return { id: json.result?.id ?? asset.id, reused: false };
}

async function main() {
  if (!ACCOUNT_ID || !TOKEN) {
    console.error(
      "Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN. Git JPEG backups are already in public/images/. Re-run this script to push them to Cloudflare Images, then set the NEXT_PUBLIC_CF_IMAGE_* IDs in Vercel.",
    );
    process.exit(1);
  }

  const envLines = [];
  for (const asset of assets) {
    const result = await uploadAsset(asset);
    console.log(
      `${result.reused ? "exists" : "uploaded"}  ${asset.heading}  id=${result.id}`,
    );
    envLines.push(`${asset.env}=${result.id}`);
  }

  console.log(
    "\nSet these in Vercel → Environment Variables (Production + Preview):\n",
  );
  console.log(envLines.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
