# Repository Guidelines

## Project Structure & Module Organization

This Next.js app uses the App Router in `src/app` for routes and layouts. Reusable UI sits in `src/components`, data helpers in `src/lib`, and pure utilities in `src/utils`. Content lives in `src/content`, while static assets belong in `public/`. Global Vitest config is in `test/setup.ts`; keep component or hook specs next to their source as `Name.test.ts[x]` files for fast context.

## Build, Test, and Development Commands

- `npm run dev` — Launch the dev server on http://localhost:3000 with Turbopack.
- `npm run build` — Create the production bundle.
- `npm run start` — Serve the last build locally for smoke checks.
- `npm run lint` / `npm run typecheck` — Run ESLint and TypeScript validations before a PR.
- `npm run test`, `npm run test:coverage`, `npm run test:ui` — Execute Vitest headless, with coverage, or via the interactive runner.

## Coding Style & Naming Conventions

Prettier (`npm run format`) controls whitespace with two-space indentation and the Tailwind plugin orders utility classes. ESLint (`eslint.config.mjs`) enforces Next.js, React, and Testing Library rules; apply fixes with `npm run lint -- --fix`. Name React components and files in PascalCase, hooks with a `use` prefix, and helpers in camelCase. Copy `env.example` to `.env.local` and surface values through typed helpers in `src/lib`.

## Testing Guidelines

Vitest with jsdom and Testing Library drives unit and interaction suites. Focus new tests on observable outcomes, not implementation details, and colocate `*.test.tsx` files with their components. Reuse setup helpers from `test/`. Run `npm run test` during development and inspect deltas with `npm run test:coverage`; keep critical UI paths covered before shipping.

## Commit & Pull Request Guidelines

Follow the short, imperative commit pattern already in history (`Fix gradient edge artifact`, `Improve scroll entry`) and keep subjects under ~65 characters. Group related changes per commit. For each PR, confirm `npm run lint`, `npm run typecheck`, and `npm run test` succeed, then add a concise summary, link issues, and attach screenshots or recordings for UI updates. Call out deployment or configuration impacts so reviewers can check them quickly.
