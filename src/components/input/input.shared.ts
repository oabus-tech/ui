import { tv } from 'tailwind-variants'

/**
 * Shared base styles for Input-like components.
 * Extend this in components that render a standalone bordered input field
 * (Input, MaskInput, CurrencyInput, etc.).
 *
 * Usage:
 *   const myInput = tv({
 *     extend: inputShared,
 *     slots: { root: 'my-root', field: 'my-field', section: 'my-section' },
 *   })
 */
export const inputShared = tv({
  slots: {
    root: 'relative flex w-full items-center',
    field: [
      'w-full min-w-0 rounded-lg border border-input bg-transparent',
      'text-base transition-colors outline-none md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
      'dark:bg-input/30 dark:disabled:bg-input/80',
      'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    ],
    section:
      'pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center text-muted-foreground',
  },
  variants: {
    size: {
      sm: { field: 'h-9 px-2.5 py-1' },
      md: { field: 'h-10 px-2.5 py-1' },
      lg: { field: 'h-11 px-3 py-1' },
    },
    hasLeft: { true: { field: 'pl-9' } },
    hasRight: { true: { field: 'pr-9' } },
  },
  defaultVariants: { size: 'md' },
})
