// Dependencies: @radix-ui/react-progress (or @base-ui equivalent), @/components/label (WithLabelProps)

import type { WithLabelProps } from '@/components/label'

export type ProgressSize = 'sm' | 'md' | 'lg'

export type ProgressProps = WithLabelProps<{
  value?: number // current progress value (0-100)
  defaultValue?: number // uncontrolled initial value
  size?: ProgressSize // visual size of the progress bar
}>
