# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Yosua Portfolio
**Category:** Personal portfolio, Data Analyst / BI internship track
**Note:** The auto-generated `--design-system` search matched "Enterprise Gateway / Data-Dense
Dashboard" and later "Brutalism / Scroll-Triggered Storytelling" — both rejected. Enterprise
Gateway is a SaaS product-marketing pattern (Solutions by Industry/Role, Client Logos, Contact
Sales) that doesn't fit a personal site. Brutalism is explicitly for design/creative portfolios,
and this user's brain notes (`Portofolio Jalur Data.md`) explicitly reject a "gaya desainer"
direction — a prior creative-portfolio reference ("Veronica PW") was thrown out for exactly that
reason. This file was assembled by hand from targeted `--domain color` / `--domain typography`
queries instead, picked for a clean, credible, corporate-recruiter-facing analyst site.

---

## Global Rules

### Color Palette

| Role | Light | Dark | CSS Variable |
|------|-------|------|--------------|
| Background | `#F8FAFC` | `#0B1220` | `--background` |
| Foreground (ink) | `#0F172A` | `#E2E8F0` | `--foreground` |
| Card | `#FFFFFF` | `#111827` | `--card` |
| Card Foreground | `#0F172A` | `#E2E8F0` | `--card-foreground` |
| Primary (CTA / links) | `#2563EB` | `#3B82F6` | `--primary` |
| Primary Foreground | `#FFFFFF` | `#0B1220` | `--primary-foreground` |
| Secondary (surface) | `#F1F5F9` | `#151E30` | `--secondary` |
| Secondary Foreground | `#0F172A` | `#E2E8F0` | `--secondary-foreground` |
| Muted | `#E9EEF6` | `#151E30` | `--muted` |
| Muted Foreground | `#475569` | `#94A3B8` | `--muted-foreground` |
| Accent (subtle hover fill) | `#EFF4FF` | `#16233E` | `--accent` |
| Accent Foreground | `#1D4ED8` | `#93C5FD` | `--accent-foreground` |
| Border | `#E2E8F0` | `#1F2A3D` | `--border` |
| Destructive | `#DC2626` | `#F87171` | `--destructive` |
| Ring | `#2563EB` | `#60A5FA` | `--ring` |
| Data accent (secondary series, sparing use) | `#0D9488` | `#3FD0BD` | `--data` |

**Reasoning:** navy ink + single blue accent reads as analyst/BI, not generic SaaS-blue-on-white
or startup-gradient. The teal `--data` token exists only for chart series / small data
highlights (e.g. a metric tag) — never as a second UI accent competing with `--primary`.

Chart categorical set (`--chart-1..5`, for any inline data-viz): `#2563EB`, `#0D9488`,
`#D97706`, `#7C3AED`, `#E11D48`.

### Typography

- **Heading font:** Lexend
- **Body font:** Source Sans 3
- **Data/metric font (numbers, tags, code-like labels):** JetBrains Mono
- **Mood:** corporate, trustworthy, accessible, readable, precise — deliberately not Inter
  (the most overused font in AI-generated portfolios; Lexend keeps the "clean professional" brief
  without reading as a template).
- **Google Fonts:** loaded via `next/font/google` (self-hosted by Next.js, no external request) —
  `Lexend`, `Source_Sans_3`, `JetBrains_Mono`.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Icon gaps, inline spacing |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Section padding |
| `--space-xl` | `32px` | Large gaps |
| `--space-2xl` | `48px` | Section margins |
| `--space-3xl` | `96px` | Section vertical rhythm (desktop) |

### Radius

Base `--radius: 0.75rem` (shadcn scale derives sm/md/lg/xl/2xl from this). Rounded but not
playful-bubbly — cards at `lg`, buttons at `md`, badges/pills at `full`.

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(15,23,42,.05), 0 1px 3px rgba(15,23,42,.06)` | Subtle lift |
| `--shadow-md` | `0 8px 24px -12px rgba(15,23,42,.18)` | Cards on hover |
| `--shadow-lg` | `0 24px 60px -28px rgba(15,23,42,.30)` | Hero visuals, featured cards |

---

## Section Order (this project's own pattern, not a stock landing pattern)

Decided with the user directly (not from the `landing` domain's "Portfolio Grid" pattern, which
assumes a visuals-first creative gallery — wrong fit for a findings-first analyst site):

1. **Navbar** — sticky, logo/name + section links + CV download + theme toggle
2. **Hero** — name, role headline, one-line value prop, primary CTA (View Projects) + secondary
   CTA (Download CV)
3. **About** — BINUS SI / BI concentration, Lab Assistant experience, the OMC differentiator
4. **Skills** — hard skills grouped (Data & BI, Database & Query, Productivity), not a soft-skill
   fluff list
5. **Education** — BINUS, concentration, relevant coursework, SIS Appreciation Day as a signal
6. **Experience** — Laboratory Assistant timeline entry
7. **Projects** — exactly 3 cards, **findings-first** format per `Portofolio Jalur Data.md`:
   finding stated as a number/result in the card title, method demoted to a detail line, not the
   headline
8. **Certificates & Awards** — grid of cards, real dates, the two separate "Best Assistant" awards
   kept distinct (not merged into one line)
9. **Contact** — email, LinkedIn, WhatsApp (optional)

No Organizations/Activities section (AIESEC/HIMSISFO-style) — the user has no equivalent content.
No project detail sub-pages — only 3 projects exist, so expandable cards/modals on the single page
are enough; separate routes would be empty scaffolding.

---

## Component Specs

### Buttons (shadcn `Button`)

- Primary: solid `--primary` bg, white text, `radius-md`, `shadow-sm` → `shadow-md` on hover,
  150–200ms transition, slight `translateY(-1px)` on hover (no layout shift).
- Secondary/outline: transparent bg, `1px solid --border`, `--foreground` text, fills
  `--secondary` on hover.

### Cards

- `--card` background, `radius-lg`, `1px solid --border`, `--shadow-sm` at rest,
  `--shadow-md` + `translateY(-2px)` on hover, 200ms ease.

### Badges/Pills

- `radius-full`, small caps or mono label, `--accent` bg + `--accent-foreground` text for neutral
  tags; `--data` bg (10–15% opacity) + `--data` text for data/metric tags specifically.

---

## Motion

"Medium" per the user's own brief (not none, not maximal): scroll-reveal on section entry
(fade + 8–12px translateY, ~400ms, stagger children ~60ms), count-up on stat numbers when they
enter viewport, hover lift on cards/buttons as above. Respect `prefers-reduced-motion`: disable
translateY/stagger, keep opacity fade only.

---

## Anti-Patterns (Do NOT Use)

- Generic hero gradient blobs / glassmorphism — reads as templated
- Emoji as icons — use `lucide-react`
- Inter as the primary typeface — see typography reasoning above
- Merging the two "Best Assistant" awards into one line (factually wrong, see brain notes)
- Padding out Projects to look like more than 3 real items
- Fake org/activities section with no real content behind it

## Pre-Delivery Checklist

- [ ] No emojis used as icons (lucide-react only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with 150–300ms transitions
- [ ] Light mode text contrast ≥ 4.5:1
- [ ] Visible focus states for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind the sticky navbar (`scroll-margin-top` on sections)
- [ ] No horizontal scroll on mobile
