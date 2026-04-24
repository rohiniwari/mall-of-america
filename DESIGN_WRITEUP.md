# Design Rationale & Build Process

## Mall of America — Interactive Sales Deck

---

## 1. Design Rationale

### 1.1 The Problem with Traditional Sales Decks

PowerPoint and PDF decks have been the default for real-estate and retail leasing presentations for decades. They suffer from three fundamental problems:

1. **Passive consumption** — Viewers read static slides with no interactivity
2. **Poor data storytelling** — Statistics appear as plain text rather than animated revelations
3. **No behavioral analytics** — You never know which slide held attention or which stat resonated

This project was born from a simple question: *What if a sales deck felt as immersive as a luxury brand's flagship website?*

### 1.2 Design Principles

Five principles guided every decision:

#### Principle 1: Theatrical Pacing
A sales narrative has a beginning, middle, and end. The 7-slide structure mirrors a three-act play:
- **Act I (Slides 1–2):** Hook — Establish credibility and scale
- **Act II (Slides 3–6):** Evidence — Retail, dining, attractions, events
- **Act III (Slide 7):** Action — Direct call to connect

The viewport-locked slide mechanic enforces this pacing. Users cannot accidentally scroll past a key message.

#### Principle 2: Data as Drama
Numbers like "40M+ annual visitors" are impressive on paper but invisible in memory. By animating counters with `requestAnimationFrame` and cubic easing, statistics become **events** — the viewer watches the number climb, creating a moment of delight and reinforcement.

#### Principle 3: Luxury Through Restraint
Premium design is not about adding gold everywhere. It's about **intentional scarcity**:
- One accent color (gold) used sparingly for CTAs and highlights
- Generous whitespace — content breathes within each slide
- No clutter — no sidebars, no navigation menus, no ads
- One font for headlines (Playfair Display serif) + one for body (Inter sans-serif)

#### Principle 4: Multi-Sensory Immersion
Wherever possible, we engaged more than just text:
- **Motion:** Subtle floating particles, smooth slide transitions
- **Video:** Cinematic background loops (compressed for web)
- **Interaction:** Scroll, swipe, and keyboard — the deck responds to however the user prefers to navigate
- **Sound:** Muted by default, but video assets include ambient audio for future enhancement

#### Principle 5: Controlled Freedom
The paradox of great UX: users want freedom, but too much freedom creates anxiety. The boundary-aware navigation system (wheel + touch + keyboard) gives users **local freedom** (scroll within a slide) while maintaining **global control** (advance only at boundaries).

### 1.3 The Color Story

| Color | Hex | Role | Psychology |
|-------|-----|------|------------|
| Obsidian | `#080808` | Background | Sophistication, depth, focus |
| Gold | `#c9a84c` | Accent | Luxury, prestige, warmth |
| Cream | `#f7f2e8` | Primary text | Readability, elegance |
| Silver | `#b8bcc8` | Secondary text | Hierarchy, subtlety |

The dark background was non-negotiable. In a sales meeting — often projected on a screen or viewed on a laptop in a dimmed conference room — dark mode reduces glare and makes gold accents pop with physical luminosity.

### 1.4 Typography Hierarchy

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Hero Headline | Playfair Display | 400 | `clamp(3rem, 7vw, 6rem)` | -0.01em |
| Section Title | Playfair Display | 400 | `clamp(2.2rem, 4.5vw, 3.8rem)` | -0.01em |
| Eyebrow Label | Inter | 500 | 0.68rem | 0.36em |
| Body Copy | Inter | 300 | `clamp(0.88rem, 1.4vw, 1rem)` | 0 |
| CTA Button | Inter | 500 | 0.75rem | 0.18em |

The wide letter-spacing on eyebrows and CTAs creates **visual breathing room** — these elements feel intentional and crafted, not templated.

### 1.5 Why Inline Styles?

A controversial decision: every component uses inline `style` objects instead of CSS Modules, Tailwind, or Styled Components.

**The reasoning:**
1. **Co-location** — Styles live in the same file as the component logic. No context-switching between `.jsx` and `.css`.
2. **Dynamic theming** — Each slide has a unique accent color (retail = gold, attractions = purple, dining = green). Inline styles make per-slide theming trivial.
3. **Zero dependency overhead** — No styled-components runtime, no Tailwind purging complexity, no CSS-in-JS cache.
4. **Presentation-grade simplicity** — This is not a user-generated-content platform. The component tree is shallow and the style surface area is bounded.

The trade-off — no native CSS pseudo-selectors — was mitigated by using CSS classes for hover states and transitions defined in `index.css`.

---

## 2. How AI Was Used

### 2.1 Architecture & Scaffolding (Blackbox AI)

The initial build was scaffolded with Blackbox AI in three iterative phases:

**Phase 1: Foundation**
- Generated the Vite + React project structure
- Built the slide container with `translateY` transform logic
- Implemented the three input handlers (wheel, touch, keyboard)

**Phase 2: Components**
- Created the `useCountUp` hook with `IntersectionObserver`
- Built `SlideController` with dot navigation and prev/next controls
- Scaffolded all 7 slide components with consistent layout patterns

