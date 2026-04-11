import type { PropsWithChildren } from 'react'

import { Info } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Tooltip } from '@/components/tooltip'

import type { LabelProps } from './label.types'

const label = tv({
  slots: {
    root: 'label-root flex items-center gap-1.5 text-sm font-medium leading-none select-none',
    indicator: 'label-indicator text-destructive',
    hint: 'label-hint font-normal text-muted-foreground',
    tooltipIcon: 'label-tooltip-icon text-muted-foreground',
  },
  variants: {
    disabled: {
      true: { root: 'pointer-events-none opacity-50' },
    },
  },
})

function Label({
  children,
  htmlFor,
  required,
  optional,
  disabled,
  tooltip,
}: PropsWithChildren<LabelProps>) {
  const { root, indicator, hint, tooltipIcon } = label({ disabled })

  return (
    <label data-testid="label-root" htmlFor={htmlFor} className={root()}>
      {children}
      {required && (
        <span data-testid="label-indicator" className={indicator()}>
          *
        </span>
      )}
      {optional && (
        <span data-testid="label-hint" className={hint()}>
          (optional)
        </span>
      )}
      {tooltip && (
        <Tooltip content={tooltip}>
          <Info data-testid="label-tooltip-icon" className={tooltipIcon()} size={14} />
        </Tooltip>
      )}
    </label>
  )
}

export { Label }
