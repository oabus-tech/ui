import { useCallback, useRef } from 'react'

import { tv } from 'tailwind-variants'

import { Loader } from '@/components/loader'

import type { InputProps } from './input.types'

const input = tv({
  slots: {
    root: 'input-root relative flex w-full items-center',
    field: [
      'input-field w-full min-w-0 rounded-lg border border-input bg-transparent',
      'text-base md:text-sm transition-colors outline-none',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
      'dark:bg-input/30 dark:disabled:bg-input/80',
      'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    ],
    section:
      'input-section pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center text-muted-foreground',
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

function Input({
  size,
  value,
  defaultValue,
  leftSection,
  rightSection,
  loading,
  debounce,
  rootClassName,
  onChange,
  type = 'text',
  ...props
}: InputProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return
      const val = e.target.value === '' ? null : e.target.value
      if (!debounce) {
        onChange(val)
        return
      }
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => onChange(val), 300)
    },
    [onChange, debounce],
  )

  const effectiveRight = loading ? <Loader size="sm" /> : rightSection
  const hasLeft = Boolean(leftSection)
  const hasRight = Boolean(effectiveRight)

  const { root, field, section } = input({ size, hasLeft, hasRight })

  const controlledProps =
    value !== undefined
      ? { value: value ?? '' }
      : { defaultValue: defaultValue ?? undefined }

  return (
    <div data-testid="input-root" className={root({ className: rootClassName })}>
      {hasLeft && (
        <span data-testid="input-section-left" className={section({ className: 'left-2.5' })}>
          {leftSection}
        </span>
      )}
      <input
        data-slot="input"
        data-testid="input-field"
        type={type}
        onChange={handleChange}
        className={field()}
        {...controlledProps}
        {...props}
      />
      {hasRight && (
        <span data-testid="input-section-right" className={section({ className: 'right-2.5' })}>
          {effectiveRight}
        </span>
      )}
    </div>
  )
}

export { Input }
