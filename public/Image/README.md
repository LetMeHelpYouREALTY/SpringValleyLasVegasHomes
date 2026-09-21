# Legacy image path (`/Image/...`)

Components still reference this folder (e.g. hero backgrounds, review photos). New assets can go under `images/` (lowercase) when you migrate paths in code.

| Subfolder | Purpose                            |
| --------- | ---------------------------------- |
| `hero/`   | Rotating homepage hero backgrounds |

**Current homepage heroes** (also copied to `/Image/hero_bg_{1,2,3}.jpg` for older paths):

| File                                               | Source heading                       |
| -------------------------------------------------- | ------------------------------------ |
| `images/hero/spring-valley-las-vegas-homes.jpg`    | H1: Spring Valley Las Vegas Homes    |
| `images/hero/las-vegas-neighborhoods-we-serve.jpg` | H2: Las Vegas Neighborhoods We Serve |
| `images/hero/modern-luxury-home-summerlin.jpg`     | H3: Modern Luxury Home               |

Place optimized JPG/WebP here; keep filenames lowercase-with-hyphens when adding new files.
