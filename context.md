# context.md — Premium Cinematic Portfolio Website

> Master build context for an agentic coding tool (Antigravity / autonomous AI IDE agent).
> This document is the single source of truth for design tokens, architecture, component
> contracts, animation behavior, and acceptance criteria. Treat every "must" as a hard
> constraint and every "should" as a strong default that can be revisited with reason.
>
> Source note: a `design.md` token file was supplied alongside this brief, but it describes
> an unrelated product ("carcompany.ai — Clinical," DM Mono font, teal/clinical palette).
> This document does **not** inherit those tokens — it inherits only the *structure* of that
> file (semantic token tables, do/don't rules, component state matrix, accessibility
> checklist, QA checklist) and replaces all values with the luxury black/gold/navy system
> defined below. If a real design.md for this portfolio exists, reconcile token values
> against it before implementation.

---

## 1. Context and Goals

**One-sentence intent:** Build a cinematic, three-dimensional, glass-and-metal personal
portfolio that reads as an Awwwards Site-of-the-Day candidate and functions as a job-getting
credibility asset — fast, accessible, and unambiguous about who the person is and why they're
hireable.

- **Owner/Audience:** A single individual (the site owner) presenting to recruiters, hiring
  managers, and potential clients/collaborators. Visitors are time-poor and evaluating
  competence signals (craft, technical depth, taste) within the first 5–8 seconds.
- **Primary goal:** Convert a visitor into a contact-form submission, resume download, or
  outbound click (LinkedIn/GitHub/email) by demonstrating frontend mastery *experientially*,
  not just by listing it.
- **Secondary goal:** Be fast and accessible enough that the "premium" feel never costs the
  site a real user — no motion-sickness triggers, no broken keyboard paths, no 8MB hero loads.
- **Product surface:** Single web app (desktop, tablet, mobile), no auth, statically
  deployable (Vercel-first).

---

## 2. Tech Stack (locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15+ (App Router) | Server Components by default; Client Components only where interactivity/3D/animation requires it |
| Language | TypeScript (strict mode) | `strict: true`, no implicit `any`, no `@ts-ignore` without inline justification |
| Styling | Tailwind CSS v4 | Token-driven via CSS variables + Tailwind theme extension — never raw hex in components |
| 3D | Three.js + React Three Fiber (`@react-three/fiber`) | One `<Canvas>` per page, lazy-mounted |
| 3D helpers | `@react-three/drei` | Environment, Float, useGLTF, PerformanceMonitor, AdaptiveDpr |
| Postprocessing | `@react-three/postprocessing` (Bloom, DepthOfField, ChromaticAberration) | Gated behind a quality tier (see §9) |
| Scroll animation | GSAP + ScrollTrigger | Drives 3D camera/object scroll timeline and section choreography |
| Micro/page animation | Framer Motion | Page transitions, hover/tap states, text reveals, layout animations |
| Smooth scroll | Lenis | Wraps the whole app; must stay in sync with ScrollTrigger (see §9.4) |
| Viewport detection | `react-intersection-observer` | Section-enter triggers for non-GSAP reveals, lazy mounting below the fold |
| Fonts | `next/font` (self-hosted, zero layout shift) | See §3.2 |
| Icons | `lucide-react` | Stroke-based, matches minimal-luxury aesthetic |
| Forms | Native `<form>` + Server Action (or Resend/Formspree integration) | No client-only fake-submit |
| Deployment target | Vercel | Edge-friendly; assumes Node runtime for any server actions |

Do not introduce additional animation or 3D libraries (e.g., no GSAP Club plugins requiring a
license, no Spline runtime, no Lottie) without flagging the addition explicitly — the stack
above is closed by design to keep bundle size and maintenance surface predictable.

---

## 3. Design Tokens & Foundations

All values below are **semantic tokens**. Components must reference token names
(`bg-surface-base`, `text-accent-gold`, `space-5`, etc.) — never raw hex/px in JSX or component
CSS. Tokens are defined once in `app/styles/tokens.css` as CSS custom properties and mirrored
into `tailwind.config.ts` theme extensions.

### 3.1 Color

```
color.surface.base       = #050505   /* primary background, near-black */
color.surface.raised     = #0D0D0F   /* cards, panels, raised glass surfaces */
color.surface.overlay    = #000000B3 /* modal/menu scrims, 70% black */
color.surface.glass      = rgba(255,255,255,0.04)  /* glass panel fill */
color.border.glass       = rgba(255,255,255,0.08)  /* glass panel border */
color.border.strong      = #1A1A1C

color.text.primary       = #FFFFFF
color.text.secondary     = #B8B8BC   /* body copy on dark */
color.text.tertiary      = #6E6E73   /* captions, meta, disabled */
color.text.inverse       = #050505   /* text on light/gold surfaces */

color.accent.gold        = #C88B2B   /* primary accent — CTAs, highlights, active states */
color.accent.gold.muted  = #C88B2B33 /* 20% gold, for glows/backgrounds */
color.accent.navy        = #1F3356   /* secondary accent — depth, gradients, navy glass */
color.accent.navy.muted  = #1F335666 /* 40% navy, for gradients/backgrounds */

color.state.success      = #2BAA6B
color.state.error         = #D14B4B
color.state.focus-ring    = #C88B2B  /* same as gold accent, must hit 3:1 against adjacent colors */
```

