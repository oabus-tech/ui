import { IMaskInput } from 'react-imask'
import { tv } from 'tailwind-variants'

import { Loader } from '@/components/loader'

import type { MaskInputProps } from './mask-input.types'

const maskInput = tv({
  slots: {
    root: 'mask-input-root relative flex w-full items-center',
    field: [
      'mask-input-field w-full min-w-0 rounded-lg border border-input bg-transparent',
      'text-base md:text-sm transition-colors outline-none',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
      'dark:bg-input/30 dark:disabled:bg-input/80',
      'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    ],
    section:
      'mask-input-section pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center text-muted-foreground',
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

function MaskInput({
  mask,
  size,
  value,
  defaultValue,
  leftSection,
  rightSection,
  loading,
  rootClassName,
  className,
  onChange,
  ...props
}: MaskInputProps) {
  const effectiveRight = loading ? <Loader size="sm" /> : rightSection
  const hasLeft = Boolean(leftSection)
  const hasRight = Boolean(effectiveRight)

  const { root, field, section } = maskInput({ size, hasLeft, hasRight })

  const maskOptions = Array.isArray(mask)
    ? mask.map((m) => ({ mask: m }))
    : mask

  return (
    <div data-testid="mask-input-root" className={root({ className: rootClassName })}>
      {hasLeft && (
        <span data-testid="mask-input-section-left" className={section({ className: 'left-2.5' })}>
          {leftSection}
        </span>
      )}
      <IMaskInput
        {...(props as object)}
        data-testid="mask-input-field"
        mask={maskOptions as string}
        value={value ?? ''}
        defaultValue={defaultValue ?? undefined}
        onAccept={(val: string) => onChange?.(val === '' ? null : val)}
        className={field({ className })}
      />
      {hasRight && (
        <span data-testid="mask-input-section-right" className={section({ className: 'right-2.5' })}>
          {effectiveRight}
        </span>
      )}
    </div>
  )
}

export { MaskInput }
