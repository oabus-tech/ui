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

All component styles must use `tv` from `class-variance-authority` (tailwind-variants). Define styles at the top of each component file. Sub-element styles use their own `tv()` call; the root element's styles are exported as `styles`:

```ts
import { tv } from 'tailwind-variants'

const contentStyles = tv({
  base: 'inline-flex items-center gap-2',
  variants: {
    loading: {
      true: 'invisible',
    },
  },
})

export const styles = tv({
  base: 'relative inline-flex cursor-pointer ...',
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      sm: 'h-9 px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
    },
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      // ...
    },
  },
})
```

### Primitives

Components are built on **`@base-ui/react`** (Base UI by the shadcn team) for accessible headless primitives (dialogs, menus, tooltips, etc.). Wrap Base UI primitives with `tv()`-based styles rather than styling them inline.

**Rule: always use Base UI primitives — never raw HTML interactive elements.**
- Buttons → `@base-ui/react/button` (or our `Button` component which wraps it)
- Checkboxes → `@base-ui/react/checkbox`
- Dialogs → `@base-ui/react/dialog`
- Alert dialogs → `@base-ui/react/alert-dialog`
- Select (single) → `@base-ui/react/select`
- Menus / dropdowns → `@base-ui/react/menu`
- Popovers → `@base-ui/react/popover`
- Tooltips → `@base-ui/react/tooltip`
- Progress → `@base-ui/react/progress`
- Switch → `@base-ui/react/switch`
- Number inputs → `@base-ui/react/number-field`
- ... and so on for every interactive element Base UI provides.

Native `<button>`, `<input>`, `<select>` are only acceptable when Base UI has no equivalent primitive (e.g. `<option>` inside a native select, or `<input type="file">`). When in doubt, check `node_modules/@base-ui/react/` for available modules first.

See `src/shadcn/` for reference implementations of how each Base UI primitive is wrapped.

#### Base UI component structure patterns

Every Base UI primitive follows a strict composition tree. Use these patterns exactly:

```tsx
// Dialog / AlertDialog
<Dialog.Root open={open} onOpenChange={onChange}>
  <Dialog.Portal>
    <Dialog.Backdrop className={backdrop()} />   // ← Backdrop, NOT Overlay
    <Dialog.Popup className={popup()}>           // ← Popup, NOT Content
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
      {children}
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

// AlertDialog — identical structure; use AlertDialog.Close for cancel (blocks outside-click dismissal)
import { AlertDialog } from '@base-ui/react/alert-dialog'

// Menu (dropdown menus, context menus)
<Menu.Root>
  <Menu.Trigger />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item />           // or CheckboxItem / RadioItem
        <Menu.Separator />
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

// Popover
<Popover.Root open={open} onOpenChange={setOpen}>
  <Popover.Trigger />
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>{children}</Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

// Select (single-select only — no native multiple support)
<Select.Root value={value} onValueChange={onChange}>
  <Select.Trigger>
    <Select.Value />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.List>
          <Select.Group>
            <Select.GroupLabel />
            <Select.Item>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Group>
        </Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
// Multiple-select: @base-ui/react/select does NOT support multiple — use Popover + custom list instead.

// NumberField (numeric stepper)
<NumberField.Root value={value} onValueChange={onChange} step={step}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

// Switch
<Switch.Root checked={checked} onCheckedChange={onChange}>
  <Switch.Thumb />
</Switch.Root>

// Progress
<Progress.Root value={value}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

#### Compound components

When a component uses dot-notation sub-components (`Modal.Header`, `Form.Field`, etc.), use the `Object.assign` pattern:

```tsx
const Modal = Object.assign(ModalRoot, {
  Header: Object.assign(ModalHeader, {
    Title: ModalHeaderTitle,
    Description: ModalHeaderDescription,
  }),
  Body: ModalBody,
  Footer: ModalFooter,
})
```

The stub files in `src/components/<name>/<name>.tsx` already have this scaffold — implement each sub-function, do not change the Object.assign structure.

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
