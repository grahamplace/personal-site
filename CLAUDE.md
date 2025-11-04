# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A production-quality personal portfolio website built with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, and D3.js. The site emphasizes polish, subtle creativity, and professional presentation for recruiters and collaborators.

**Live Site**: https://graham.place

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Sonoran/SF accent palette
- **Animations**: Framer Motion for scroll-triggered reveals and micro-interactions
- **Data Viz**: D3.js for lightweight, performant visualizations
- **Content**: MDX for blog posts (checked into repo at `src/content/blog/`)
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks, lint-staged

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run typecheck        # TypeScript type checking

# Testing
npm run test             # Run Vitest tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage report
```

**Important**: After running `npm run build`, always run `npm run dev` in the background to restart the local dev server (per `.cursor/rules` line 337).

## Architecture

### Navigation System

The site uses a custom **single-page navigation** system powered by the `NavigationProvider` context (`src/components/theme/global-navigation.tsx`). Key concepts:

- **Hero Mode**: Full-screen hero overlay (`isHeroMode: true`) that fades out when user scrolls or navigates
- **Sections**: Four main sections: `hero`, `experience`, `blog`, `contact`
- **Section Navigation**: All sections are always mounted to avoid layout reflow. Hero mode overlays them, then fades out to reveal content
- **Scroll Spy**: Automatically detects current section based on viewport position (40% threshold)
- **Blog Overlay**: Blog posts open in an overlay (`BlogPostOverlay`) with URL query params (`?post=slug`)

Navigation flow:

1. User lands on hero (`isHeroMode: true`, `currentSection: 'hero'`)
2. Scrolling down or clicking triggers `navigateToSection()` → fades hero overlay, scrolls to target
3. Header appears when exiting hero mode (scroll > 400px)
4. Scroll spy updates `currentSection` as user scrolls through content

### Component Structure

```
src/
├── app/
│   ├── page.tsx              # Home route → renders <Container />
│   ├── layout.tsx            # Root layout with fonts, providers, global components
│   ├── blog/[slug]/          # Blog post pages (MDX rendering)
│   └── scroll/               # Experimental scroll animation page
├── components/
│   ├── home/                 # Homepage sections (Hero, Experience, Blog, Contact)
│   │   └── container.tsx     # Main container managing hero overlay + sections
│   ├── theme/                # Global theme components
│   │   ├── global-navigation.tsx  # Navigation context provider
│   │   ├── global-header.tsx      # Sticky header (hidden in hero mode)
│   │   ├── global-background.tsx  # Animated gradient background
│   │   └── theme-accent.tsx       # Theme accent provider
│   ├── blog/                 # Blog-specific components
│   │   ├── blog-card.tsx
│   │   ├── blog-post-overlay.tsx  # Overlay for blog post viewing
│   │   └── auto-header-graphic.tsx # Deterministic SVG graphic from tags
│   ├── ui/                   # Reusable UI primitives (Card, Button, Badge, etc.)
│   └── resume/               # Resume section components
├── content/                  # Static content (JSON + MDX)
│   ├── profile.json
│   ├── experience.json
│   ├── projects.json
│   └── blog/*.mdx
├── lib/
│   ├── utils.ts              # Utility functions (cn, conditionalClass)
│   ├── colors.ts             # Color palette definitions
│   ├── gradient.js           # Global gradient animation logic
│   └── scrollTimelineSupport.ts
└── utils/                    # Additional utilities
```

### Theming & Design System

**Accent Palette** (Sonoran + SF-inspired):

- `cactusGreen`: #2E7D6B
- `sandstone`: #D99E79
- `sunsetOrange`: #F1643D
- `fogBlue`: #A7B3C4
- `skylineInk`: #0D1321

**Fonts**:

- Inter (body text)
- Raleway (headings)
- Geist Mono (code blocks)

**Global Background**: Animated gradient canvas (`global-background.tsx`) that transitions colors based on current section. Updates via `window.__setGradientSection(section)`.

### Content Model

Content is stored in `src/content/` as JSON and MDX files:

- **profile.json**: Name, title, tagline, location, email, social links
- **experience.json**: Array of work experience with company, role, dates, summary, highlights, metrics, tech
- **projects.json**: Array of projects with slug, name, thumb, problem, solution, impact, metrics, images, tech, links
- **blog/\*.mdx**: MDX posts with frontmatter (title, date, tags, summary)

### Key Features to Maintain

1. **Hero Overlay Pattern**: Hero content fades out via AnimatePresence, revealing always-mounted sections below. Prevents layout reflow/CLS.
2. **Scroll Interception**: In hero mode, any downward scroll/swipe triggers navigation to first section (see `container.tsx:19-66`).
3. **Accessibility**: Keyboard navigation, focus states, semantic HTML, `prefers-reduced-motion` fallbacks for animations.
4. **Performance**: Target Lighthouse 90+ for Performance/Accessibility/Best Practices/SEO.
5. **D3 Visualizations**: Progressive enhancement with static fallbacks, respect `prefers-reduced-motion`.

## Adding Content

### Blog Posts

1. Create `src/content/blog/your-post-slug.mdx`
2. Add frontmatter:

   ```mdx
   ---
   title: 'Your Title'
   date: '2024-01-01'
   tags: ['tag1', 'tag2']
   summary: 'Brief description'
   ---

   Content here...
   ```

3. Add to manifest: `src/content/blog/_manifest.ts`

### Projects

Edit `src/content/projects.json` following the existing schema. Include images in `public/images/`.

### Profile/Experience

Edit `src/content/profile.json` or `src/content/experience.json` directly.

## Testing

- Unit tests in `test/` directory
- Vitest configured with jsdom environment
- Setup file: `test/setup.ts`
- Test critical utils and components; focus on accessibility (keyboard nav, screen reader support)

## Code Style

- Use `cn()` utility from `lib/utils.ts` for conditional className merging (clsx + tailwind-merge)
- Prefer functional components with TypeScript
- Use Framer Motion's `motion` components for animations
- Implement `prefers-reduced-motion` checks for accessibility
- Follow ESLint/Prettier configs (enforced via pre-commit hooks)

## Important Patterns

### Client Components

Most interactive components are marked `'use client'` due to Framer Motion, hooks, and event handlers.

### Navigation Hook

Access navigation via `useNavigation()` from `global-navigation.tsx`:

```tsx
const { currentSection, isHeroMode, navigateToSection, openBlogPost } =
  useNavigation();
```

### Gradient Integration

Global gradient listens for section changes via `window.__setGradientSection(section)`. Called automatically by NavigationProvider.

### Blog Post Overlay

Blog posts render in an overlay triggered by `openBlogPost(slug)`. URL updates to `?post=slug`. Close via `closeBlogPost()`.

## Build & Deployment

- Output mode: `standalone` (see `next.config.ts`)
- Security headers configured in Next.js config
- Image optimization enabled (WebP, AVIF formats)
- MDX support via `@next/mdx`

## Notes

- The site prioritizes polish and impact over code dumps
- Design is minimal/modern (Apple/Linear-inspired) with subtle personality
- Voice: professional, clean, tastefully creative (no games or gimmicks)
- Audience: recruiters and collaborators
- Goal: "Experienced, capable coder; thoughtful and creative builder" in < 2 minutes
