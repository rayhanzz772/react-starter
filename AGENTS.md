# AGENTS.md

## Commands

- `npm run dev` — Vite dev server.
- `npm run build` — runs `tsc -b` first, so **build is the typecheck** (there is no separate typecheck script).
- `npm run lint` — ESLint (`eslint .`). No tests, no CI — verification is `lint` + `build`.

## Stack quirks

- **shadcn/ui is configured for Base UI, not Radix** (`@base-ui/react`, style `base-nova` in `components.json`). Add components with the shadcn CLI (`npx shadcn@latest add <component>`); don't assume Radix APIs when editing `src/components/ui/*`. Base UI has no `asChild` — use its `render` prop instead. `DropdownMenuLabel` (i.e. `Menu.GroupLabel`) must be placed inside a `DropdownMenuGroup` or it throws `MenuGroupContext is missing`.
- **Tailwind v4, CSS-first config**: theme tokens, custom variants (`dark` via `.dark` class), and font setup all live in `src/index.css`. There is no `tailwind.config.js`.
- The `cn` import comes from the `"cn"` package, re-exported by `src/lib/utils.ts` — the alias `@/lib/utils` is the conventional import path.
- Path alias `@` → `src/` is set in both `vite.config.ts` and `tsconfig.app.json`; keep them in sync if changed.
- Router is `react-router` (v8 unified package, not `react-router-dom`). Routes are defined inline in `src/App.tsx`; new pages go in `src/pages/*` and are typically wrapped in `DashboardLayout`.

## API layer

- Two deps are already installed for this: `axios` and `@tanstack/react-query`. Use them — don't hand-roll `fetch` or add another client.
- `VITE_API_URL` is the only env var (`src/lib/api/client.ts`, falls back to `/api` when unset). Copy `.env.example` → `.env.local`; `*.local` is gitignored.
- All request paths live in `src/lib/api/endpoints.ts`. Don't inline URL strings in components or resource modules.
- Per-resource module = exported types + a query-key object + `useX()` hooks (`useQuery`/`useMutation` with `invalidateQueries` on success). `src/lib/api/users.ts` is the template to copy.
- `queryClient` is `src/lib/api/query-client.ts`, mounted via `QueryClientProvider` in `src/main.tsx`.
- Auth is a request interceptor reading `localStorage["token"]` as a bearer. There is no 401 refresh/retry queue yet — if a resource needs it, add one response interceptor, not per-call handling.
- No error-normalization layer: React Query surfaces raw `AxiosError`s to `error`/`onError`.

## TypeScript strictness

- `verbatimModuleSyntax` is on — use `import type { ... }` for type-only imports or builds fail.
- `erasableSyntaxOnly` is on — no enums, namespaces, or parameter properties; use plain objects/unions.
- `noUnusedLocals`/`noUnusedParameters` are on — unused imports break the build.

## Layout

- `src/components/ui/` — shadcn-generated primitives (avoid hand edits).
- `src/components/{layout,shared}/` and `src/layouts/` — app-owned composition built on the primitives.
- `src/lib/api/` — HTTP client, endpoint paths, query client, one module per resource.
- `src/lib/utils.ts` — `cn` re-export only.
