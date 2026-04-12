import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { tv } from 'tailwind-variants'

import { Label } from '@/components/label'

import type { ProgressProps } from './progress.types'

const progress = tv({
  slots: {
    root: 'progress-root flex w-full flex-col gap-2',
    label: 'progress-label',
    track: 'progress-track relative w-full overflow-hidden rounded-full bg-muted',
    indicator: 'progress-indicator h-full bg-primary transition-all duration-300',
  },
  variants: {
    size: {
      sm: { track: 'h-2' },
      md: { track: 'h-4' },
      lg: { track: 'h-6' },
    },
  },
  defaultVariants: { size: 'md' },
})

function Progress({ value, defaultValue, size, label }: ProgressProps) {
  const { root, label: labelCls, track, indicator } = progress({ size })

  const labelText = typeof label === 'string' ? label : label?.content
  const labelExtras = typeof label === 'object' && label !== null ? label : {}

  return (
    <ProgressPrimitive.Root
      data-testid="progress-root"
      value={value ?? defaultValue ?? null}
      className={root()}
    >
      {labelText && (
        <div data-testid="progress-label" className={labelCls()}>
          <Label
            required={(labelExtras as { required?: boolean }).required}
            optional={(labelExtras as { optional?: boolean }).optional}
            tooltip={(labelExtras as { tooltip?: React.ReactNode }).tooltip}
            disabled={(labelExtras as { disabled?: boolean }).disabled}
          >
            {labelText}
          </Label>
        </div>
      )}
      <ProgressPrimitive.Track data-testid="progress-track" className={track()}>
        <ProgressPrimitive.Indicator
          data-testid="progress-indicator"
          className={indicator()}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
