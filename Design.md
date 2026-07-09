# Al-Kousar Properties — Design & Architecture Document

A marketing/portfolio site for **Al-Kousar Properties**, a real-estate brokerage operating in DHA Bahawalpur, Pakistan. Heavy motion/scroll-driven visual design (GSAP + Lenis) on top of a Next.js App Router frontend, backed by Supabase for project/image content and a small custom admin CMS.

> **Note on the framework version**: `package.json` pins `next@16.2.9` and `react@19.2.4` — both far ahead of any stable release at the time this doc was written. Per `AGENTS.md`, treat this as a non-standard/bleeding-edge Next.js: don't assume APIs match public docs or training data; check `node_modules/next/dist/docs/` before relying on framework behavior.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | Mixed — `.tsx`/`.ts` in newer/admin code, `.jsx`/`.js` in the original marketing-site code |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`), plus two hand-written CSS files (`globals.css`, `gallery.css`) |
| Animation | GSAP 3 (+ `@gsap/react`'s `useGSAP`) with `ScrollTrigger`, `SplitText`, `MotionPathPlugin`, `TextPlugin` | 
| Smooth scroll | `lenis` (`ReactLenis`), bridged to GSAP's ticker and `ScrollTrigger` |
| Backend/data | Supabase (`@supabase/supabase-js`) — Postgres tables `projects` / `project_images`, Supabase Storage bucket `content-images`, Supabase Auth (email/password) for the admin |
| Images | `next/image` for local `/public` assets and remote Supabase Storage URLs (whitelisted in `next.config.ts`) |
| Deploy target | Implicitly Vercel (default Next.js assumption); no custom server code |

No test runner, no CI config, and no server-side auth/middleware exist in the repo.

## Directory map

```
app/                        Next.js App Router root
  layout.tsx                 Root layout: fonts, SmoothScrollProvider, TransitionProvider, LayoutContent
  page.tsx                   "/" → renders <Web/>
  Web.jsx                     Composes the homepage's section components in order
  globals.css, gallery.css    Global + project-detail-page styles
  Components/                 ⚠ Shared UI components — but see "Routing hazard" below
    Nav.jsx                    Fixed nav bar w/ TransitionLink-based routing
    Secondpage.jsx, Listing.jsx, Forth.jsx, Grid.jsx, Award.jsx, StackingCard.jsx,
    MapScrollAnimation.tsx, LogoMarquee.jsx, LogoMarquee2.jsx, Footer.jsx, ImageGrid.jsx
    text.js                    Central text/animation primitives (Texts, Chars, Words, ScrollWords, Marquee, …)
    toGallery.jsx              Small unused link-to-/projects banner
    common/Transition.jsx       Fully commented-out, dead
    animation/page.jsx          Dead component (Animationchars) — not imported anywhere
    animationn/page.jsx         Live hero (Animations) — imported into Web.jsx as the "animation" section
    logo/page.jsx                Dead marquee prototype, superseded by LogoMarquee(.jsx/2.jsx)
    test/page.jsx                Scratch/debug component hitting useProjects() directly
  about/page.jsx               Minimal placeholder page
  Images/page.jsx               Route "/Images"; despite the name/comment ("PUBLIC USER PAGE"), it just renders adminImages/ProjectGrid
  projects/page.jsx             "/projects" — horizontal-scroll project gallery (Supabase-driven)
  projects/[slug]/page.jsx      Client-side project lookup by slug (slug === project.id)
  projects/[slug]/project-client.jsx   Project detail page: hero, meta grid, image grid, GSAP-driven next-project transition
  projects.js                    useProjectData() hook — maps Supabase project rows into the shape the UI expects
  admin/page.tsx                 Admin dashboard (session-gated client-side)
  admin/login/page.tsx           Supabase email/password login

adminImages/                  Supabase-backed mini-CMS for "projects" (misleadingly named after "images")
  ContentGrid.tsx               useProjects() hook (published projects + their project_images)
  ProjectForm.tsx               Create/edit project form incl. dynamic image slots, team members, Supabase Storage upload
  ImageSlotEditor.tsx           Single image slot: file picker, title/description/extra_text, orientation, layout
  LayoutPicker.tsx              Visual picker for ProjectImage.layout (square/landscape/portrait/wide)
  AdminProjectList.tsx          List/publish-toggle/edit/delete for existing projects
  ProjectCard.tsx / ProjectGrid.tsx   Public read-only project display w/ Supabase realtime subscription

animates/                    Page-transition + scroll infrastructure
  TransitionLink.jsx            <Link> replacement: plays a "stair wipe" GSAP animation before router.push
  TransitionOverlay.jsx         The 5-column black "stair" overlay, controlled via a shared ref
  LayoutContent.jsx             Plays the reverse (reveal) animation on pathname change, refreshes ScrollTrigger

context/
  TransitionContext.jsx         Provides `overlayRef` shared between TransitionLink and LayoutContent

lib/
  supabase.ts                   Supabase client + all shared TypeScript types (Project, ProjectImage, Layout, DraftImage)
  layout.ts                     LAYOUT_OPTIONS metadata + helpers (getRatioClass, getSpanClass)

public/                       Static images/video/svg assets (project photos, logo, map, DHA promo video)
```

## Routing hazard: components living inside `app/`

`app/Components/**` sits *inside* the App Router tree, so any `page.jsx` under it is a real, publicly reachable route — not just a component folder. Concretely this means the following URLs resolve, even though they look like internal component paths:

- `/Components/animation` → `Animationchars` (dead hero variant, hardcoded "Al-Kousar Properties" text)
- `/Components/animationn` → `Animations` (this is the actual hero used on `/`, so it's also live at this URL)
- `/Components/logo` → old marquee-of-names prototype
- `/Components/test` → a scratch page that calls `useProjects()` and dumps raw project/image data with `console.log`

None of this is guarded — it's an artifact of naming a folder `Components` under `app/`. If cleanup happens, either move `app/Components` out of the route tree (e.g. to `components/` at the repo root, matching `adminImages/`, `lib/`, `context/`, `animates/`) or delete/rename the stray `page.jsx` files.

## Data model (Supabase)

Inferred entirely from `lib/supabase.ts` and the CMS components (no `.sql`/migration files in the repo).

**`projects`**
| column | type |
|---|---|
| id | string (uuid, used directly as the "slug") |
| title | string |
| description | string \| null |
| published | boolean |
| created_at | string |
| project_type, build_time, delivered_at, scale, location | string \| null |
| team_members | string[] |

**`project_images`** (FK `project_id → projects.id`, cascade delete)
| column | type |
|---|---|
| id, project_id | string |
| image_url | string (Supabase Storage public URL) |
| title, description, extra_text | string \| null |
| layout | `'square' \| 'landscape' \| 'portrait' \| 'wide'` |
| orientation | `'landscape' \| 'portrait'` |
| sort_order | number |
| created_at | string |

Storage: uploaded images go to the `content-images` bucket (`ProjectForm.uploadImage`), filename = `${timestamp}-${random}-${sanitizedOriginalName}`.

Two independent data-fetching hooks exist for the same tables and are **not shared**:
- `adminImages/ContentGrid.tsx` → `useProjects()` — used by public pages (`Images/page.jsx`, `projects/page.jsx`, `Components/test/page.jsx`) and re-wrapped by `app/projects.js`'s `useProjectData()`.
- `adminImages/AdminProjectList.tsx` and `adminImages/ProjectGrid.tsx` each fetch independently inline (the latter also opens a realtime `postgres_changes` subscription channel that no other consumer has).

`app/projects.js` (`useProjectData`) is the shape consumed by the project detail page and gallery: it derives `slug` directly from `project.id`, and reshapes `project_images` into `{ id, image_url, orientation, title }` sorted by `sort_order`.

## Page-by-page behavior

**`/` (`app/Web.jsx`)** — single scrolling composition, in order:
1. `Animations` (animationn/page.jsx) — split hero grid, intro GSAP timeline (images fly in, one video "pic" scales/zooms and cursor-parallaxes), click-to-expand fullscreen video modal, nav links to `/about` and `/projects`.
2. `Secondpage` — pinned-feeling two-line giant marquee heading + "About" copy block.
3. `Listing` (exported as `ThirsSe`) — pinned/scrubbed heading shrink, `BentoGrid` (property-type imagery, hover-revealed `SplitText` captions), then a "WE CURATE SPACES" text block with two small inline animated image chips.
4. `StackingCards` — 3 full-screen sections that scale/rotate via scroll-position math (not ScrollTrigger — a manual `scroll` listener + `getBoundingClientRect`), each showing `ImageRows` (Award.jsx) on the first card.
5. `MapScrollAnimation` — pinned SVG map section: draws a path with `strokeDashoffset`, animates a "dot" along a `MotionPathPlugin` path, camera/POV zooms via a scroll-scrubbed timeline; clicking opens the real Al-Kousar Google Maps listing in a new tab.
6. `Animateword` (from `text.js`) + `ScrollMarquee`/`LogoMarqueeleft` (two independent scroll-velocity-driven marquees, one biased left, one right).
7. `Footer` — contact info, nav links with slide-up hover effect, and a CSS-keyframe marquee of "AL-KOUSAR PROPERTIES".

`Forth` (testimonials/deal-carousel) and `ToGallery` are wired up in `Web.jsx` but **commented out** — dead in the current render tree, kept for possible reuse.

**`/about`** — placeholder only (`<Text>` headings, no real content).

**`/Images`** — despite the name, renders `adminImages/ProjectGrid` (public list of published projects with image galleries). Reads like an early scaffold page that was never finished/renamed; the actual "Image" nav link (`Nav.jsx`) points here.

**`/projects`** — infinite horizontal-scroll gallery (`HorizontalScroll` in `projects/page.jsx`): triples the project list for seamless wraparound, supports wheel + drag-to-scroll, tracks a progress bar, links each card to `/projects/${project.id}`.

**`/projects/[slug]`** — `page.jsx` reads `slug` via `useParams()` (client-side, not a server component despite the dynamic-segment convention), loads all projects via `useProjectData()`, finds the matching one by `slug === project.id`, and computes next/prev by array index (wraps around). Delegates rendering to `project-client.jsx`:
- Animated nav (prev/next project links, live scroll-progress bar, project title).
- Hero grid showing title/description plus a metadata grid (`projectType`, `location`, `scale`, `buildTime`, `deliveredAt`, `teamMembers`) — each field conditionally rendered only if present.
- `ProjectImageGrid` (`Components/ImageGrid.jsx`): auto-layouts images by orientation — landscape gets a full-width row, consecutive portraits pair up side-by-side, an unpaired portrait alternates left/right — each image has a scroll-driven scale-down effect (1.2× → 1.0×) done with a raw `requestAnimationFrame` loop, not GSAP.
- Footer section that's `pin`-ned via `ScrollTrigger`; once its internal progress bar reaches 100%, it fades out and **hard-navigates** (`window.location.href`) to the next project — a full page reload rather than a client-side route change, which also bypasses the `TransitionLink` stair-wipe used everywhere else.

**`/admin`** — client-only session gate: checks `supabase.auth.getSession()` in `useEffect`, redirects to `/admin/login` if absent. No middleware/SSR protection, so the protected page's JS briefly loads before the redirect fires. Hosts `ProjectForm` (create/edit) and `AdminProjectList` (list/publish-toggle/edit/delete) side-by-side.

**`/admin/login`** — Supabase `signInWithPassword`, redirects to `/admin` on success.

## Animation & transition system

- **Page transitions**: `TransitionContext` holds a single `overlayRef` shared app-wide. `TransitionLink` intercepts `<Link>` clicks, animates 5 black "stair" columns to full height (`stagger: -0.08`), then calls `router.push`. `LayoutContent` (mounted once in `app/layout.tsx`, keyed off `usePathname()`) plays the reveal (stairs back to `y: 100%`) on every route change and calls `ScrollTrigger.refresh()` afterward so pinned/scrubbed triggers recalculate for the new page's layout.
- **Smooth scroll**: `SmoothScrollProvider` wraps the whole app in `ReactLenis`, drives Lenis from `gsap.ticker` (so GSAP and Lenis share one rAF loop), and forwards Lenis scroll events into `ScrollTrigger.update` so pinned GSAP animations stay in sync with the eased scroll position.
- **Text/GSAP primitives** (`app/Components/text.js`) — a single file exports most of the reusable animated-text building blocks used everywhere: `Texts`/`Text` (static styled heading), `Chars` (char-split reveal), `Words`/`GalleryWords` (line-split reveal + wraps in a `Link`), `ScrollWords` (line-split reveal gated by `ScrollTrigger`), `Scrolltexts` (horizontal marquee-style scrub), `Animateword` (char-split reveal, no scroll gate), `Buttons`, and `Marquee` (CSS-keyframe infinite scroller). The `types` map (`heading`, `subheading`, `page`, `paragraph`, `paragraph2`, `small`, `link`) is the de-facto type-scale/typography system for the whole marketing site — there's no Tailwind theme-level typography config, so every text size lives in this one object as viewport-unit (`vw`/`vh`) classes.
- **Two independent "scroll-reactive marquee" implementations** exist with nearly identical code (`LogoMarquee.jsx` biased left, `LogoMarquee2.jsx`/`LogoMarqueeleft` biased right): both track scroll delta into a velocity value with asymmetric ease-in/ease-out, then drive a `translateX` via `requestAnimationFrame`, independent of GSAP/ScrollTrigger.

## Styling conventions

- Tailwind v4 utility classes dominate; sizing is almost entirely viewport units (`vw`/`vh`) rather than Tailwind's spacing scale, which is why the design is describable as "art-directed / scroll-cinematic" rather than a conventional responsive grid — there is little to no explicit mobile breakpoint handling outside `gallery.css`'s one `@media (max-width: 900px)` rule.
- `globals.css` defines the Tailwind theme wiring (`--font-geist-sans`, `--font-google-sans`, `--font-geist-mono`), a `.no-scrollbar` utility, and CSS-keyframe marquee classes (`marquee-track`, `scroll-down`/`scroll-up`/`paused`) that appear to be an alternate/earlier marquee approach not currently wired to any component that references those exact class names.
- `gallery.css` is scoped to the project detail page only (imported directly in `project-client.jsx`) and defines the `.project-nav`, `.project-page-scroll-progress`, `.project-footer`, `.next-project-progress` etc. classes referenced there.
- Dark mode CSS variables are present but commented out in `globals.css` — the site is light-theme only in practice.

## Known inconsistencies / dead code (for future cleanup)

- **Stray routes** — see "Routing hazard" above (`app/Components/{animation,logo,test}/page.jsx`).
- **`app/Images/page.jsx`** — name, in-file comment ("PUBLIC USER PAGE"), and actual content (a generic `ProjectGrid`) all disagree; likely a leftover scaffold from an earlier iteration of the CMS demo.
- **Duplicate data hooks** — `adminImages/ContentGrid.tsx` (`useProjects`), `adminImages/AdminProjectList.tsx`, and `adminImages/ProjectGrid.tsx` each independently query `projects`/`project_images` instead of sharing one hook; `ProjectGrid.tsx` is also the only place with a realtime subscription, so admin edits made elsewhere won't live-update anywhere except that one component.
- **`Components/ImageGrid.jsx`** contains a large fully-commented-out earlier version of itself (differs only in key derivation: `img.src` vs `img.id`/`img.image_url`) — safe to delete once confirmed unneeded.
- **`Components/Forth.jsx`** and **`Components/toGallery.jsx`** are fully built but commented out of `Web.jsx`'s render tree.
- **Hard navigation on project→project transition** — `project-client.jsx`'s footer auto-advance uses `window.location.href`, causing a full reload and skipping the `TransitionLink` stair-wipe that every other in-app navigation uses.
- **No SSR/middleware auth guard** — `/admin` protection is entirely client-side (`useEffect` + redirect), so the page briefly mounts before the redirect can fire; a `middleware.ts` checking the Supabase session cookie would close this gap.
- **Committed secrets** — `.env.local` (containing the Supabase URL + anon key) is present in the working tree; confirm it's actually git-ignored (`.gitignore` should be checked) since anon keys are semi-public but this is still worth a deliberate decision rather than an accident.
- Numerous leftover `console.log` calls in production code paths (`ImageGrid.jsx`, `text.js`'s `Words`, `test/page.jsx`, `project-client.jsx`, `ContentGrid.tsx`).
- `app/about/page.jsx`'s component is named `pages` (lowercase) — works because it's a default export, but breaks the usual PascalCase-component convention used everywhere else.
