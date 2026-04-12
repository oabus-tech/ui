import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { tv } from 'tailwind-variants'

import { Label } from '@/components/label'

import type { SwitchProps } from './switch.types'

const switchStyles = tv({
  slots: {
    wrapper: 'switch-wrapper flex items-start gap-3',
    root: [
      'switch-root group/switch relative inline-flex shrink-0 cursor-pointer items-center',
      'rounded-full border border-transparent transition-all outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80',
      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    ],
    thumb: [
      'switch-thumb pointer-events-none block rounded-full bg-background ring-0 transition-transform',
      'data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0',
      'dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground',
    ],
    content: 'switch-content flex flex-col gap-0.5',
    description: 'switch-description text-sm text-muted-foreground',
  },
  variants: {
    size: {
      sm: { root: 'h-3.5 w-6', thumb: 'size-3' },
      md: { root: 'h-[18px] w-8', thumb: 'size-4' },
      lg: { root: 'h-[22px] w-10', thumb: 'size-5' },
    },
    bordered: {
      true: { wrapper: 'rounded-lg border border-input px-3 py-2.5' },
    },
  },
  defaultVariants: { size: 'md' },
})

function Switch({
  size,
  bordered,
  description,
  label,
  value,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
}: SwitchProps) {
  const { wrapper, root, thumb, content, description: descCls } = switchStyles({ size, bordered })

  const labelText = typeof label === 'string' ? label : label?.content
  const labelExtras = typeof label === 'object' && label !== null ? label : {}
  const hasContent = Boolean(labelText || description)

  return (
    <div data-testid="switch-wrapper" className={wrapper()}>
      <SwitchPrimitive.Root
        data-testid="switch-root"
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={root()}
      >
        <SwitchPrimitive.Thumb data-testid="switch-thumb" className={thumb()} />
      </SwitchPrimitive.Root>
      {hasContent && (
        <div data-testid="switch-content" className={content()}>
          {labelText && (
            <Label
              required={(labelExtras as { required?: boolean }).required}
              optional={(labelExtras as { optional?: boolean }).optional}
              tooltip={(labelExtras as { tooltip?: React.ReactNode }).tooltip}
              disabled={disabled ?? (labelExtras as { disabled?: boolean }).disabled}
              htmlFor={(labelExtras as { htmlFor?: string }).htmlFor}
            >
              {labelText}
            </Label>
          )}
          {description && (
            <span data-testid="switch-description" className={descCls()}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { Switch }
