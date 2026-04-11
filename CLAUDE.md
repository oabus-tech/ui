# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build          # Build library to dist/
pnpm build:watch    # Build in watch mode
pnpm test           # Run tests with vitest
pnpm lint           # Lint with Biome
pnpm format         # Format src/ with Biome
pnpm check          # Lint + format src/ with Biome (auto-fix)
pnpm typecheck      # TypeScript type check (no emit)
pnpm storybook      # Start Storybook dev server (component docs)
pnpm build-storybook # Build Storybook static site
```

## Architecture

This is **`@oabus/ui`**, a React component library published as an npm package. It builds to `dist/` via Vite in library mode (ES module only), with bundled types via `vite-plugin-dts`.

### Entry point

`src/index.ts` re-exports every component and its types. `src/index.css` is bundled separately and consumers import it via `@oabus/ui/styles.css`.

### Component structure

Each component lives in `src/components/<name>/` with three files:
- `<name>.tsx` — the component implementation
- `<name>.types.ts` — TypeScript prop types
- `index.ts` — re-exports both

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite`
- `src/support/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging
- Two themes: **mono** (default) and **nova**, defined in `src/mono.css` and `src/nova.css`
- Theme is set via `data-theme` attribute on `<html>`; dark mode via `.dark` class
- CSS variables follow shadcn/ui conventions (oklch colors, `--radius`, etc.)
- Biome enforces sorted Tailwind classes on `className` and the `tv()` function

#### `tv()` pattern (tailwind-variants)

All component styles must use a **single `styles` object** with `slots` defined via `tv` from `tailwind-variants`. Never split styles across multiple `tv()` calls. Never use `cn()` for className — all classes must come from `styles` slots. Define `styles` at the top of each component file:

```ts
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    root: 'relative inline-flex cursor-pointer ...',
    inner: 'inline-flex items-center gap-2',
    icon: 'size-4 shrink-0',
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      sm: { root: 'h-9 px-3' },
      md: { root: 'h-10 px-4 py-2' },
      lg: { root: 'h-11 px-8' },
    },
    variant: {
      default: { root: 'bg-primary text-primary-foreground hover:bg-primary/90' },
      // ...
    },
  },
})

// Usage in component:
const s = styles({ size, variant })
// <div className={s.root()}>
//   <span className={s.inner()}>
```

### Package installation

**Never install packages.** The user installs all dependencies manually. When asked to implement a component that uses a new library, assume it is already installed and refactor directly to the project patterns.

### Primitives

Components are built on **`@base-ui/react`** (Base UI by the shadcn team) for accessible headless primitives (dialogs, menus, tooltips, etc.). Wrap Base UI primitives with `tv()`-based styles rather than styling them inline.

### Provider setup

`OABusProvider` (wrapping `ThemeProvider` + `ColorSchemeProvider`) must wrap the app. It accepts:
- `theme`: `'mono' | 'nova'` (default: `'mono'`)
- `defaultColorScheme`: `'light' | 'dark' | 'system'`

Both theme and color scheme are persisted to `localStorage` under keys `oabus-theme` and `oabus-color-scheme`.

### Compound components

Some components (e.g., `Layout`) use the `Object.assign` pattern to attach sub-components (`Layout.Header`, `Layout.Content`, `Layout.Main`, `Layout.Footer`).

### Code style (Biome)

- Single quotes, no semicolons, 2-space indent, 80-char line width
- Trailing commas everywhere
- JSX double quotes
- Imports ordered: Node built-ins → packages → `@/` aliases → relative paths (blank lines between groups)
- Attributes and object keys are auto-sorted

### Path alias

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

### Peer dependencies

React 19, React DOM 19, and Tailwind CSS 4 are peer dependencies — not bundled.

## Storybook (component documentation)

Stories live colocated with each component: `src/components/<name>/<name>.stories.tsx`. They are excluded from the library build.

Configuration is in `.storybook/`:
- `main.ts` — framework (`@storybook/react-vite`), story glob, addons
- `preview.ts` — imports `src/index.css` (required for Tailwind + themes to load)

Story convention:
```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MyComponent } from './my-component'

const meta = {
  title: 'Components/MyComponent', // or 'Layout/...', 'Form/...'
  component: MyComponent,
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Variant: Story = { args: { someProp: true } }
```

- One named export per meaningful variant (Default, Bordered, Disabled, etc.)
- No argTypes or controls beyond `args` — each export is a self-contained example
- Title category mirrors the grouping in `src/index.ts` (Components, Layout, Form, Feedback)
