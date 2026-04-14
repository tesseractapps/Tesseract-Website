# TesseractApps — Marketing & Product Website

The official website for [TesseractApps](https://tesseractapps.com.au) — NDIS provider software for care management, compliance, rostering, and HR.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript (strict) |
| Build tool | Vite 6 |
| Routing | React Router DOM v7 |
| Styling | Plain CSS per component (no Tailwind) |
| UI components | MUI v7, keen-slider, framer-motion |
| CMS | Sanity v3 (embedded studio at `/studio`) |
| Deployment | Vercel (SPA — all routes rewrite to `/`) |

---

## Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- A **Sanity project** (free tier is fine) — see [sanity.io/manage](https://sanity.io/manage)

---

## Local Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd tesseractApps
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

> `VITE_SANITY_DATASET` defaults to `production` if omitted.

### 3. Configure Sanity CORS

In [sanity.io/manage](https://sanity.io/manage), go to your project → **API** → **CORS Origins** and add:

```text
http://localhost:5173
```

For production, also add your Vercel domain (e.g. `https://tesseractapps.com.au`).

### 4. Start the dev server

```bash
npm run dev
```

The site runs at **<http://localhost:5173>**.

The embedded Sanity Studio is available at **<http://localhost:5173/studio>**.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check + Vite production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run studio` | Run Sanity Studio standalone (port 3333) |
| `npm run typegen` | Regenerate `sanity.types.ts` from your live schema |
| `npm run seed` | Seed general Sanity content |
| `npm run seed:capabilities` | Seed capability pages into Sanity |
| `npm run seed:solutions` | Seed solution pages into Sanity |
| `npm run seed:entities` | Seed authors, categories, and other entities |
| `npm run seed:competitors` | Seed competitor comparison pages |
| `npm run prebuild` | Prerender static HTML pages for SEO (runs automatically in `build`) |

> **Note:** `npm run build` runs prebuild scripts automatically (`gen-home-thumbs.mjs`, `gen-llms-docs.mjs`, `generate-sitemap.js`, `prerender-pages.mjs`) before compiling.

---

## Project Structure

```text
src/
├── assets/                     # Static images, icons, logos
├── components/
│   └── layout/
│       ├── navBarComponent/    # Top navigation (mega-menu)
│       └── footerComponent/    # Site footer
├── contexts/
│   └── AppContext.tsx          # Route registry, signUp/bookADemo state
├── data/
│   ├── navData.ts              # Navigation structure (capabilities, solutions, resources)
│   └── productsData.ts         # Product feature data
├── hooks/
│   ├── useAppNavigate.ts       # Wrapper around React Router navigate (uses AppContext routes)
│   ├── useSanityBlogList.ts    # Blog list hook with module-level cache
│   └── useSanityBlogPost.ts    # Single post hook
├── pages/
│   ├── home/                   # Home — main homepage
│   ├── platform/               # Platform page
│   ├── marketing/pricing/      # Pricing page
│   ├── capabilities/           # Capabilities listing + dynamic CMS pages
│   ├── solutions/              # Solutions listing + dynamic CMS pages
│   ├── competitors/            # Competitor comparison pages (CMS-driven)
│   ├── blog/                   # Blog listing
│   ├── blogPost/               # Dynamic blog post pages (/blog/:slug)
│   ├── forms/
│   │   ├── bookADemo/          # Book a Demo form (/book-a-demo)
│   │   └── signup/             # Sign Up form (/signup)
│   └── ...
├── routes/
│   └── AppRoutes.tsx           # All route definitions + prevPath tracking
├── sanity/
│   ├── env.ts                  # Typed Sanity env vars
│   ├── lib/client.ts           # Sanity client (published perspective, CDN enabled)
│   ├── lib/image.ts            # urlFor() image helper
│   ├── lib/queries.ts          # All GROQ queries
│   └── schemaTypes/            # All Sanity schema definitions
├── utils/
│   └── formatDate.ts           # Shared date formatter
└── index.css                   # Global reset + font-family inheritance
```

---

## Sanity CMS

Content types managed entirely in Sanity:

| Type | Slug pattern | Notes |
| --- | --- | --- |
| Blog posts | `/blog/:slug` | Supports PortableText, code blocks, images |
| Capability pages | `/capabilities/:slug` | 9 capabilities mapped to nav groups |
| Solution pages | `/solutions/:slug` | Disability, Allied Health, SIL, Support Coordination |
| Competitor pages | `/tesseract-vs/:slug` | Comparison pages vs competitors |
| Authors | — | Required before publishing blog posts |
| Categories | — | Required before publishing blog posts |

### First-time CMS setup

1. Start the dev server (`npm run dev`)
2. Go to **<http://localhost:5173/studio>**
3. Create at least one **Author** and one **Category** document
4. Then you can publish blog posts

### Regenerate TypeScript types

After making schema changes, run:

```bash
npm run typegen
```

This updates `sanity.types.ts` from your live Sanity project.

---

## Deployment (Vercel)

The site is deployed as a SPA. All routes must rewrite to `/index.html`.

### `vercel.json` rewrite (already configured)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Build command

```bash
npm run build
```

### Output directory

```text
dist
```

---

## Navigation Architecture

- **NavBar** — hybrid: Capabilities & Solutions mega-menu items are loaded from Sanity CMS (with `navData.ts` as fallback). Resources and Company labels are hardcoded.
- **AppContext** — central route registry. Every navigable path must be registered in `src/contexts/AppContext.tsx` or it falls through to `/coming-soon`.
- **useAppNavigate** — resolves routes via AppContext first, then by friendly name. Use this hook instead of React Router's `navigate` directly.

---

## Key Design Decisions

- **No Tailwind** — plain CSS per component with namespaced class prefixes (`hv4-`, `pl-`, `pr-`, `cap-`, `sol-`, `cmp-`)
- **CSS variables** — `--color-primary`, `--color-secondary`, `--color-background-light-gray`, `--color-text-gray` etc.
- **Site container standard** — `1140px` max-width (Platform, Pricing) / `1200px` (Home)
- **SPA limitations** — no SSR, no ISR, no draft preview. Sanity client uses `perspective: 'published'` to prevent draft leaks.
- **Blog cache** — module-level `Map` cache in `useSanityBlogList` prevents re-fetching on re-mount
- **Close buttons** on `/book-a-demo` and `/signup` use `navigate(-1)` — returns to the page the user came from

---

## Contributing

1. Branch off `main`
2. Follow the existing CSS namespace convention for your component
3. Register any new routes in both `AppRoutes.tsx` and `AppContext.tsx`
4. Run `npm run lint` before opening a PR
