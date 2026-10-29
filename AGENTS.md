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

## TypeScript strictness

- `verbatimModuleSyntax` is on — use `import type { ... }` for type-only imports or builds fail.
- `erasableSyntaxOnly` is on — no enums, namespaces, or parameter properties; use plain objects/unions.
- `noUnusedLocals`/`noUnusedParameters` are on — unused imports break the build.

## Layout

- `src/components/ui/` — shadcn-generated primitives (avoid hand edits).
- `src/components/{layout,shared}/` and `src/layouts/` — app-owned composition built on the primitives.
