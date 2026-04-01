# 📚 Frontend Knowledge Base — Index

> **Purpose:** This document serves as the master index for the frontend knowledge base.
> Each topic listed here will have its own dedicated detailed documentation file.

---

## 📁 Table of Contents

1. [CSS](#1-css)
2. [React](#2-react)
3. [Next.js](#3-nextjs)

---

## 1. CSS

### 1.1 Introduction to CSS
- What is CSS?
- How CSS works with HTML
- Ways to apply CSS (Inline, Internal, External)
- CSS Specificity & Cascade

### 1.2 CSS Selectors
- Basic Selectors (element, class, id, universal)
- Combinators (descendant, child, sibling)
- Pseudo-classes (`:hover`, `:nth-child`, `:focus`, `:not`)
- Pseudo-elements (`::before`, `::after`, `::placeholder`)
- Attribute Selectors

### 1.3 Box Model
- Content, Padding, Border, Margin
- `box-sizing: border-box` vs `content-box`
- Margin Collapsing

### 1.4 CSS Layout Techniques
- **Flexbox**
  - Flex Container vs Flex Items
  - `justify-content`, `align-items`, `flex-wrap`
  - `flex-grow`, `flex-shrink`, `flex-basis`
- **CSS Grid**
  - `grid-template-columns` / `grid-template-rows`
  - `grid-area`, `grid-gap`
  - Auto-fit vs Auto-fill
- **Positioning**
  - Static, Relative, Absolute, Fixed, Sticky
  - Z-index & Stacking Context
- Float & Clear (legacy — when to avoid)

### 1.5 Responsive Design
- Media Queries (`@media`)
- Breakpoints Strategy
- Mobile-first vs Desktop-first approach
- Fluid Typography & Spacing
- `clamp()`, `min()`, `max()` functions
- Viewport Units (`vh`, `vw`, `dvh`)

### 1.6 CSS Variables (Custom Properties)
- Defining and using variables (`--primary-color`)
- Scoping variables (`:root` vs component-level)
- Dynamic theming with variables

### 1.7 CSS Animations & Transitions
- `transition` property
- `@keyframes` and `animation` property
- `transform` (translate, rotate, scale, skew)
- Performance-friendly animations (use `transform` & `opacity`)
- `will-change` property

### 1.8 CSS Preprocessors (SCSS/SASS)
- Variables, Nesting, Mixins
- Extends & Inheritance
- Partials & Import
- When to use SCSS vs CSS Variables

### 1.9 CSS Best Practices ✅
- Use `rem` and `em` over `px` for scalability
- Follow BEM naming convention
- Keep specificity low — avoid `!important`
- Use logical properties (`margin-inline`, `padding-block`)
- Organize styles (base → layout → components → utilities)
- Use CSS variables for theming
- Write mobile-first media queries
- Prefer `gap` over margins in Flex/Grid
- Always set `box-sizing: border-box` globally

### 1.10 CSS Things to Avoid ❌
- Avoid overusing `!important`
- Avoid deeply nested selectors (3+ levels)
- Avoid inline styles in HTML (except for dynamic values)
- Avoid using `float` for layout (use Flex/Grid instead)
- Avoid fixed pixel font sizes (breaks accessibility)
- Avoid unnecessary `div` wrappers (div soup)
- Avoid global class name conflicts — scope your styles
- Avoid animating properties that trigger reflow (`width`, `height`, `top`, `left`)

### 1.11 Modern CSS Features
- Container Queries (`@container`)
- `:has()` selector
- CSS Layers (`@layer`)
- Subgrid
- `color-mix()` function
- `@supports` rule

### 1.12 CSS Methodologies
- BEM (Block Element Modifier)
- OOCSS (Object-Oriented CSS)
- SMACSS
- Atomic CSS / Utility-first (Tailwind CSS approach)
- CSS-in-JS overview

---

## 2. React

### 2.1 Introduction to React
- What is React and why use it?
- React vs Vanilla JS vs other frameworks
- React's Role in the Frontend ecosystem
- Create React App vs Vite

### 2.2 How React Works — Core Concepts
- **Virtual DOM**
  - What is the Virtual DOM?
  - Real DOM vs Virtual DOM
  - Diffing Algorithm (Reconciliation)
  - How React updates the UI efficiently
- **JSX**
  - What is JSX?
  - JSX Rules & Gotchas
  - Expressions in JSX
  - JSX vs `React.createElement()`
- **React Fiber** (React's internal engine)

### 2.3 Components
- Functional Components vs Class Components
- Component Composition
- Props — passing and receiving data
- Default Props & PropTypes
- Children prop
- Pure Components concept

### 2.4 State & Lifecycle
- What is state?
- `useState` Hook
- State updates are asynchronous
- Lifting state up
- Controlled vs Uncontrolled components

### 2.5 React Hooks (Complete Guide)
- **Basic Hooks**
  - `useState` — local state management
  - `useEffect` — side effects & lifecycle
  - `useContext` — consuming context
- **Performance Hooks**
  - `useMemo` — memoizing values
  - `useCallback` — memoizing functions
  - `useTransition` — non-blocking state updates
  - `useDeferredValue`
- **Ref Hooks**
  - `useRef` — DOM references & persisting values
  - `useImperativeHandle`
- **Other Hooks**
  - `useReducer` — complex state logic
  - `useId` — unique IDs for accessibility
  - `useLayoutEffect` — synchronous DOM measurements
- **Custom Hooks**
  - When and how to create custom hooks
  - Examples: `useFetch`, `useDebounce`, `useLocalStorage`

### 2.6 React Context API
- What is Context?
- `createContext`, `Provider`, `useContext`
- Context vs Prop Drilling
- Performance considerations with Context
- When to use Context vs State Management libraries

### 2.7 Event Handling in React
- Synthetic Events
- Event delegation in React
- Common events (`onClick`, `onChange`, `onSubmit`)
- Event propagation & `stopPropagation`

### 2.8 Lists & Keys
- Rendering lists with `.map()`
- Importance of `key` prop
- Anti-patterns with keys (avoid index as key)

### 2.9 Forms in React
- Controlled inputs
- Uncontrolled inputs with `useRef`
- Form libraries overview (React Hook Form, Formik)
- Validation approaches

### 2.10 React Router (Client-side Routing)
- `BrowserRouter`, `Routes`, `Route`
- `Link` and `NavLink`
- `useNavigate`, `useParams`, `useLocation`
- Nested Routes
- Protected / Private Routes

### 2.11 State Management
- Local vs Global state
- `useContext` + `useReducer` pattern
- Redux Toolkit overview
- Zustand overview
- When to choose which solution

### 2.12 Data Fetching in React
- `useEffect` + `fetch` / `axios`
- React Query (TanStack Query) — overview
- SWR overview
- Loading, Error, Success states pattern

### 2.13 React Performance Optimization
- `React.memo` — preventing unnecessary re-renders
- `useMemo` & `useCallback` — when and when NOT to use
- Code splitting with `React.lazy` & `Suspense`
- Avoid anonymous functions in JSX
- Virtualization for long lists (`react-window`)
- Profiling with React DevTools

### 2.14 React Best Practices ✅
- One component per file
- Keep components small and focused (Single Responsibility)
- Lift state only as high as needed
- Use custom hooks to reuse logic
- Always clean up `useEffect` (return cleanup function)
- Use TypeScript for type safety
- Avoid mutating state directly

### 2.15 Error Boundaries
- What are Error Boundaries?
- Class-based Error Boundaries
- `react-error-boundary` library

### 2.16 React 18+ Features
- Concurrent Rendering
- Automatic Batching
- `useTransition` & `useDeferredValue`
- Strict Mode behaviors
- `Suspense` for data fetching

---

## 3. Next.js

### 3.1 Introduction to Next.js
- What is Next.js?
- Why Next.js over plain React?
- Next.js vs Create React App vs Vite
- Next.js versions — Pages Router vs App Router

### 3.2 Project Structure
- `/app` directory (App Router)
- `/pages` directory (Pages Router — legacy)
- `/public` — static assets
- `/components`, `/lib`, `/utils` conventions
- `next.config.js` — configuration overview
- `layout.js`, `page.js`, `loading.js`, `error.js`, `not-found.js`

### 3.3 Routing in Next.js (App Router)
- File-based routing system
- Static Routes
- Dynamic Routes (`[slug]`, `[...slug]`, `[[...slug]]`)
- Route Groups `(groupName)`
- Parallel Routes (`@slot`)
- Intercepting Routes
- Nested Layouts

### 3.4 Rendering Strategies
- **Static Site Generation (SSG)**
  - `generateStaticParams()`
  - When to use SSG
- **Server-Side Rendering (SSR)**
  - Dynamic rendering on every request
  - `cache: 'no-store'` in fetch
- **Incremental Static Regeneration (ISR)**
  - `revalidate` option in fetch
  - On-demand revalidation
- **Client-Side Rendering (CSR)**
  - `'use client'` directive
  - When to use CSR

### 3.5 Server Components vs Client Components
- What are React Server Components (RSC)?
- `'use server'` vs `'use client'` directives
- Rules of Server Components
- Rules of Client Components
- When to use each
- Composition patterns (Server → Client boundary)

### 3.6 Data Fetching in Next.js
- Fetching in Server Components (async/await directly)
- Extended `fetch()` API with caching options
- `cache: 'force-cache'` vs `cache: 'no-store'`
- `revalidate` — time-based revalidation
- Fetching in Client Components (React Query / SWR)
- Parallel & Sequential data fetching

### 3.7 Server Actions
- What are Server Actions?
- `'use server'` directive in functions
- Using Server Actions in forms
- Server Actions for mutations
- `revalidatePath` and `revalidateTag`
- Optimistic updates with `useOptimistic`

### 3.8 Next.js API Routes
- Creating API routes (`/app/api/route.ts`)
- GET, POST, PUT, DELETE handlers
- Request & Response objects
- Middleware in API routes
- When to use API routes vs Server Actions

### 3.9 Middleware
- What is Next.js Middleware?
- `middleware.ts` — location and setup
- `matcher` configuration
- Use cases: auth guards, redirects, A/B testing, locale detection
- Middleware vs Server Actions vs API Routes

### 3.10 Next.js Image Optimization
- `<Image>` component from `next/image`
- `width`, `height`, `fill` props
- `priority` prop for LCP images
- `placeholder="blur"`
- Remote image domains configuration
- When to use `<Image>` vs `<img>`

### 3.11 Next.js Font Optimization
- `next/font` — Google Fonts & local fonts
- Zero layout shift guarantee
- Font variables with Tailwind CSS

### 3.12 Metadata & SEO
- `metadata` object in `layout.js` / `page.js`
- Dynamic metadata with `generateMetadata()`
- Open Graph & Twitter card tags
- `robots.txt`, `sitemap.xml` with Next.js
- Structured data (JSON-LD)

### 3.13 Next.js Caching Mechanisms
- **Request Memoization** — dedup fetch within a render
- **Data Cache** — persistent cache across requests
- **Full Route Cache** — cached HTML & RSC payload
- **Router Cache** — client-side cache of route segments
- Opting out of cache
- `revalidatePath()` & `revalidateTag()`

### 3.14 Authentication in Next.js
- Auth approaches overview
- NextAuth.js / Auth.js setup
- Protecting routes with Middleware
- Session handling (JWT vs Database sessions)
- Server Component vs Client Component auth patterns

### 3.15 Environment Variables
- `.env`, `.env.local`, `.env.production`
- `NEXT_PUBLIC_` prefix for client-side variables
- Accessing env variables in Server vs Client components

### 3.16 Deployment
- Deploying on Vercel (recommended)
- Self-hosting on Node.js server
- Docker deployment
- Static export (`output: 'export'`)
- Edge Runtime vs Node.js Runtime

### 3.17 Performance & Optimization in Next.js
- Core Web Vitals (LCP, CLS, FID/INP)
- Bundle analysis (`@next/bundle-analyzer`)
- Dynamic imports (`next/dynamic`) — code splitting
- Prefetching — `<Link>` prefetch behavior
- Script optimization (`next/script`)
- Edge functions for low latency

### 3.18 Next.js Best Practices ✅
- Prefer Server Components by default — use Client only when needed
- Co-locate components near their routes
- Use `loading.js` for Suspense boundaries on routes
- Use `error.js` for error boundaries per route segment
- Always configure `next.config.js` image domains
- Use `generateStaticParams` for known dynamic routes
- Validate and sanitize data in Server Actions
- Never expose secrets in `NEXT_PUBLIC_` variables

### 3.19 Common Next.js Gotchas ❌
- Forgetting `'use client'` when using hooks/browser APIs
- Using `useEffect` in Server Components (not allowed)
- Importing heavy client libraries in Server Components
- Mutating state in Server Actions without revalidating
- Not handling loading and error states per route
- Confusing `router.refresh()` vs `revalidatePath()`

---

## 📌 Quick Reference — Directive Cheatsheet

| Directive | Where | Purpose |
|-----------|-------|---------|
| `'use client'` | Top of file | Makes component a Client Component |
| `'use server'` | Top of file or function | Marks Server Actions |
| `async/await` in component | Server Components only | Direct data fetching |
| `revalidatePath()` | Server Action | Clears route cache |
| `revalidateTag()` | Server Action | Clears tagged cache |

---

*Index created for internal team reference. Each section above corresponds to a separate detailed documentation file.*
