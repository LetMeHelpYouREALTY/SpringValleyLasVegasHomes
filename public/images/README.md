# Image Assets Guide

## Homepage heading photos (H1 / H2 / H3)

JPEG backups in git; Cloudflare Images is the CDN when `NEXT_PUBLIC_CF_IMAGE_*_ID` is set.

| Heading | File                                 | Use                                  |
| ------- | ------------------------------------ | ------------------------------------ |
| H1      | `hero/h1-spring-valley.jpg`          | Hero slide 1 — Spring Valley         |
| H1      | `hero/h1-summerlin.jpg`              | Hero slide 2 — Summerlin / Red Rock  |
| H1      | `hero/h1-henderson.jpg`              | Hero slide 3 — Henderson             |
| H2      | `properties/h2-listings.jpg`         | Listings action card                 |
| H2      | `properties/h2-home-search.jpg`      | Home Search action card              |
| H2      | `properties/h2-contact.jpg`          | Contact action card                  |
| H2      | `hero/h2-work-with-me.jpg`           | Work With Me band                    |
| H3      | `neighborhoods/h3-spring-valley.jpg` | Featured Communities — Spring Valley |
| H3      | `neighborhoods/h3-summerlin.jpg`     | Featured Communities — Summerlin     |
| H3      | `neighborhoods/h3-henderson.jpg`     | Featured Communities — Henderson     |

Upload to Cloudflare Images:

```bash
CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… node scripts/upload-heading-images-to-cloudflare.mjs
```

## Folder Structure

```
images/
├── hero/           # Homepage hero backgrounds
├── agent/          # Dr. Jan Duffy photos
├── properties/     # Listing photos
├── neighborhoods/  # Area/community photos
├── testimonials/   # Client headshots
├── logos/          # Brand assets (BHHS, site marks, partners)
├── og/             # Open Graph / social share images (e.g. 1200×630)
├── icons/          # Favicon sources, app icons, UI icons (PNG/SVG)
├── photos/         # General marketing & lifestyle photography
└── graphics/       # Illustrations, badges, decorative assets
```

**Legacy path:** some components still use `/Image/...` (capital I). See `public/Image/README.md`. Prefer new assets under `images/` and update imports when convenient.

## Recommended Specifications

| Folder         | Size       | Format        | Notes                                       |
| -------------- | ---------- | ------------- | ------------------------------------------- |
| hero/          | 1920x1080+ | WebP, JPG     | 16:9 ratio, compress <200KB                 |
| agent/         | 960×1280+  | WebP, JPG     | 3:4 rectangular portrait, no circular frame |
| properties/    | 1200x800+  | WebP, JPG     | Landscape, MLS-quality                      |
| neighborhoods/ | 1200x800+  | WebP, JPG     | Scenic community shots                      |
| testimonials/  | 200x200    | WebP, JPG     | Square, optional                            |
| logos/         | Various    | PNG, SVG      | Transparent background                      |
| og/            | 1200×630   | PNG, JPG      | Social previews; match `metadata.openGraph` |
| icons/         | 32–512px   | PNG, ICO, SVG | Favicon / PWA sources                       |
| photos/        | Flexible   | WebP, JPG     | Site sections, marketing                    |
| graphics/      | Flexible   | SVG, PNG      | Icons, badges, non-photo art                |

## Naming Conventions

- Use lowercase with hyphens: `summerlin-aerial.webp`
- Be descriptive: `dr-jan-duffy-headshot.jpg`
- Include size if multiple: `hero-desktop.webp`, `hero-mobile.webp`

## Image Optimization

Before uploading, optimize images:

1. **Online tools**: [Squoosh](https://squoosh.app), [TinyPNG](https://tinypng.com)
2. **CLI**: `npx @squoosh/cli --webp '{"quality":80}' image.jpg`
3. **Target**: <200KB for hero, <100KB for thumbnails

## Usage in Code

```tsx
import Image from "next/image";

<Image
  src="/images/hero/las-vegas-skyline.webp"
  alt="Las Vegas skyline at sunset"
  width={1920}
  height={1080}
  priority // for above-fold images
/>;
```

## Notes

- Next.js auto-optimizes images via `next/image`
- WebP preferred for web (30% smaller than JPEG)
- Always include descriptive alt text for SEO/accessibility
