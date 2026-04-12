import { useCallback, useRef } from 'react'
import { tv } from 'tailwind-variants'

import { Loader } from '@/components/loader'

import type { InputProps } from './input.types'

const DEFAULT_SECTION_WIDTH = 36

const input = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    field: [
      'input-field w-full min-w-0 rounded-lg border border-input bg-transparent',
      'text-base outline-none transition-colors md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
      'dark:bg-input/30 dark:disabled:bg-input/80',
      'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    ],
    root: 'input-root relative flex w-full items-center',
    section:
      'input-section pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center text-muted-foreground',
  },
  variants: {
    size: {
      lg: {
        field: 'h-11 px-3 py-1',
      },
      md: {
        field: 'h-10 px-2.5 py-1',
      },
      sm: {
        field: 'h-9 px-2.5 py-1',
      },
    },
  },
})

function Input({
  size,
  value,
  defaultValue,
  leftSection,
  leftSectionWidth = DEFAULT_SECTION_WIDTH,
  rightSection,
  rightSectionWidth = DEFAULT_SECTION_WIDTH,
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
      if (!onChange) {
        return
      }
      const val = e.target.value === '' ? null : e.target.value
      if (!debounce) {
        onChange(val)
        return
      }
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => onChange(val), 300)
    },
    [
      onChange,
      debounce,
    ],
  )

  const effectiveRight = loading ? <Loader size="sm" /> : rightSection
  const hasLeft = Boolean(leftSection)
  const hasRight = Boolean(effectiveRight)

  const { root, field, section } = input({ size })

  const fieldStyle: React.CSSProperties = {
    ...(hasLeft ? { paddingLeft: leftSectionWidth } : {}),
    ...(hasRight ? { paddingRight: rightSectionWidth } : {}),
  }

  const controlledProps =
    value !== undefined
      ? {
          value: value ?? '',
        }
      : {
          defaultValue: defaultValue ?? undefined,
        }

  return (
    <div
      className={root({
        className: rootClassName,
      })}
      data-testid="input-root"
    >
      {hasLeft && (
        <span
          className={section({
            className: 'left-0 justify-center',
          })}
          data-testid="input-section-left"
          style={{ width: leftSectionWidth }}
        >
          {leftSection}
        </span>
      )}
      <input
        className={field()}
        data-slot="input"
        data-testid="input-field"
        onChange={handleChange}
        style={fieldStyle}
        type={type}
        {...controlledProps}
        {...props}
      />
      {hasRight && (
        <span
          className={section({
            className: 'right-0 justify-center',
          })}
          data-testid="input-section-right"
          style={{ width: rightSectionWidth }}
        >
          {effectiveRight}
        </span>
      )}
    </div>
  )
}

export { Input }