**Contrast requirements (non-negotiable, see §5):**
- `color.text.primary` on `color.surface.base` → contrast ratio **18.6:1** ✅ (AA/AAA both pass)
- `color.text.secondary` on `color.surface.base` → must be verified ≥ 4.5:1 at build time
  (current value ≈ 7.7:1 ✅)
- `color.accent.gold` (#C88B2B) on `color.surface.base` (#050505) → contrast ≈ 6.1:1, passes
  AA for normal text but **must not** be used for body copy smaller than 16px without
  re-verification; safe for headings, labels, buttons-on-dark
- `color.text.inverse` (#050505) on `color.accent.gold` (#C88B2B) → for gold-filled buttons,
  contrast ≈ 6.1:1 ✅ — use this pairing, never white-on-gold (white-on-gold ≈ 2.1:1 ✗ FAIL)
- Navy (`#1F3356`) as a *text* color on black fails AA (≈2.6:1) — navy is a **surface/accent
  only**, never used for foreground text on the base surface

### 3.2 Typography

- `font.family.primary` = **Inter** (variable) — body, UI, labels
- `font.family.display` = **General Sans** or **Clash Display**-equivalent fallback chain
  (any premium geometric/grotesk display font available via `next/font` — e.g., self-hosted
  "Founders Grotesk" or "Neue Montreal" if licensed; otherwise fall back to `Inter` at heavier
  weights) — hero/section headlines only
- `font.weight.base` = 400; `font.weight.medium` = 500; `font.weight.semibold` = 600;
  `font.weight.bold` = 700
- `font.lineHeight.base` = 1.5 (body); `font.lineHeight.tight` = 1.1 (display headlines)

Type scale (rem, 16px root):
```
font.size.xs   = 0.875rem (14px)  — captions, badges, meta
font.size.sm   = 1rem     (16px)  — body small / UI labels
font.size.md   = 1.125rem (18px)  — body default
font.size.lg   = 1.5rem   (24px)  — card titles, sub-headings
font.size.xl   = 2.25rem  (36px)  — section headings
font.size.2xl  = 3.5rem   (56px)  — hero sub-line / large stat numbers
font.size.3xl  = 5rem     (80px)  — hero headline (desktop)
font.size.hero-mobile = 2.75rem (44px) — hero headline (mobile clamp target)
```

Use CSS `clamp()` for all display sizes (`2xl`, `3xl`) so headline scale is fluid between
mobile and desktop rather than snapping at breakpoints, e.g.:
`font-size: clamp(2.75rem, 6vw + 1rem, 5rem);`

### 3.3 Spacing

8px base unit, consistent with Tailwind's default scale — do not invent one-off values:
```
space.1 = 0.5rem (8px)
space.2 = 0.75rem (12px)
space.3 = 1rem (16px)
space.4 = 1.5rem (24px)
space.5 = 2rem (32px)
space.6 = 4rem (64px)
space.7 = 6rem (96px)
space.8 = 8rem (128px)     /* section vertical padding, desktop */
space.9 = 10rem (160px)    /* hero vertical breathing room, desktop */
```

### 3.4 Radius, Shadow, Motion

```
radius.xs = 8px     /* badges, small chips */
radius.sm = 16px    /* buttons, inputs */
radius.md = 24px    /* cards, glass panels */
radius.full = 999px /* pills, avatar, magnetic button circle */

shadow.glow.gold   = 0 0 32px 0 rgba(200,139,43,0.35)
shadow.glow.navy   = 0 0 40px 0 rgba(31,51,86,0.45)
shadow.card.rest   = 0 8px 24px -8px rgba(0,0,0,0.6)
shadow.card.hover  = 0 24px 48px -12px rgba(0,0,0,0.75), 0 0 32px 0 rgba(200,139,43,0.2)
shadow.glass.inset = inset 0 1px 0 0 rgba(255,255,255,0.08)

motion.duration.instant = 150ms
motion.duration.fast    = 250ms
motion.duration.normal  = 400ms
motion.duration.slow    = 700ms
motion.duration.cinematic = 1200ms   /* hero load, page transitions */

motion.ease.standard = cubic-bezier(0.22, 1, 0.36, 1)   /* GSAP/Framer default "premium" ease */
motion.ease.in       = cubic-bezier(0.55, 0, 1, 0.45)
motion.ease.out      = cubic-bezier(0, 0.55, 0.45, 1)
motion.ease.bounce-soft = cubic-bezier(0.34, 1.56, 0.64, 1)  /* magnetic button settle only */
```

### 3.5 Glassmorphism panel spec (reusable recipe)

```css
.glass-panel {
  background: color.surface.glass;             /* rgba(255,255,255,0.04) */
  border: 1px solid color.border.glass;         /* rgba(255,255,255,0.08) */
  backdrop-filter: blur(20px) saturate(140%);
  box-shadow: shadow.glass.inset, shadow.card.rest;
  border-radius: radius.md;
}
```
Gold/navy "liquid glass" button variant layers a subtle animated gradient sweep (see §8.3)
on top of this base recipe rather than replacing it.

---

## 4. Information Architecture / Sections

Single scrolling page (`app/page.tsx`) composed of independently lazy-loadable section
components. Order is fixed per brief:

1. **Hero** — full-viewport, 3D centerpiece object, name/role headline, scroll cue
2. **About** — short narrative + portrait/abstract visual + key facts (location, focus, years)
3. **Skills** — categorized competency display (not a bare list — grouped + visually weighted)
4. **Experience** — timeline (role, company, dates, impact bullets)
5. **Featured Projects** — horizontal-scroll gallery of 3D interactive project cards
6. **Services** — what the owner offers (if freelance/consulting angle) or "how I work" if
   purely job-seeking — confirm with owner which framing applies (see §13 open question)
7. **Testimonials** — quote carousel/grid, attributed
8. **Contact** — form + direct links (email, LinkedIn, GitHub, resume download)
9. **Footer** — sitemap-lite, socials, copyright, back-to-top

Each section is its own component under `components/sections/`, each wrapped in an
`IntersectionObserver`-gated `<SectionReveal>` shell so off-screen sections don't animate or
mount heavy children (3D project cards) until near-viewport.

---

## 5. Accessibility (WCAG 2.2 AA — non-negotiable baseline)

- **Target:** WCAG 2.2 AA across the entire site, including inside the Three.js canvas
  (canvas content must have an accessible text alternative — see below).
- **Keyboard-first:** every interactive element (nav links, magnetic buttons, project cards,
  carousel controls, form fields, modal close) must be reachable and operable via Tab/Shift+Tab/
  Enter/Space, in visual DOM order. No keyboard traps in the horizontal project scroller — provide
  explicit "Previous/Next" buttons as a non-pointer escape hatch.
- **Focus-visible:** every focusable element must show a visible focus ring using
  `color.state.focus-ring` (gold), minimum 2px, with sufficient offset to be visible against
  glass panels (use `outline` + `outline-offset`, never `outline: none` without a custom
  replacement that meets the same contrast bar).
- **Contrast:** see §3.1 token-level contrast notes; re-verify any new color combination before
  shipping a component.
- **Motion sensitivity:** the entire animation system must respect
  `prefers-reduced-motion: reduce`:
  - 3D idle float, mouse-parallax, and camera scroll-drive must be disabled or reduced to ≤10%
    amplitude.
  - GSAP ScrollTrigger transforms (scale/rotate/position) must collapse to simple opacity
    fades.
  - Lenis smooth scroll must fall back to native scroll behavior.
  - Page transitions must drop to a simple crossfade.
  - This is implemented once via a `useReducedMotion()` hook (Framer Motion's built-in, or a
    custom media-query hook) consumed by every animation entry point — not re-implemented
    per component.
- **3D canvas accessibility:** the `<Canvas>` element must be marked `aria-hidden="true"` (it
  is decorative relative to the page's actual content), and all real information (name, role,
  project titles, links) must exist as real DOM text/elements layered via CSS, never baked into
  textures or canvas-only labels.
- **Forms:** every input has a visible, associated `<label>` (not just placeholder text);
  errors are announced via `aria-live="polite"` region and associated to the field via
  `aria-describedby`; required fields use `aria-required="true"` and native `required`.
- **Images:** all `<Image>` usage has descriptive `alt`; purely decorative images use `alt=""`.
- **Skip link:** a visually-hidden-until-focused "Skip to main content" link must be the first
  focusable element on the page.
- **Reflow:** content must remain usable and readable at 400% zoom / 320px width without
  horizontal scroll on non-gallery content (the horizontal *projects* scroller is the one
  intentional exception, and must still be operable by keyboard at that zoom level).

### Accessibility acceptance criteria (testable)

| Rule | Pass condition |
|---|---|
| Focus order | Tabbing through the page visits every interactive element exactly once, in visual order, with no traps |
| Focus visibility | Every focused element has a computed `outline` or equivalent ring with ≥3:1 contrast against its background, visible in both glass and solid contexts |
| Reduced motion | With OS-level reduce-motion on, no parallax/3D-rotation/camera-scroll transform exceeds 10% of its normal amplitude; page transition is a fade only |
| Contrast | Every text/background pairing shipped passes the ratios listed in §3.1, verified via automated check (e.g., axe-core or Lighthouse) in CI |
| Form errors | Submitting an invalid form moves focus to (or announces via live region) the first error, with text identifying the field and the problem |
| Canvas semantics | `<Canvas>` and all Three.js-rendered content is `aria-hidden`, and a screen reader narrating the page top-to-bottom encounters every name/title/CTA as real text |

---

## 6. Rules: Do

- Use semantic tokens (`bg-surface-raised`, `text-accent-gold`) in every component — never
  raw hex values or magic numbers in JSX/CSS.
- Every interactive component must define and visibly differ across: default, hover,
  focus-visible, active/pressed, disabled, loading (if async), and error (if applicable)
  states.
- Every component's behavior spec must cover responsive behavior (mobile/tablet/desktop) and
  at least one edge case (empty state, overflow/long text, slow network, JS-disabled
  fallback for 3D).
- Every interactive component must document keyboard, pointer, and touch behavior explicitly,
  not just "works the same as a button."
- Every accessibility claim must be paired with a way to test it (see §5 table format) —
  no acceptance criterion may be subjective-only.
- 3D scenes must degrade gracefully: device-tier detection (§9) must produce a visibly
  complete, professional site even with WebGL disabled or on low-end mobile — never a blank
  hero.
- All animation timing values must come from `motion.duration.*` / `motion.ease.*` tokens.
- All copy in CTAs must be specific and outcome-oriented ("Download Résumé", "View GitHub",
  "Send Message") — never "Click Here" / "Submit" / "Learn More" alone.

## 7. Rules: Don't

- Do not allow low-contrast text or hidden/removed focus indicators anywhere, including inside
  Framer Motion `whileHover`/`whileTap` variants that might visually suppress the ring.
- Do not introduce one-off spacing or typography values outside the defined scales in §3.2/§3.3.
- Do not use ambiguous link/button labels ("here", "this", "go") or icon-only controls without
  an accessible name (`aria-label`).
- Do not ship any interactive component without explicit state rules per §6.
- Do not let any single 3D scene exceed the performance budget in §9 — if a feature (e.g.,
  chromatic aberration + DoF + bloom simultaneously on mobile) would blow the frame budget,
  cut the feature for that tier rather than silently shipping jank.
- Do not autoplay audio. Do not autoplay any video with sound.
- Do not block the page on 3D asset loading — the hero text and nav must be visible and
  interactive before/while the 3D scene streams in (skeleton/loading state per §9.5).
- Do not use horizontal scroll-jacking on the *main* page scroll — only the explicitly
  designed horizontal Projects gallery may capture horizontal gesture/scroll, and only while
  the user's pointer is within its bounds.

---

## 8. Component-Level Rules

> Format per component: Anatomy → Variants → States → Keyboard/Pointer/Touch → Responsive →
> Edge cases. This mirrors the supplied design.md's expectation that every component define
> default/hover/focus-visible/active/disabled/loading/error states explicitly.

### 8.1 `Navbar` (`components/layout/Navbar.tsx`)

- **Anatomy:** logo/wordmark (left), section nav links (center/right), CTA button ("Contact"
  or "Résumé") (far right), mobile hamburger (≤ tablet breakpoint).
- **Variants:** transparent-over-hero (top of page) → glass-panel-on-scroll (after `space.7`
  scroll distance, background becomes `.glass-panel` recipe with reduced blur for perf).
- **States:** default; link `hover` (gold underline-draw animation, 200ms); link
  `focus-visible` (gold outline, 2px, offset 2px); `active` section indicator (current
  in-view section underlined/colored persistently, driven by `react-intersection-observer`);
  mobile menu `open`/`closed` (Framer Motion height/opacity).
- **Keyboard:** Tab through links in DOM order; Enter/Space activates; mobile menu opens via
  Enter/Space on hamburger and traps focus within the open menu (Escape closes and returns
  focus to hamburger).
- **Pointer/Touch:** hover underline-draw on desktop pointer only (no hover state simulated on
  touch — first tap navigates, does not require a second tap).
- **Responsive:** ≥1024px full horizontal nav; <1024px collapses to hamburger + full-screen
  glass overlay menu.
- **Edge cases:** very long custom name/wordmark must truncate gracefully, never wrap and break
  the bar height; nav must remain usable if logo image fails to load (text fallback).

### 8.2 `Hero3DObject` (`components/three/Hero3DObject.tsx`)

- **Anatomy:** single hero-anchoring 3D model (abstract metallic form — e.g., a faceted
  gold/navy gradient torus-knot, sphere cluster, or owner-supplied logo mark extruded in 3D;
  do **not** use a generic glTF "duck/Suzanne" placeholder in final delivery — use a primitive
  built in R3F geometry if no custom asset is supplied, parameterized so it can later be
  swapped for a real `.glb`).
- **Variants:** `quality: high | medium | low` (drives postprocessing stack, see §9.2).
- **States:**
  - *default/idle:* slow continuous float + rotation (`useFrame`, sine-based offset, ~4–6s
    period, amplitude small enough to read as "ambient," not distracting).
  - *mouse-parallax:* object rotation offsets toward cursor position with damped lerp
    (critically damped, not springy/bouncy — premium feel is calm, not playful).
  - *cursor-attraction:* object subtly translates a few px toward cursor on hover-near,
    capped to a max offset so it never drifts off-composition.
  - *scroll-driven:* GSAP ScrollTrigger maps scroll progress (0–1 per defined scroll range) to
    a timeline of position/rotation/scale keyframes — "morphs between positions" per section
    transition (Hero → About → Projects anchor points at minimum).
  - *reduced-motion:* idle float/parallax/attraction disabled; scroll-driven timeline collapses
    to a simple fade/scale-in per section, no continuous transform animation.
  - *loading:* renders a low-poly/wireframe placeholder or skeleton glow until the real
    geometry/material/environment map is ready — canvas must never show a blank black frame
    while text/nav are already visible.
  - *error/no-webgl:* falls back to a static, pre-rendered image or CSS-only gradient/orb
    (see §9.5) — site remains fully navigable and professional-looking.
- **Keyboard/Pointer/Touch:** the object itself is decorative/non-interactive for a11y
  (`aria-hidden`), so it has no keyboard path; pointer drives parallax on desktop; on touch
  devices, parallax-by-cursor is disabled (no mouse position) and only scroll-driven and idle
  animations remain active — do not attempt to fake parallax from touchmove, as that conflicts
  with page scroll gestures.
- **Responsive:** object scale and camera distance must be tuned per breakpoint so it never
  overlaps/occludes the headline text on narrow viewports; on mobile, consider reducing to a
  simpler geometry/lower segment count entirely (perf, not just visual).
- **Edge cases:** rapid resize (devtools/orientation change) must not throw or leave the
  renderer in a stale-aspect-ratio state — resize observer must update camera aspect + renderer
  size; tab backgrounding must pause the render loop (use `document.visibilitychange`) to avoid
  burning battery/GPU when the tab isn't visible.

### 8.3 `MagneticButton` (`components/ui/MagneticButton.tsx`)

- **Anatomy:** label text, optional leading/trailing icon, glass or solid-gold fill variant,
  animated light-sweep overlay element.
- **Variants:** `primary` (solid gold fill, `color.text.inverse` label — contrast-checked
  pairing), `secondary` (glass panel + gold border + white label), `ghost` (text + underline
  only, for tertiary actions).
- **States:**
  - *default:* static.
  - *hover (pointer-capable devices only):* button visually "attracted" to cursor within a
    bounded radius (translate up to ~8–12px toward pointer, `motion.ease.bounce-soft` on
    release), light-sweep gradient animates left-to-right once per hover-enter.
  - *focus-visible:* gold outline ring, same as global focus spec — must remain visible even
    though the button itself is gold/glass (use outline offset + a darker inset ring if needed
    for contrast against gold fill).
  - *active/pressed:* slight scale-down (0.97), ripple-click effect emanates from pointer-down
    coordinates and fades over `motion.duration.fast`.
  - *disabled:* reduced opacity (≈40%), no hover/magnetic/ripple behavior, `cursor: not-allowed`,
    `aria-disabled="true"`.
  - *loading:* label replaced or accompanied by a small spinner/progress indicator
    (e.g., contact-form submit button), button non-interactive while loading,
    `aria-busy="true"`.
- **Keyboard:** fully operable via Tab + Enter/Space; magnetic/ripple effects are
  pointer-only enhancements and must not be required to activate the button — Enter/Space
  triggers the same `onClick` with a simple, non-magnetic focus/press visual instead.
- **Pointer/Touch:** magnetic attraction active on `pointermove` for mouse/trackpad; on touch,
  skip the magnetic-follow (no hover concept) but keep the ripple-on-tap and press-scale.
- **Responsive:** magnetic radius and translate distance should scale down or disable on
  small viewports to avoid layout jitter near screen edges.
- **Edge cases:** button near a viewport edge must clamp its magnetic translation so it never
  pushes outside the visible/clickable area; rapid repeated clicks must not stack multiple
  ripple animations indefinitely (cap concurrent ripples, e.g., max 3, oldest auto-removed).

### 8.4 `ProjectCard3D` (`components/sections/projects/ProjectCard3D.tsx`)

- **Anatomy:** project thumbnail/render, title, one-line description, animated tech-stack
  badge row, "Live Demo" + "GitHub" link pair, floating drop-shadow.
- **Variants:** `featured` (larger, used for top 1–2 projects) vs `standard`.
- **States:** default (resting scale, soft shadow); hover (card enlarges ~1.05–1.08x, shadow
  intensifies/spreads — "floating shadow" — image subtly zooms ~1.1x inside its clipped
  container, tech badges animate in with stagger if not already revealed); focus-visible (ring
  around the whole card when it/its primary link is focused via keyboard); active/pressed (on
  the link itself); loading (skeleton shimmer while thumbnail image streams in — use
  `next/image` with blur placeholder, not a layout-shifting empty box); error (thumbnail fails
  → graceful fallback gradient block with project title still legible, links still functional).
- **Keyboard:** each card's primary heading/link, "Live Demo," and "GitHub" are independently
  focusable in a sane order; the whole card is not a single giant overlapping click target with
  nested interactive children (avoid the "link wrapping a link" anti-pattern) — make the title
  the primary link and keep Demo/GitHub as clearly separate secondary links.
- **Pointer/Touch:** hover-enlarge is pointer-hover only; on touch, tapping the card body
  (outside the explicit links) should not navigate anywhere ambiguous — only explicit links/
  buttons are tap targets, each ≥44×44px touch target per WCAG 2.2 target-size guidance.
- **Responsive:** desktop = horizontal-scroll gallery (§8.5); ≤ tablet breakpoint, fall back
  to a vertical stacked list of cards (no horizontal scroll-jacking required to read all
  projects on mobile — horizontal interaction is a desktop enhancement, not the only path).
- **Edge cases:** project with no live demo URL must hide/disable that specific button rather
  than rendering a dead link; very long project titles or descriptions must truncate with
  visible affordance (e.g., line-clamp + "read more" expand, not silent clipping).

### 8.5 `HorizontalProjectsGallery` (`components/sections/projects/HorizontalProjectsGallery.tsx`)

- **Anatomy:** sticky section wrapper, horizontally-scrolling track of `ProjectCard3D`
  instances, visible progress indicator (dots or thin bar), explicit Prev/Next buttons.
- **States:** default; `at-start` (Prev button disabled/hidden); `at-end` (Next button
  disabled/hidden); dragging (pointer-grab cursor while actively panning, if drag-to-scroll is
  implemented).
- **Keyboard:** Prev/Next buttons are the keyboard-accessible mechanism (Tab to them, Enter/
  Space to advance); arrow-key support (Left/Right) is a nice-to-have when the gallery
  container itself is focused, but must not be the *only* path.
- **Pointer/Touch:** desktop = vertical scroll-wheel input is translated to horizontal track
  movement via GSAP ScrollTrigger (the section "pins" while the track translates); touch =
  native horizontal swipe/pan on the track.
- **Responsive:** mobile/tablet may simplify to native horizontal swipe without the scroll-
  jacking pin behavior (simpler, more standard mobile UX, avoids fighting native scroll).
- **Edge cases:** must correctly recompute total scrollable distance if window resizes or if
  project count changes (CMS-driven); must not "trap" page scroll if the user is partway
  through the gallery and tries to scroll past it via keyboard (Tab/Page-Down should still be
  able to exit the section).

### 8.6 `SectionReveal` (`components/ui/SectionReveal.tsx`)

- Wrapper using `react-intersection-observer` to trigger a one-time staggered reveal
  (children fade/translate-up with Framer Motion `staggerChildren`) the first time a section
  enters the viewport, and to lazy-mount heavy children (e.g., the Projects 3D gallery) only
  once near-viewport — not on initial page load.
- Must accept a `once` boolean (default `true`) and respect reduced-motion by skipping the
  transform and only fading.

### 8.7 `ContactForm` (`components/sections/contact/ContactForm.tsx`)

- **Anatomy:** name, email, message fields (glass-panel inputs), submit `MagneticButton`
  (primary variant, loading state while submitting), success/error feedback region.
- **States:** default; field `focus-visible` (gold border + glow per `shadow.glow.gold`,
  reduced for reduced-motion users to a static ring); field `error` (red border +
  inline message, `color.state.error`); field `disabled` (during submit); submit `loading`
  (button shows spinner, fields become read-only); submit `success` (form replaced with a
  confirmation message, focus moved to it); submit `error` (network/server failure — message
  shown, form remains editable, focus moved to the error region).
- **Keyboard:** full tab order through fields → submit; Enter inside a single-line field should
  not prematurely submit unless it's the final field intentionally wired to do so.
- **Pointer/Touch:** standard input behavior; ensure inputs are not so tightly spaced that
  touch mis-taps occur (≥44px target height).
- **Responsive:** single column on mobile; may use two-column (name/email side-by-side) on
  desktop.
- **Edge cases:** client-side validation (required fields, email format) must not be the only
  validation — server action/endpoint must re-validate; empty/whitespace-only message must be
  rejected with a clear error; extremely long message text must not break layout (textarea
  scrolls, doesn't expand infinitely).

---

## 9. Performance Budget & 3D Optimization Strategy

### 9.1 Targets

- 60 FPS on desktop (mid-tier GPU, e.g., integrated Apple Silicon or a 3–4 year old discrete
  GPU) for the hero and project-card 3D scenes.
- ≥30 FPS sustained floor on mid-tier mobile; never drop into single-digit FPS — degrade
  features (postprocessing first, then geometry complexity) before allowing janky frame pacing.
- Largest Contentful Paint (LCP) target ≤ 2.5s on a simulated mid-tier mobile/4G profile, with
  the hero's *text* counting as LCP candidate, not the 3D canvas (the canvas should never block
  text paint — see 9.5).
- Total JS for first route ≤ ~350KB gzipped as a soft budget (Three.js + R3F + drei + GSAP +
  Framer Motion + Lenis is already substantial — code-split aggressively, see 9.3).

### 9.2 Device/quality tiering

Implement a lightweight tiering function (run once, client-side, before mounting the heavy
Canvas) that checks: `navigator.hardwareConcurrency`, a `prefers-reduced-motion` check, and a
coarse WebGL capability probe (e.g., max texture size / renderer string heuristics via
`drei`'s `useDetectGPU` or an equivalent lightweight check) to assign `quality: 'high' |
'medium' | 'low'`:

- **High:** full postprocessing stack (Bloom + DoF + subtle Chromatic Aberration), full
  geometry detail, real-time environment reflections via `<Environment>` HDRI.
- **Medium:** Bloom only (drop DoF + chromatic aberration), reduced geometry segment counts,
  baked/lower-res environment map.
- **Low (incl. most mobile):** no postprocessing pass at all, simplest geometry, a static/
  cheap environment (or no environment map — fall back to flat ambient + a couple of
  directional lights for the metallic look).
- **No-WebGL / explicit reduced-motion + low-end signal combo:** skip Canvas entirely, render
  the CSS/SVG fallback (9.5).

### 9.3 Loading strategy

- The R3F `<Canvas>` and its contents must be `next/dynamic` imported with `ssr: false` and a
  `loading` fallback that matches the eventual layout space (no CLS).
- Heavy postprocessing imports and the project gallery's 3D variant (if any) must be
  code-split separately from the hero bundle so the initial hero paint doesn't wait on
  Projects-section code.
- Any `.glb`/`.hdr` assets must be compressed (Draco/Meshopt for geometry, `.hdr`→ small `.exr`
  or pre-baked environment where possible) and preloaded with `useGLTF.preload()` only once
  the hero is likely to be viewed (not blocking initial JS execution).
- Images (`next/image`) for project thumbnails must use proper `sizes`, blur placeholders, and
  `priority` only for the first above-the-fold image, never for every card.

### 9.4 Lenis + ScrollTrigger sync (critical implementation detail)

Lenis and GSAP ScrollTrigger must be explicitly bridged or they will desync (ScrollTrigger
listens to native scroll events by default; Lenis intercepts scroll and can drive `requestAnimationFrame`
itself). Required pattern:

```ts
// One Lenis instance at the app root; on every Lenis 'scroll' tick, call ScrollTrigger.update().
// Drive both Lenis and GSAP's ticker from a single rAF loop (gsap.ticker.add(...)) rather than
// letting Lenis run its own independent rAF — avoids double rAF loops and drift.
```
This must be implemented in a single `useLenis`/`SmoothScrollProvider` client component at the
root layout, not re-derived per section.

### 9.5 No-JS / no-WebGL / reduced-motion fallback (must look intentional, not broken)

- If WebGL is unavailable, or the device tier resolves to a hard fallback, render a CSS-only
  hero treatment: a soft radial gold/navy gradient "orb" with a subtle CSS animation (or static
  if reduced-motion), behind the same real headline text and CTAs. This must be designed
  up front as a real fallback composition, not an afterthought blank box.
- With JavaScript fully disabled, the page must still render server-rendered text content
  (name, role, about, experience, project list as plain links, contact info) — only the
  animation/3D/glass-interaction layer is JS-dependent; the *information* is not.

---

## 10. Animation System Conventions

- **Single source of truth per concern:** GSAP ScrollTrigger owns scroll-position-driven
  timelines (3D object transform-over-scroll, pinned/sticky section choreography, horizontal
  gallery scrubbing). Framer Motion owns discrete state-driven animation (hover/tap/focus
  variants, page-enter/exit transitions, modal/menu open-close, staggered list reveals on
  intersection). Do not let both libraries fight over the same DOM node's transform on the
  same scroll event — pick one owner per animated property per element.
- **Page transitions:** Framer Motion `AnimatePresence` wraps route-level transitions (relevant
  if/when additional routes like `/project/[slug]` exist) — exit-then-enter, not crossfade-
  overlap, to avoid double-rendered 3D canvases during transition.
- **Text reveal / split-text:** implement via a small reusable `SplitText` utility (split into
  spans by word or character, then Framer Motion `staggerChildren` on a parent variant) rather
  than per-section bespoke implementations — one component, reused for hero headline, section
  titles, and testimonial quotes.
- **Loading animation (3D logo intro):** a short (~1.5–2.5s max) intro sequence on first load
  only (respect a session check so repeat navigations within the same session don't replay it
  every time) — must be skippable (click/tap/Escape/any key dismisses immediately) and must
  itself respect reduced-motion (skip straight to the site if reduced-motion is on).
- **Cursor follower / custom cursor:** desktop-pointer-only enhancement (feature-detect
  `(hover: hover) and (pointer: fine)`), never implemented on touch; must not replace the
  native cursor in a way that hides focus/click affordance for any element that needs it — and
  must never appear over `<select>`/native form chrome where it would conflict with OS cursor
  behavior.
- **Comment requirement:** every non-trivial animation block (any GSAP timeline with more than
  2 tweens, any custom `useFrame` logic, any ScrollTrigger config) must carry a brief comment
  explaining *what visual effect it produces*, not just what the code does — this is for the
  next developer/agent picking up the codebase.

---

## 11. Folder Structure

```
/app
  /layout.tsx                 — root layout: fonts, SmoothScrollProvider, global providers
  /page.tsx                   — composes all sections in order
  /globals.css                — Tailwind base + token CSS variables import
  /(routes)/project/[slug]/page.tsx   — optional project detail deep-dive (if scoped in)

/components
  /layout/
    Navbar.tsx
    Footer.tsx
    SmoothScrollProvider.tsx  — Lenis + GSAP ticker bridge (client component)
    CustomCursor.tsx
  /three/
    Hero3DObject.tsx
    SceneEnvironment.tsx      — HDRI/lighting setup, shared by hero + project 3D previews
    useDeviceTier.ts          — quality-tier detection hook
    CanvasFallback.tsx        — CSS-only fallback composition (§9.5)
  /sections/
    Hero.tsx
    About.tsx
    Skills.tsx
    Experience.tsx
    /projects/
      FeaturedProjects.tsx
      HorizontalProjectsGallery.tsx
      ProjectCard3D.tsx
    Services.tsx
    Testimonials.tsx
    /contact/
      ContactForm.tsx
    
  /ui/
    MagneticButton.tsx
    GlassPanel.tsx
    SectionReveal.tsx
    SplitText.tsx
    ProgressIndicator.tsx     — scroll progress bar/dots
    Badge.tsx                 — tech-stack badge chip

/lib
  /animation/
    easings.ts                — motion.ease.* constants
    useReducedMotion.ts
  /content/
    profile.ts                — name, role, bio, links (CONTENT, not design)
    projects.ts
    experience.ts
    testimonials.ts
  /utils/
    cn.ts                     — className merge helper

/styles
  tokens.css                  — all CSS custom properties from §3

tailwind.config.ts            — theme extension mapping Tailwind utilities to tokens.css vars
```

Content (`/lib/content/*.ts`) must be fully separated from presentation components — every
section component receives its copy as typed props/imports from `/lib/content`, never
hardcoded inline strings for things like project titles, testimonial quotes, or experience
entries. This makes the eventual "fill in your real info" step a content-file edit, not a
component rewrite.

---

## 12. Content & Tone Standards

- **Voice:** confident, concise, first-person, achievement-oriented. Avoid generic filler
  ("passionate about creating amazing experiences") — prefer specific, falsifiable statements
  ("Shipped 12 production React/Three.js builds; reduced one client's LCP from 4.1s to 1.6s").
- **Headings:** sentence case, no trailing periods, no ALL CAPS except small eyebrow labels
  (e.g., "FEATURED WORK" as a tiny tracked-out label above a real heading is acceptable as a
  *design* treatment, not as the only heading).
- **CTA copy examples (good):** "View Live Project", "Download Résumé (PDF)", "Email Me
  Directly", "See the Code on GitHub".
- **CTA copy examples (bad — do not use):** "Click Here", "Learn More", "Submit", "Go".
- **Numbers/stats** (years experience, projects shipped, etc.) should be real and specific —
  flag to the owner during content-fill that placeholder stats must be replaced before launch,
  never shipped as lorem-ipsum-style filler.

---

## 13. Open Questions for the Owner (resolve before/while building)

1. **Services section framing:** is this purely a job-search portfolio (in which case "Services"
   may be better reframed as "How I Work" / "What I Bring to a Team") or does the owner also
   want freelance/consulting inquiries (in which case "Services" as literally scoped offerings
   makes sense)? Default assumption if unanswered: frame as job-search-first, keep Services as
   a lightweight "ways I can contribute" section rather than a pricing/service menu.
2. **Real assets:** does the owner have an actual portrait photo, resume PDF, real project
   screenshots/repos, and real testimonial sources to drop into `/lib/content`? Until supplied,
   all content files should use clearly-marked placeholder data (e.g., `"[YOUR ROLE HERE]"`)
   rather than invented fake credentials, to avoid accidentally shipping fabricated claims.
3. **3D hero object identity:** should the centerpiece be an abstract geometric form (safe,
   fast to build, on-brand with "minimal luxury"), or a literal 3D wordmark/logo of the owner's
   name/initials? Default assumption if unanswered: abstract faceted form in gold/navy gradient
   metallic material — visually striking without requiring custom 3D type modeling.
4. **Design.md reconciliation:** confirm whether the attached `design.md` (carcompany.ai —
   Clinical) was uploaded in error, or whether some of its component-density figures (buttons:
   21, cards: 21, links: 14, inputs: 4, navigation: 2) were actually meant to apply as a rough
   inventory target for *this* portfolio. This document does not assume those counts apply.

---

## 14. Anti-Patterns (explicitly prohibited)

- Scroll-jacking the entire page (locking native scroll and replacing it with a custom
  "story" scroll) — only the Projects horizontal section may capture scroll, and only while
  in-bounds.
- Auto-rotating testimonial/project carousels with no pause control and no keyboard path.
- Text baked into images/canvas/SVG-as-the-only-source for any information-bearing content
  (names, titles, links) — real DOM text only.
- Glass panels with insufficient backing contrast — never place body text directly on a glass
  panel without confirming the panel's effective contrast against its actual backdrop content
  (glass over a busy 3D scene can fail contrast even if the flat-color math looks fine).
- Decorative cursor-follower or magnetic effects that obscure or replace real focus indicators.
- Infinite "smooth scroll" that loops content seamlessly is permitted **only** in a clearly
  decorative marquee context (e.g., a tech-stack ticker) — never applied to primary page
  sections, where it would make "the end of the page" undiscoverable.
- Shipping any component without a defined disabled/loading/error state if it can plausibly
  reach one of those states in production.

---

## 15. QA Checklist (pre-launch)

- [ ] Lighthouse (mobile, throttled) — Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] axe-core / automated a11y scan — zero critical/serious violations
- [ ] Keyboard-only pass through the entire page (no mouse) — every section, every CTA, the
      Projects gallery, and the Contact form are fully operable
- [ ] `prefers-reduced-motion: reduce` toggle tested — all parallax/3D-rotation/camera-scroll/
      page-transition effects degrade per §5
- [ ] Tested with WebGL disabled (browser flag or `chrome://flags`) — fallback hero renders,
      site remains fully navigable and credible-looking
- [ ] Tested with JavaScript disabled — name, role, about, experience, project list, and
      contact info are all present as real readable text
- [ ] Frame-rate spot check (Chrome DevTools Performance panel) on hero + a project card hover
      on a throttled "Low-end mobile" CPU/GPU profile — no sustained drop into single-digit FPS
- [ ] Resize/orientation-change stress test (rapid devtools resize, mobile rotate) — no
      renderer errors, no stale aspect ratio, no layout shift
- [ ] Tab visibility test — backgrounding the tab pauses the R3F render loop (verify via
      DevTools GPU/CPU usage dropping when tab is hidden)
- [ ] Contrast audit — every shipped text/background and text/gold-button pairing checked
      against §3.1 ratios
- [ ] Form validation — empty submit, invalid email, success path, and simulated server-error
      path all show correct, accessible feedback
- [ ] Content audit — zero remaining lorem-ipsum/fabricated stats; all placeholder content
      either replaced or explicitly marked `[PLACEHOLDER]` for the owner's final pass
- [ ] Cross-browser smoke test — Chrome, Safari (incl. iOS Safari — WebGL/backdrop-filter
      quirks), Firefox
- [ ] SEO basics — unique `<title>`/meta description, OpenGraph image, semantic heading order
      (single `h1`, logical `h2`/`h3` nesting), `next/font` used (no layout-shift web fonts),
      sitemap/robots present

---

## 16. Quality Gates (drafting convention for any future spec additions)

- Every non-negotiable rule added to this document must use **"must."**
- Every recommendation/default-but-revisable guidance must use **"should."**
- Every accessibility rule must ship with a testable pass/fail condition (§5 table format).
- When in doubt between a novel one-off visual flourish and an existing token/pattern, prefer
  system consistency — extend the token set deliberately (and document the addition here)
  rather than hardcoding an exception inline.

---

## 17. Definition of Done

The build is complete when: every section in §4 exists and is content-driven from `/lib/content`;
every component in §8 implements its full state matrix; the performance and accessibility
checklists in §15 pass; the §9.5 no-JS/no-WebGL fallback is real and tested, not theoretical;
and the open questions in §13 have been either answered by the owner or explicitly defaulted
per the stated fallback, with defaults clearly flagged in code comments or a `NOTES.md` for
the owner's review.
