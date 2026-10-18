# debbaweb.it

Personal website of Andrea Debernardi, built with [Next.js](https://nextjs.org/) (pages router), Tailwind CSS and `next-g11n` for Italian/English content.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm test:a11y` | axe-core accessibility check against a running server (`BASE_URL`, default `http://localhost:3000`) |

Project pages call the GitHub API at build time. Set `GITHUB_TOKEN` to avoid the unauthenticated rate limit.

## Content

- Pages: home (bento overview), `/projects`, `/projects/[slug]`, `/about` (bio, services, activities, customers) and `/contacts` (direct contacts and form). The home page is a bento grid of tiles (`src/components/home/`). Tile spans in `src/pages/index.tsx` are tuned so every row is full at 4 columns; check the layout when adding or removing tiles.
- `HOME_PROJECTS` in `src/data/projects.ts` picks the projects shown as home tiles; `DOCK_PROJECTS` picks the ones in the dock tile.
- Open source projects live in `src/data/projects.ts`; images go in `public/images/projects/{cover,icon}/`. Animated GIF covers need a `still` frame, shown when the visitor prefers reduced motion and in the project grid.
- Translations live in `src/i18n/dictionary.ts`.

## Appearance and accessibility

Colors and the Urbanist typeface follow the tabularis website. Colors are CSS tokens in `src/styles/globals.css`, exposed to Tailwind in `tailwind.config.js`. The same file defines the shared type scale (`page-title`, `section-title`, `tile-title`, `tile-label`, `tile-text`), tiles (`tile`, `bento`) and controls (`btn-*`, `segmented`); use them instead of ad hoc styles; keep the explicit dark palette and the automatic dark media query in sync.

The header offers Light / Dark / Auto. Auto follows `prefers-color-scheme`, including live system changes. The `debbaweb.theme` preference is stored locally, and if storage is blocked the site falls back to the device theme. An inline head script applies the stored preference before first paint, so the page never flashes the wrong theme.

The site includes a skip link, visible focus indicators, a mobile menu that closes with Escape and returns focus, labeled form errors, reduced-motion and forced-colors support, still frames for animated covers, and touch targets of at least 24px.

CI (`.github/workflows/ci.yml`) runs typecheck, build and `pnpm test:a11y`. The check covers home, projects, project pages, about, contacts and the 404 page in both languages, light and dark themes, and at 1280px and 320px widths. It applies the axe-core WCAG 2.2 AA rules plus best practices, and also fails on horizontal overflow or a theme that was not applied. Automated checks supplement keyboard, zoom and screen reader testing; they do not replace it.
