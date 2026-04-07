import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/support/utils'

import type { InputProps } from './input.types'

const styles = tv({
  defaultVariants: {
    hasLeft: false,
    hasRight: false,
    size: 'md',
  },
  slots: {
    input:
      'h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
    leftSection:
      'pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground [&_svg]:size-4',
    rightSection:
      'absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground [&_svg]:size-4',
    root: 'relative flex items-center rounded-md border border-input bg-background transition-colors focus-within:ring-2 focus-within:ring-ring/50 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
    spinner: 'animate-spin',
  },
  variants: {
    hasLeft: {
      false: {
        input: 'pl-3',
      },
      true: {
        input: 'pl-9',
      },
    },
    hasRight: {
      false: {
        input: 'pr-3',
      },
      true: {
        input: 'pr-9',
      },
    },
    size: {
      lg: {
        root: 'h-11',
        spinner: 'size-4',
      },
      md: {
        root: 'h-10',
        spinner: 'size-4',
      },
      sm: {
        input: 'text-xs',
        root: 'h-9',
        spinner: 'size-3.5',
      },
    },
  },
})

function Input(props: InputProps) {
  const {
    debounce: shouldDebounce,
    defaultValue,
    disabled,
    leftSection,
    loading,
    onChange,
    rightSection,
    rootClassName,
    size = 'md',
    type = 'text',
    value,
    ...rest
  } = props

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) {
        return
      }
      const val = e.target.value === '' ? null : e.target.value
      if (shouldDebounce) {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => onChange(val), 300)
      } else {
        onChange(val)
      }
    },
    [
      onChange,
      shouldDebounce,
    ],
  )

  const effectiveRightSection = loading ? undefined : rightSection
  const hasRight = loading || !!rightSection

  const s = styles({
    hasLeft: !!leftSection,
    hasRight,
    size,
  })

  return (
    <div className={cn(s.root(), rootClassName)}>
      {leftSection && <span className={s.leftSection()}>{leftSection}</span>}
      <input
        {...rest}
        className={s.input()}
        defaultValue={defaultValue === null ? '' : defaultValue}
        disabled={disabled}
        onChange={handleChange}
        type={type}
        value={value === null ? '' : value}
      />
      {loading && (
        <span className={s.rightSection()}>
          <Loader2 className={s.spinner()} />
        </span>
      )}
      {!loading && effectiveRightSection && (
        <span className={s.rightSection()}>{effectiveRightSection}</span>
      )}
    </div>
  )
}

export { Input }
