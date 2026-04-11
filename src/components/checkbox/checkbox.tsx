import { useState } from 'react'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { Check } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { CheckboxGroupProps, CheckboxProps } from './checkbox.types'

const checkbox = tv({
  slots: {
    root: 'checkbox-root flex items-start gap-2',
    box: [
      'checkbox-box relative flex shrink-0 items-center justify-center rounded-[4px]',
      'border border-input transition-colors outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',
      'dark:bg-input/30 dark:data-checked:bg-primary',
    ],
    indicator: 'checkbox-indicator grid place-content-center text-current',
  },
  variants: {
    size: {
      sm: { box: 'size-3', indicator: '[&>svg]:size-2.5' },
      md: { box: 'size-4', indicator: '[&>svg]:size-3.5' },
      lg: { box: 'size-5', indicator: '[&>svg]:size-4' },
    },
    bordered: {
      true: {
        root: 'w-full cursor-pointer select-none rounded-md border p-3 hover:bg-muted/50 has-disabled:cursor-not-allowed has-disabled:opacity-50',
      },
    },
  },
  defaultVariants: { size: 'md' },
})

const checkboxGroup = tv({
  base: 'checkbox-group flex',
  variants: {
    variant: {
      vertical: 'flex-col gap-2',
      horizontal: 'flex-row flex-wrap gap-4',
    },
  },
  defaultVariants: { variant: 'vertical' },
})

function CheckboxRoot({
  label,
  description,
  size,
  checked,
  defaultChecked,
  disabled,
  bordered,
  value,
  onChange,
}: CheckboxProps) {
  const { root, box, indicator } = checkbox({ size, bordered })

  return (
    <div data-testid="checkbox-root" className={root()}>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        data-testid="checkbox-box"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        value={value}
        onCheckedChange={(val) => onChange?.(val === true)}
        className={box()}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          data-testid="checkbox-indicator"
          className={indicator()}
        >
          <Check />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm leading-none font-medium">{label}</span>
          )}
          {description && (
            <span className="text-muted-foreground text-xs">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}

function CheckboxGroup({
  items,
  value: controlledValue,
  defaultValue = [],
  disabled,
  variant,
  onChange,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const isControlled = controlledValue !== undefined
  const selected = isControlled ? controlledValue! : internalValue

  const handleChange = (itemValue: string, checked: boolean) => {
    const next = checked
      ? [...selected, itemValue]
      : selected.filter((v) => v !== itemValue)
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <div data-testid="checkbox-group" className={checkboxGroup({ variant })}>
      {items.map((item) => (
        <CheckboxRoot
          key={item.value}
          label={item.label}
          checked={selected.includes(item.value)}
          disabled={disabled || item.disabled}
          onChange={(checked) => handleChange(item.value, checked)}
        />
      ))}
    </div>
  )
}

const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
})

export { Checkbox }
