import { NumberField } from '@base-ui/react/number-field'
import { Minus, Plus } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { NumberInputProps } from './number-input.types'

const numberInput = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    btn: [
      'number-input-btn flex items-center border-input px-2',
      'bg-transparent text-muted-foreground transition-colors',
      'hover:bg-muted hover:text-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    field: [
      'w-full min-w-0 border-none bg-transparent',
      'px-2.5 py-1 text-center text-base outline-none md:text-sm',
      'placeholder:text-muted-foreground',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    ],
    group: [
      'number-input-group flex overflow-hidden rounded-lg border border-input',
      'transition-colors',
      'has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
    ],
    root: 'number-input-root relative flex w-full items-center',
  },
  variants: {
    size: {
      lg: { group: 'h-11' },
      md: { group: 'h-10' },
      sm: { group: 'h-9' },
    },
  },
})

function NumberInput({
  value,
  defaultValue,
  onChange,
  step = 1,
  size,
  disabled,
  placeholder,
}: NumberInputProps) {
  const { root, group, field, btn } = numberInput({ size })

  return (
    <div
      className={root()}
      data-testid="number-input-root"
    >
      <NumberField.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={(val) => onChange?.(val ?? 0)}
        step={step}
        value={value}
      >
        <NumberField.Group
          className={group()}
          data-testid="number-input-group"
        >
          <NumberField.Decrement
            className={btn({ className: 'border-r' })}
            data-testid="number-input-decrement"
          >
            <Minus size={14} />
          </NumberField.Decrement>
          <NumberField.Input
            className={field()}
            data-testid="number-input-field"
            placeholder={placeholder}
          />
          <NumberField.Increment
            className={btn({ className: 'border-l' })}
            data-testid="number-input-increment"
          >
            <Plus size={14} />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </div>
  )
}

export { NumberInput }
