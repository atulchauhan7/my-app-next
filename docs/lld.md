# Low-Level Design (LLD) — Next.js App Router

## 1. Overview
This document details the low-level design for the current Next.js application using the App Router. It covers routing, component hierarchy, data flow, styling, error handling, performance, security, and testing. The project targets Next.js 16.x with React 19 and Tailwind CSS v4.

## 2. Project Structure (Relevant)
```
app/
  (users)/
    layout.js
    Navigation.jsx
    page.js
    about/
      layout.jsx
      page.jsx
      teams/
        page.jsx
globals.css
public/
```
Notes:
- Group segment `(users)` is a URL-ignored container, allowing route organization without affecting paths.
- Absence of `app/layout.js` is intentional; `(users)/layout.js` acts as the effective root layout.

## 3. Routing Design
- `/` → `app/(users)/page.js` → `HomePage`
- `/about` → `app/(users)/about/page.jsx` → `About`
- `/about/teams` → `app/(users)/about/teams/page.jsx` → `Teams`
- `/services` → (planned) `app/services/page.jsx` → `Services`

Routing Principles:
- Use App Router file-based routing with nested layouts (`layout.(js|jsx|tsx)`) for shared UI chrome.
- Prefer group segments `(group)` for logical separation (e.g., `(users)`, `(admin)`).
- Avoid `pages/` directory to prevent conflicts with App Router.

## 4. Layout & Component Hierarchy
- `app/(users)/layout.js` → Root HTML scaffolding and shared header.
  - Renders `<Navigation />` and injects `children` for nested routes.
- `app/(users)/Navigation.jsx` → Header with links.
  - Stateless; uses `next/link`.
- `page.js` / `page.jsx` files → Route-level content components.

Hierarchy Example:
```
<html>
  <body>
    <Navigation />
    <RouteContent />  // Home | About | Teams | Services
  </body>
</html>
```

Guidelines:
- Keep layouts minimal; avoid state unless essential.
- Use server components by default in App Router. Opt into client components with `'use client'` where interactivity is required.
- Colocate components near routes when specific to a route; extract shared components under `app/components/` if reused.

## 5. Styling
- `app/globals.css` imports Tailwind v4 (`@import "tailwindcss";`).
- Prefer utility classes for layout and spacing.
- Define theme tokens via CSS variables and Tailwind `@theme` for consistency.

Conventions:
- Do not mix inline styles with utility classes unless necessary.
- Keep global styles limited to resets, typography, and variables.

## 6. Data Flow & State Management
Current state: no data fetching in files provided.

Design options:
- Server Components: Fetch via `async` component directly in route files using `fetch()` or data layer.
- Client Components: Use hooks (`useState`, `useEffect`, SWR/React Query) for interactive features.

Data Layer Proposal (placeholder):
- Create `lib/api.ts` (or `.js`) for REST/GraphQL wrappers.
- Encapsulate endpoints and re-use in server components for SSR/SSG/ISR.

Example (server component):
```ts
export default async function Page() {
  const res = await fetch("https://api.example.com/items", { cache: "no-store" });
  const items = await res.json();
  return <List items={items} />;
}
```

## 7. Error Handling
- Use route-level `error.(js|jsx|tsx)` files for Error Boundaries in App Router.
- Provide `loading.(js|jsx|tsx)` for suspense states where data fetching occurs.
- Add `not-found.(js|jsx|tsx)` for graceful 404s per route group.

Global Patterns:
- Wrap external API calls with retries and timeouts.
- Log errors server-side; surface user-friendly messages client-side.

## 8. Configuration
- `next.config.ts`: place build/runtime config (image domains, experimental flags).
- Environment variables: `process.env.NEXT_PUBLIC_*` for client; secrets for server only.
- TypeScript: enable strict mode in `tsconfig.json` (even with JS files, for future migration).

## 9. Performance & Rendering Strategy
- Prefer server components for SSR by default.
- Use `revalidate` where data can be cached (ISR) to balance freshness and performance.
- Optimize images with `next/image`.
- Code-split with nested routes and dynamic imports for heavy client components.

## 10. Security
- Validate and sanitize any user input.
- Use the built-in Next.js headers for security (e.g., CSP via `next.config.ts` or middleware).
- Avoid exposing secrets to the client.

## 11. Testing
- Unit: React Testing Library for components.
- Integration: Playwright/Cypress for routes and navigation.
- Lint: ESLint + `eslint-config-next` already present; run `npm run lint`.

## 12. Planned Additions
- `app/services/page.jsx` route to match navigation.
- Route-level `error.js`, `loading.js` under `(users)`.
- Shared components folder `app/components/` for reusable UI.
- `lib/api.js` for data layer abstraction.

## 13. Migration & Consistency
- Consider migrating JS/JSX files to TS/TSX incrementally.
- Maintain consistent naming: `page.(js|jsx|tsx)`, `layout.(js|jsx|tsx)`.

## 14. Build & Run
- Development: `npm run dev` → hot reload, useful overlays.
- Production: `npm run build` then `npm run start`.

## 15. Open Questions
- What external services/APIs are planned?
- Any authentication/authorization requirements?
- SEO and metadata needs per route (`generateMetadata`)?

---
This LLD is a living document. Update sections as routes, data sources, and requirements evolve.
