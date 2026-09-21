# Image Assets Guide

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

| Folder | Size       | Format    | Notes                       |
| ------ | ---------- | --------- | --------------------------- |
| hero/  | 1920x1080+ | WebP, JPG | 16:9 ratio, compress <200KB |

Checked-in homepage heroes (1280×720 JPEG):

- `hero/spring-valley-las-vegas-homes.jpg` — H1 Spring Valley Las Vegas Homes
- `hero/las-vegas-neighborhoods-we-serve.jpg` — H2 Las Vegas Neighborhoods We Serve
- `hero/modern-luxury-home-summerlin.jpg` — H3 Modern Luxury Home
  | agent/ | 400x400+ | WebP, JPG | Square, professional headshot |
  | properties/ | 1200x800+ | WebP, JPG | Landscape, MLS-quality |
  | neighborhoods/ | 1200x800+ | WebP, JPG | Scenic community shots |
  | testimonials/ | 200x200 | WebP, JPG | Square, optional |
  | logos/ | Various | PNG, SVG | Transparent background |
  | og/ | 1200×630 | PNG, JPG | Social previews; match `metadata.openGraph` |
  | icons/ | 32–512px | PNG, ICO, SVG | Favicon / PWA sources |
  | photos/ | Flexible | WebP, JPG | Site sections, marketing |
  | graphics/ | Flexible | SVG, PNG | Icons, badges, non-photo art |

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
