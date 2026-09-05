# Image Assets Guide

## Cloudflare Images (primary) + git JPEG backups

Production delivery is **Cloudflare Images** (`imagedelivery.net`) when
`NEXT_PUBLIC_CF_IMAGE_*_ID` is set in Vercel. Git stores optimized JPEGs under
`public/images/` so local/preview still renders if those env vars are unset.

Upload (token: Account → Cloudflare Images → Edit):

```bash
CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… node scripts/upload-heading-images-to-cloudflare.mjs
```

On `main`, `.github/workflows/cloudflare-images.yml` re-uploads with
`CF_IMAGES_REPLACE=1` when GitHub secrets are present. Then paste the printed
`NEXT_PUBLIC_CF_IMAGE_*_ID` values into Vercel (Production + Preview).

Custom IDs are listed in `lib/heading-images.json`.

## Homepage heading photos (H1 / H2 / H3)

Hyperlocal Spring Valley set — not Summerlin or Henderson.

| Heading | File                                      | Use                                              |
| ------- | ----------------------------------------- | ------------------------------------------------ |
| H1      | `hero/h1-spring-valley.jpg`               | Hero slide 1 — Spring Valley pool home           |
| H1      | `hero/h1-spanish-trail.jpg`               | Hero slide 2 — Spanish Trail golf community      |
| H1      | `hero/h1-desert-breeze.jpg`               | Hero slide 3 — Desert Breeze Park                |
| H2      | `properties/h2-listings.jpg`              | Buy Spring Valley homes                          |
| H2      | `properties/h2-home-search.jpg`           | Search the MLS                                   |
| H2      | `properties/h2-contact.jpg`               | Sell / Tropicana office corridor                 |
| H2      | `hero/h2-work-with-me.jpg`                | Work With Me band                                |
| H3      | `neighborhoods/h3-spanish-trail.jpg`      | Spring Valley pocket — Spanish Trail             |
| H3      | `neighborhoods/h3-desert-breeze.jpg`      | Spring Valley pocket — Desert Breeze             |
| H3      | `neighborhoods/h3-chinatown.jpg`          | Spring Valley pocket — Chinatown / Spring Mountain |

## Brand marks (favicon, logo, circular portrait)

Cloudflare Images is primary; git PNGs under `public/images/` are the backup.

| Asset       | File                                         | Use                                      |
| ----------- | -------------------------------------------- | ---------------------------------------- |
| Favicon     | `icons/favicon.png`                          | Browser tab (circular portrait)          |
| Apple touch | `icons/apple-touch-icon.png`                 | iOS home-screen icon                     |
| Logo        | `agent/dr-jan-duffy-badge.png`               | Navbar + footer mark                     |
| Wordmark    | `logos/spring-valley-wordmark.jpg`           | Optional wide lockup                     |
| Portrait    | `agent/dr-jan-duffy-badge.png`               | Hero, Meet Dr. Jan, About, Contact, CTAs |
| Variants    | `agent/dr-jan-duffy-badge-{gold,warm,mint}.png` | Extra circular frames (git + CF backup) |
| All frames  | `agent/portraits/dr-jan-duffy-circle-*.png`  | Full set of uploaded portraits           |

Cloudflare custom IDs: `svlvh-favicon-circle`, `svlvh-logo-circle`, `svlvh-apple-circle`, `svlvh-portrait-circle`, `svlvh-wordmark`.


```
images/
├── hero/           # Homepage hero backgrounds
├── agent/          # Dr. Jan Duffy photos
├── properties/     # Listing / service-card photos
├── neighborhoods/  # Spring Valley pocket photos
├── testimonials/   # Unused — reviews use initials (no stock avatars)
├── logos/          # Brand assets (BHHS, site marks, partners)
├── og/             # Open Graph / social share images (e.g. 1200×630)
├── icons/          # Favicon sources, app icons, UI icons (PNG/SVG)
├── photos/         # General marketing & lifestyle photography
└── graphics/       # Illustrations, badges, decorative assets
```

**Legacy path:** `/Image/...` (capital I) still holds unused template files. Prefer `images/` (lowercase).

## Recommended Specifications

| Folder         | Size       | Format        | Notes                                       |
| -------------- | ---------- | ------------- | ------------------------------------------- |
| hero/          | 1920x1080+ | JPG           | 16:9, progressive JPEG                      |
| agent/         | 1024×1024  | PNG           | Circular gold-framed portrait, transparent corners |
| properties/    | 1536x1152+ | JPG           | 4:3 service cards                           |
| neighborhoods/ | 1536x1152+ | JPG           | 4:3 community tiles                         |
| testimonials/  | 200x200    | JPG           | Optional; homepage reviews use initials     |
| logos/         | Various    | PNG, SVG      | Transparent background                      |
| og/            | 1200×630   | PNG, JPG      | Social previews; match `metadata.openGraph` |
| icons/         | 32–512px   | PNG, ICO, SVG | Favicon / PWA sources                       |
| photos/        | Flexible   | JPG, WebP     | Site sections, marketing                    |
| graphics/      | Flexible   | SVG, PNG      | Icons, badges, non-photo art                |

## Naming Conventions

- Use lowercase with hyphens: `h1-spanish-trail.jpg`
- Be descriptive: `dr-jan-duffy-headshot.jpg`

## Usage in Code

```tsx
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { heroBackgroundSrcs } from "@/lib/site-media";

<Image
  src={heroBackgroundSrcs[0]}
  alt="Contemporary Spring Valley Las Vegas home with a pool and mountain views"
  fill
  sizes="100vw"
  priority
  unoptimized={isCfDeliveryUrl(heroBackgroundSrcs[0])}
/>;
```
