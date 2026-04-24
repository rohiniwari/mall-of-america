# Mall of America — Interactive Sales Deck

> A cinematic, full-screen interactive sales presentation built for Mall of America. Designed to captivate prospective tenants, investors, and partners through immersive storytelling, rich data visualization, and elegant motion design.

🔗 **Live Demo:** [https://mall-of-america.vercel.app](https://mall-of-america.vercel.app) *(update with your Vercel URL)*

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Design Decisions](#design-decisions)
- [Features](#features)
- [Performance Optimizations](#performance-optimizations)
- [AI Tools Used](#ai-tools-used)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

This project is a **7-slide interactive sales deck** that presents Mall of America as a premier retail, dining, and entertainment destination. It replaces traditional PowerPoint presentations with a web-native experience featuring:

- Full-viewport slide transitions with scroll, touch, and keyboard navigation
- Animated stat counters with intersection-observer triggered count-ups
- Glassmorphism UI with gold-accented luxury aesthetics
- Background video loops with gradient overlays
- Responsive design for desktop and mobile

### Target Audience
- Prospective retail tenants & flagship brands
- Restaurant operators & hospitality groups
- Event sponsors & entertainment partners
- Real estate investors & stakeholders

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | ^19.2.5 | UI component architecture |
| **Build Tool** | Vite | ^8.0.10 | Fast dev server & optimized production builds |
| **Language** | JavaScript (ES Modules) | — | Source code |
| **Styling** | Inline Styles + CSS | — | Component-scoped styles + global design system |
| **Icons** | Lucide React | ^1.8.0 | Iconography |
| **Fonts** | Google Fonts | — | Playfair Display, Inter, Cormorant Garamond |
| **Linting** | ESLint | ^10.2.1 | Code quality |
| **Video Processing** | ffmpeg-static | ^5.3.0 | Development-time video compression |

### Why This Stack?

- **React 19**: Latest version with improved performance and concurrent features. Chosen for component reusability and state management simplicity.
- **Vite**: Selected over Create React App for significantly faster HMR (Hot Module Replacement) and smaller production bundles via Rollup.
- **Inline Styles**: Used throughout for co-located styling with components, enabling dynamic theming per slide without CSS-in-JS library overhead.
- **No CSS Framework**: Custom CSS design system built from scratch to achieve a unique, premium aesthetic that off-the-shelf frameworks cannot provide.

---

## Project Structure

```
mall-of-america/
├── public/                          # Static assets served at root
│   ├── *.mp4                        # Background videos (compressed)
│   ├── *.jpg / *.png               # Images & hero assets
│   ├── favicon.svg                  # Site favicon
│   ├── icons.svg                    # SVG sprite sheet
│   ├── videos-original/             # Original uncompressed video backups
│   └── assets/                      # Additional static assets
│
├── scripts/
│   └── compress-videos.cjs          # FFmpeg video compression script
│
├── src/
│   ├── App.jsx                      # Root app — slide orchestration & navigation
│   ├── main.jsx                     # React DOM entry point
│   ├── index.css                    # Global design system, CSS variables, animations
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── Hero.jsx                 # Hero section (legacy — replaced by IntroSlide)
│   │   ├── Navbar.jsx               # Fixed navigation bar
│   │   ├── SlideController.jsx      # Dot progress + prev/next controls
│   │   ├── StatsBar.jsx             # Animated statistics grid
│   │   ├── Footer.jsx               # Footer component
│   │   ├── CallToAction.jsx         # CTA sections
│   │   ├── ExperienceZones.jsx      # Zone cards (retail, dining, etc.)
│   │   ├── Opportunities.jsx        # Leasing opportunity cards
│   │   └── slides/                  # Full-screen slide components
│   │       ├── IntroSlide.jsx       # Hero / landing slide
│   │       ├── WhyMOASlide.jsx      # Vision & overview
│   │       ├── RetailSlide.jsx      # Luxury retail zone
│   │       ├── DiningSlide.jsx      # Dining & culinary
│   │       ├── AttractionsSlide.jsx # Theme park & attractions
│   │       ├── EventsSlide.jsx      # Events & concerts
│   │       └── ConnectSlide.jsx     # Contact / final slide
│   │
│   ├── data/
│   │   └── content.js               # Centralized content store (copy, stats, zones)
│   │
│   └── assets/                      # Bundled assets (images, SVGs)
│       ├── hero.png
│       ├── react.svg
│       └── vite.svg
│
├── index.html                       # HTML entry point with meta tags
├── vite.config.js                   # Vite configuration
├── vercel.json                      # Vercel deployment config
├── package.json                     # Dependencies & scripts
├── eslint.config.js                 # ESLint rules
├── .gitignore                       # Git ignore patterns
├── .gitattributes                   # Git line-ending config
└── README.md                        # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** `>= 20.0.0`
- **npm** `>= 10.0.0` (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rohiniwari/mall-of-america.git
cd mall-of-america

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Create optimized production build in `dist/` |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Run ESLint across the codebase |
| Compress Videos | `node scripts/compress-videos.cjs` | Compress MP4 videos using FFmpeg |

---

## Design Decisions

### 1. Visual Identity: Dark Luxury with Gold Accents

The design language was crafted to evoke **premium real-estate marketing** rather than typical retail websites:

- **Obsidian black** (`#080808`) as the base — reduces eye strain in fullscreen presentations and conveys sophistication
- **Gold gradient** (`#c9a84c` → `#e8c97a`) — directly ties to luxury retail aesthetics (think Rolex, Tiffany, Chanel)
- **Glassmorphism cards** — `backdrop-filter: blur(18px)` with semi-transparent borders create depth without heavy visual weight
- **Serif + Sans-serif pairing** — Playfair Display for headlines (editorial elegance) + Inter for body (modern readability)

### 2. Slide-Based Navigation Architecture

Instead of a traditional scrolling website, we implemented a **viewport-locked slide deck**:

- Each slide occupies exactly `100vh` and is stacked vertically
- CSS `transform: translateY()` slides the entire container up/down
- This mimics PowerPoint/Keynote behavior while preserving web-native interactivity

**Why?** Sales decks are consumed sequentially. Free-scrolling risks users missing key content. The locked-slide approach ensures controlled narrative pacing.

### 3. Multi-Modal Input Support

The deck supports three input methods for maximum accessibility:

| Input | Trigger | Behavior |
|-------|---------|----------|
| **Wheel / Trackpad** | Scroll up/down | Advances when at slide boundary (top/bottom) |
| **Touch Swipe** | Swipe up/down | Advances with 60px threshold + boundary check |
| **Keyboard** | Arrow keys | Direct next/prev with boundary detection |

**Boundary Detection**: Users can scroll *within* a slide (e.g., reading long content) without accidentally advancing. The deck only transitions when the user reaches the absolute top or bottom of the current slide.

### 4. Content-Driven Architecture

All copy, statistics, and zone data live in `src/data/content.js`:

```javascript
// Single source of truth for all content
export const siteContent = {
  hero: { eyebrow, title, sub, ctas },
  stats: [ { value, suffix, label, icon }, ... ],
  zones: [ { id, label, title, body, highlights, accent }, ... ],
  opportunities: [ { id, title, size, desc, features, status }, ... ]
};
```

**Benefits:**
- Content updates require zero component changes
- Easy to localize (swap `content.js` for different languages)
- Content editors can modify copy without touching React code

### 5. Inline Styles Over CSS-in-JS

Every component uses inline `style` objects rather than CSS modules or styled-components:

**Pros:**
- Zero runtime CSS-in-JS overhead (no styled-components emotion cache)
- Co-located with component logic — no context switching between `.jsx` and `.css` files
- Dynamic values (props, state) applied directly without template literals
- No CSS specificity wars

**Cons:**
- No CSS pseudo-class hover states (worked around with className toggles)
- Media queries require JS (used `clamp()` for fluid typography instead)

For a presentation-grade site with no user-generated content, the trade-off was acceptable.

### 6. Video Compression Pipeline

Original video assets totaled **222.2 MB** — unacceptable for web deployment. A custom FFmpeg script (`scripts/compress-videos.cjs`) was built:

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| Total Size | 222.2 MB | 44.5 MB | **80.0%** |
| Largest File | 106.3 MB | 10.1 MB | **90.5%** |

**Settings:** H.264 codec, CRF 28, `veryfast` preset, 720p max resolution, AAC audio at 128kbps.

---

## Features

### Slides

| # | Slide | Key Content |
|---|-------|-------------|
| 1 | **Introduction** | Hero video background, animated headline, CTA buttons |
| 2 | **Why MOA** | Vision statement, key stats with count-up animations |
| 3 | **Retail & Luxury** | 520+ brands, flagship positioning, revenue metrics |
| 4 | **Dining** | 100+ concepts, revenue share, visit duration impact |
| 5 | **Attractions** | Nickelodeon Universe, 7-acre indoor theme park |
| 6 | **Events & Platform** | 200+ annual events, 12K capacity venue |
| 7 | **Connect** | Leasing inquiry form, contact details, social links |

### Interactive Elements

- **Progress Dots** — Left-side navigation with active-state gold highlight
- **Slide Counter** — Bottom-right showing "01 — Introduction / 07"
- **Animated Stat Counters** — Numbers count up with cubic easing when scrolled into view
- **Floating Particles** — CSS-animated gold specks for ambient depth
- **CTA Buttons** — Gradient gold primary + glass secondary with hover states

### Accessibility

- `aria-label` and `aria-live` attributes for screen readers
- Keyboard-only navigation support
- Reduced motion support can be added via `prefers-reduced-motion`
- Semantic HTML (`<section>`, `<nav>`, `<header>`)

---

## Performance Optimizations

| Technique | Impact |
|-----------|--------|
| Video compression (FFmpeg) | 80% reduction in asset size |
| `will-change: transform` on slide container | GPU-accelerated slide transitions |
| Google Fonts preconnect | Faster font loading |
| `clamp()` for fluid typography | No breakpoint-based font-size rules |
| Passive event listeners for wheel/touch | Smoother scrolling, no blocking |
| Intersection Observer for animations | Animations only trigger when visible |

**Lighthouse Targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

---

## AI Tools Used

This project was developed with assistance from the following AI tools:

### 1. **Blackbox AI** (Primary Coding Assistant)
- **Usage:** Architecture planning, component scaffolding, debugging, refactoring
- **Contribution:**
  - Generated the initial slide deck architecture and navigation logic
  - Built the `useCountUp` custom hook with `IntersectionObserver`
  - Created the FFmpeg compression script with optimal settings
  - Debugged wheel/touch boundary detection edge cases
  - Refactored monolithic components into modular slide structure

### 2. **ChatGPT / GPT-4** (Content & Copy)
- **Usage:** Sales copy refinement, content structuring
- **Contribution:**
  - Polished marketing copy for each slide
  - Structured `siteContent` data object for maintainability
  - Suggested stat highlights and value propositions

### 3. **Vercel AI / Deployment Assistant**
- **Usage:** Deployment configuration
- **Contribution:**
  - Configured `vercel.json` for correct build output
  - Migrated from GitHub Pages to Vercel (updated `base` path in Vite config)

### Human Oversight
- All design decisions (color palette, typography, layout) were human-directed
- AI-generated code was reviewed, tested, and refined before commit
- Accessibility attributes and semantic HTML were manually verified

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) for auto-deploy on push.

### GitHub Pages (Legacy)

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included for GitHub Pages deployment. Update `vite.config.js`:

```javascript
base: '/mall-of-america/',  // for GitHub Pages
```

---

## Future Improvements

Given more time, the following enhancements would be pursued:

### 1. Video Streaming & CDN
- Move background videos to a CDN (Cloudinary, AWS S3 + CloudFront, or Vercel Blob)
- Implement adaptive bitrate streaming (HLS/DASH) for slower connections
- Add video poster images for instant first-frame rendering

### 2. Animations & Micro-Interactions
- Integrate **Framer Motion** for declarative, physics-based slide transitions
- Add staggered entrance animations per slide element
- Implement parallax scrolling on background layers

### 3. Lead Capture & Analytics
- Connect the "Leasing Inquiries" form to a backend (Vercel Serverless Functions + Airtable/Notion)
- Add **Google Analytics 4** or **Plausible** for slide-level engagement tracking
- Implement **Hotjar** or **Microsoft Clarity** for heatmaps and session recordings

### 4. Content Management
- Migrate hardcoded content to a headless CMS (Sanity, Strapi, or Contentful)
- Enable real-time content updates without code deployments
- Add multi-language support (i18n) for international investors

### 5. Performance
- Implement **lazy loading** for off-screen slides (React.lazy + Suspense)
- Add **Service Worker** for offline presentation capability
- Preload next-slide assets during current slide viewing

### 6. Accessibility
- Full WCAG 2.1 AA audit and remediation
- `prefers-reduced-motion` media query support
- Screen-reader tested slide announcements

### 7. Mobile Experience
- Touch swipe gesture improvements (momentum scrolling)
- Optimized portrait video backgrounds
- Bottom-sheet UI for mobile controls

---

## License

This project is proprietary and created for demonstration purposes. All Mall of America branding, statistics, and imagery are used for portfolio showcase only.

---

<p align="center">
  Built with care by <a href="https://github.com/rohiniwari">@rohiniwari</a> with React, Vite, and a lot of gold.
</p>