**Phase 3: Polish**
- Debugged boundary detection edge cases (fast scrolling, touch momentum)
- Created the FFmpeg video compression script
- Optimized animation timing and easing curves

**Human edits after AI generation:**
- Refactored a monolithic `App.jsx` into the current slide-based architecture
- Adjusted color values for better contrast and brand alignment
- Added `aria-*` attributes for accessibility
- Fine-tuned animation delays and durations for rhythm

### 2.2 Content Refinement (ChatGPT / GPT-4)

Marketing copy was iteratively refined:
- Initial AI drafts tended toward generic superlatives ("world-class," "premier," "unmatched")
- Human curation replaced clichés with specific, credible claims ("$2.87B annual revenue," "47-minute visit extension")
- The `siteContent` object structure was designed by AI and populated by human editors

### 2.3 Deployment (AI-Assisted)

- Vercel configuration (`vercel.json`) was generated with AI guidance
- The migration from GitHub Pages (`base: '/mall-of-america/'`) to Vercel (`base: '/'`) was AI-assisted

### 2.4 What AI Did NOT Do

- **Design decisions** — Color palette, typography, spacing, and layout were human-directed
- **Asset curation** — Video selection, image choices, and icon design were manual
- **Accessibility audit** — Semantic HTML and ARIA attributes were manually verified
- **Performance testing** — Lighthouse scores and video compression benchmarks were human-run

---

## 3. What Would Be Improved With More Time

### 3.1 Animation & Motion (High Priority)

**Current state:** CSS transitions and keyframes power all motion. Slide transitions are a single `translateY` with cubic-bezier easing.

**Desired state:**
- **Framer Motion** integration for physics-based, interruptible animations
- Staggered element entrance (eyebrow → headline → subline → CTAs cascade in)
- Parallax on background images and videos for depth
- Exit animations (current slide fades out as next slides in)
- `prefers-reduced-motion` respect for accessibility

**Why it matters:** Presentation tools like Keynote and PowerPoint have sophisticated transitions. A web-based deck must match or exceed that polish to be credible.

### 3.2 Video Architecture (High Priority)

**Current state:** Five MP4 videos (44.5 MB total) are served from the same domain. On slow connections, the intro video may stutter or fail to autoplay.

**Desired state:**
- CDN-hosted videos (Cloudinary, Mux, or AWS CloudFront)
- Adaptive bitrate streaming (HLS with multiple quality levels)
- Video poster frames for instant first-frame rendering
- Lazy loading — only preload the next slide's video, not all five
- Fallback to static images on very slow connections

### 3.3 Lead Capture & CRM Integration (Medium Priority)

**Current state:** The "Leasing Inquiries" button is a `mailto:` link. No data is captured.

**Desired state:**
- Embedded form with fields: Name, Company, Interest (Retail / Dining / Events / Sponsorship), Message
- Backend via Vercel Serverless Functions + Airtable / Notion API
- Auto-response email with MOA leasing brochure PDF
- Lead scoring and routing to appropriate MOA team member

### 3.4 Analytics & Insights (Medium Priority)

**Current state:** No tracking. We have no idea which slides perform best.

**Desired state:**
- Slide-level engagement tracking (time per slide, drop-off points)
- CTA click tracking (which offer generates the most interest)
- A/B testing framework for headline copy and CTA placement
- Heatmaps (Hotjar or Microsoft Clarity) for click patterns

### 3.5 Content Management System (Medium Priority)

**Current state:** All content is hardcoded in `src/data/content.js`. Updates require a code change and redeployment.

**Desired state:**
- Headless CMS (Sanity or Strapi) for MOA marketing team to edit copy
- Real-time preview before publishing
- Multi-language support (i18n) for international investors
- Scheduled content updates (seasonal promotions, event listings)

### 3.6 Mobile Experience (Medium Priority)

**Current state:** Responsive but not mobile-optimized. Videos are landscape, controls are desktop-sized.

**Desired state:**
- Portrait-optimized video backgrounds for mobile
- Bottom-sheet navigation instead of fixed corners
- Swipe gesture with momentum physics (like Instagram Stories)
- Thumb-zone optimized CTA placement

### 3.7 Performance & PWA (Low Priority)

**Current state:** Static site with no offline capability.

**Desired state:**
- Service Worker for offline presentation mode
- Preload critical assets during idle time
- `React.lazy()` + `Suspense` for off-screen slides
- Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### 3.8 Accessibility (Ongoing)

**Current state:** Basic ARIA attributes and keyboard navigation.

**Desired state:**
- Full WCAG 2.1 AA compliance audit
- Screen-reader tested with NVDA and VoiceOver
- Focus trap management during slide transitions
- High-contrast mode support
- Printable version for accessibility needs

---

## 4. Conclusion

This project demonstrates that **web-based presentations can surpass traditional slide decks** in immersion, interactivity, and measurability — without sacrificing the controlled narrative pacing that makes decks effective.

The design philosophy was simple: *every pixel should earn its place, every animation should serve the story, and every interaction should feel intentional.*

With additional time, the focus would shift from **crafting the experience** to **scaling the platform** — CMS integration, analytics, lead capture, and multi-language support would transform this from a single presentation into a reusable sales-enablement tool.

---

*Written by the project author with reflections on the build process, design decisions, and the role of AI-assisted development.*

