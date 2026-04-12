import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'
import { tv } from 'tailwind-variants'

import type { SeparatorProps } from './separator.types'

const separator = tv({
  base: 'separator shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
})

function Separator({ orientation = 'horizontal', decorative }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      aria-hidden={decorative}
      className={separator()}
      data-slot="separator"
      data-testid="separator"
      orientation={orientation}
    />
  )
}

export { Separator }
