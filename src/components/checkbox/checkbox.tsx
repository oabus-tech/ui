import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { Check } from 'lucide-react'
import { useId } from 'react'
import { tv } from 'tailwind-variants'

import type { CheckboxGroupProps, CheckboxProps } from './checkbox.types'

const styles = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    description: 'mt-0.5 text-muted-foreground text-xs',
    icon: 'block',
    indicator:
      'flex shrink-0 cursor-pointer items-center justify-center rounded-sm border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground',
    label: 'cursor-pointer font-medium text-sm leading-none',
    labelWrapper: 'flex flex-col gap-1',
    root: 'flex cursor-pointer select-none items-start gap-2',
  },
  variants: {
    bordered: {
      true: {
        root: 'rounded-md border border-input px-4 py-3 transition-colors has-[data-checked]:border-primary',
      },
    },
    disabled: {
      true: {
        root: 'pointer-events-none opacity-50',
      },
    },
    size: {
      lg: {
        icon: 'size-3.5',
        indicator: 'mt-0.5 size-5',
      },
      md: {
        icon: 'size-3',
        indicator: 'mt-px size-4',
      },
      sm: {
        icon: 'size-2.5',
        indicator: 'size-3.5',
      },
    },
  },
})

const groupStyles = tv({
  base: 'flex',
  defaultVariants: {
    variant: 'vertical',
  },
  variants: {
    variant: {
      horizontal: 'flex-row flex-wrap gap-4',
      vertical: 'flex-col gap-2',
    },
  },
})

function CheckboxRoot(props: CheckboxProps) {
  const {
    bordered,
    checked,
    defaultChecked,
    description,
    disabled,
    label,
    onChange,
    size = 'md',
    value,
  } = props

  const id = useId()

  const s = styles({
    bordered,
    disabled,
    size,
  })

  return (
    <label
      className={s.root()}
      htmlFor={id}
    >
      <BaseCheckbox.Root
        checked={checked}
        className={s.indicator()}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
        value={value}
      >
        <BaseCheckbox.Indicator>
          <Check className={s.icon()} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {(label || description) && (
        <div className={s.labelWrapper()}>
          {label && <span className={s.label()}>{label}</span>}
          {description && (
            <span className={s.description()}>{description}</span>
          )}
        </div>
      )}
    </label>
  )
}

function CheckboxGroupRoot(props: CheckboxGroupProps) {
  const {
    defaultValue,
    disabled,
    items,
    onChange,
    value,
    variant = 'vertical',
  } = props

  const s = groupStyles({
    variant,
  })

  return (
    <BaseCheckboxGroup
      className={s}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onChange}
      value={value}
    >
      {items.map((item) => (
        <CheckboxRoot
          disabled={item.disabled}
          key={item.value}
          label={item.label}
          value={item.value}
        />
      ))}
    </BaseCheckboxGroup>
  )
}

const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroupRoot,
})

export { Checkbox }
