# Phase-Wise Implementation Plan — Next.js Cinematic Portfolio

This document details the step-by-step phase-based strategy to construct the premium cinematic portfolio website. Each phase has explicit tasks, file targets, and completion criteria.

---

## Phase 1: Foundations & Tokens
**Goal:** Establish styling tokens, typography configs, utility hooks, and map source data.

### Tasks:
1. **Design Tokens Setup**: Create `@/styles/tokens.css` with color, spacing, typography, and motion variables.
2. **Tailwind Config**: Update `tailwind.config.ts` to map Tailwind utility classes to these custom CSS variables.
3. **Data Adapters**: Build the TypeScript adapters in `@/lib/content/` to read values from `Information.json` (`profile.ts`, `projects.ts`, `experience.ts`, `testimonials.ts`).
4. **Base Utilities**: Create the className merge utility `cn.ts`.

---

## Phase 2: Global Shell & Layout
**Goal:** Implement the main scroll context, global navigation, footer, and basic page transitions.

### Tasks:
1. **Smooth Scroll Provider**: Create `@/components/layout/SmoothScrollProvider.tsx` to wrap the app, initialize Lenis, and bind it to the GSAP ticker.
2. **Global Fonts**: Configure Inter and Clash Display (or equivalent fallback chain) inside `app/layout.tsx`.
3. **Navbar**: Implement `@/components/layout/Navbar.tsx` with scroll-based background morphing (transparent to glass) and active section underlines.
4. **Footer**: Implement `@/components/layout/Footer.tsx` with social links and developer copyrights.
5. **Reduced Motion Hook**: Build `@/lib/animation/useReducedMotion.ts` to consume OS preferences and adjust animation frameworks.

---

## Phase 3: WebGL centerpiece & Device Tiering
**Goal:** Build the 3D rendering pipeline and ensure performance degradation on mobile/low-end systems.

### Tasks:
1. **Device Tier Hook**: Create `@/components/three/useDeviceTier.ts` to detect GPU performance and motion sensitivity.
2. **Canvas Fallback**: Build `@/components/three/CanvasFallback.tsx` to display a CSS animated gradient orb when WebGL is disabled or on lower tiers.
3. **3D Centerpiece Object**: Create `@/components/three/Hero3DObject.tsx` rendering a high-quality abstract metallic geometry using R3F.
4. **Environment**: Setup `@/components/three/SceneEnvironment.tsx` with custom lights and HDRI map reflections.

---

## Phase 4: Sections & Scroll Animation Choreography
**Goal:** Compose the page sections and wire them to ScrollTrigger camera timelines.

### Tasks:
1. **Layout Composition**: Wire all placeholders into `app/page.tsx`.
2. **Section Reveal Wrapper**: Implement `@/components/ui/SectionReveal.tsx` to control Framer Motion scroll entry reveals.
3. **Scroll Timeline**: Set up the master GSAP scroll timeline mapping scroll progress to the rotation, position, and scale of the `Hero3DObject`.

---

## Phase 5: Content Sections
**Goal:** Build out the static content displays styled with premium glassmorphism panels.

### Tasks:
1. **Hero**: Setup name, typing animation, and scroll cue.
2. **About**: Design the brief story timeline and the "What I'm Doing" cards.
3. **Skills**: Structure categorized competency displays with custom progress indicators.
4. **Experience**: Build the vertical timeline with highlight cards.
5. **Services / Testimonials**: Add consulting framing cards and quote carousels.

---

## Phase 6: Interactive 3D Projects & Contact Form
**Goal:** Build the custom horizontal scroller and the validation-supported contact form.

### Tasks:
1. **Horizontal Project Scroller**: Implement `@/components/sections/projects/HorizontalProjectsGallery.tsx` pinning scroll to slide the cards.
2. **3D Project Cards**: Implement `@/components/sections/projects/ProjectCard3D.tsx` with tilt effects, badge reveals, and hover-triggered details.
3. **Contact Form**: Write `@/components/sections/contact/ContactForm.tsx` with visual state classes (error, success, disabled) and client/server validation.

---

## Phase 7: Optimization, Accessibility, & QA
**Goal:** Perform audits, compress assets, and complete the launch checklist.

### Tasks:
1. **A11y Checks**: Verify focus orders, focus rings, and screen-reader DOM overrides.
2. **Performance Audit**: Test Lighthouse performance and asset compression (Draco, pre-baked HDRIs).
3. **Testing**: Run cross-browser compatibility tests and responsive stress tests.
