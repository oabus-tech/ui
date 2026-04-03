// Dependencies: @/components/input (InputSize for size consistency)

import type { InputSize } from '@/components/input/input.types'

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'size' | 'value' | 'defaultValue'
> & {
  value?: string | null // controlled value
  defaultValue?: string | null // uncontrolled initial value
  size?: InputSize // visual size (matches Input sizes)
  rootClassName?: string // className for root wrapper
  leftSection?: React.ReactNode // element on the left
  rightSection?: React.ReactNode // element on the right
  onChange?: (value: string | null) => void // fires on value change
  maxLength?: number // max character count (renders counter UI)
}
