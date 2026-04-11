'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { useId } from 'react'
import { tv } from 'tailwind-variants'

import { Label } from '@/components/label'
import type { SwitchProps } from './switch.types'

const styles = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    description: 'mt-0.5 text-muted-foreground text-xs',
    labelWrapper: 'flex flex-col gap-1',
    root: 'flex cursor-pointer select-none items-start gap-2',
    thumb:
      'pointer-events-none block rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground',
    track:
      'relative inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-50 dark:data-unchecked:bg-input/80',
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
        thumb: 'size-5',
        track: 'h-6 w-11',
      },
      md: {
        thumb: 'size-4',
        track: 'h-[18px] w-8',
      },
      sm: {
        thumb: 'size-3',
        track: 'h-[14px] w-6',
      },
    },
  },
})

function Switch(props: SwitchProps) {
  const {
    bordered,
    checked,
    defaultChecked,
    description,
    disabled,
    label,
    onCheckedChange,
    size = 'md',
    value,
  } = props

  const id = useId()
  const s = styles({
    bordered,
    disabled,
    size,
  })

  const labelText = typeof label === 'string' ? label : label?.content
  const labelOptional = typeof label === 'object' ? label?.optional : undefined
  const labelRequired = typeof label === 'object' ? label?.required : undefined
  const labelTooltip = typeof label === 'object' ? label?.tooltip : undefined

  return (
    <label
      className={s.root()}
      htmlFor={id}
    >
      <SwitchPrimitive.Root
        checked={checked}
        className={s.track()}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
        value={value}
      >
        <SwitchPrimitive.Thumb className={s.thumb()} />
      </SwitchPrimitive.Root>
      {(labelText || description) && (
        <div className={s.labelWrapper()}>
          {labelText && (
            <Label
              disabled={disabled}
              optional={labelOptional}
              required={labelRequired}
              tooltip={labelTooltip}
            >
              {labelText}
            </Label>
          )}
          {description && (
            <span className={s.description()}>{description}</span>
          )}
        </div>
      )}
    </label>
  )
}

export { Switch }
