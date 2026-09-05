#!/usr/bin/env node
/**
 * Upload homepage photos and circular agent portraits to Cloudflare Images (primary CDN).
 * Git backups live under public/images/ — this script is the live write.
 *
 * Usage:
 *   CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… node scripts/upload-heading-images-to-cloudflare.mjs
 *
 * Optional: CF_IMAGES_REPLACE=1 to delete+reupload when a custom id already exists.
 * Token needs Account → Cloudflare Images → Edit.
 * Docs (2026): POST /accounts/{account_id}/images/v1
 */

import { readFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const TOKEN = process.env.CLOUDFLARE_API_TOKEN?.trim();
const REPLACE = /^(1|true|yes)$/i.test(
  process.env.CF_IMAGES_REPLACE?.trim() ?? "",
);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await readFile(resolve(root, "lib/heading-images.json"), "utf8"),
);

/** @param {unknown} node @param {{ file: string, id: string, env: string, heading: string }[]} out */
function collectAssets(node, out = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectAssets(item, out);
    return out;
  }
  if (node && typeof node === "object") {
    if (
      typeof node.file === "string" &&
      typeof node.id === "string" &&
      typeof node.env === "string"
    ) {
      out.push(node);
      return out;
    }
    for (const value of Object.values(node)) collectAssets(value, out);
  }
  return out;
}

/** @type {{ file: string, id: string, env: string, heading: string }[]} */
const assets = collectAssets(manifest);

async function api(path, init) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        ...(init.headers ?? {}),
      },
    },
  );
  const json = await res.json().catch(() => ({}));
  return { res, json };
}

async function deleteImage(id) {
  const { res, json } = await api(`/images/v1/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(
      `delete ${id}: ${res.status} ${JSON.stringify(json.errors ?? json)}`,
    );
  }
}

async function uploadAsset(asset, retried = false) {
  const abs = resolve(root, asset.file);
  const bytes = await readFile(abs);
  const lower = abs.toLowerCase();
  const mime = lower.endsWith(".png")
    ? "image/png"
    : lower.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  const blob = new Blob([bytes], { type: mime });
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

  const { res, json } = await api("/images/v1", {
    method: "POST",
    body: form,
  });
  if (res.ok && json.success !== false) {
    return { id: json.result?.id ?? asset.id, reused: false };
  }

  const err = json.errors?.[0];
  const exists =
    res.status === 409 ||
    err?.code === 5409 ||
    /already exists/i.test(err?.message ?? "");

  if (exists && REPLACE && !retried) {
    await deleteImage(asset.id);
    return uploadAsset(asset, true);
  }

  if (exists) {
    return { id: asset.id, reused: true };
  }

  throw new Error(
    `${asset.heading}: ${res.status} ${JSON.stringify(json.errors ?? json)}`,
  );
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
