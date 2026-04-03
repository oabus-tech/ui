// Dependencies: date-fns (date formatting), calendar component (date picker UI), @/components/input (InputProps)

import type { InputProps } from '@/components/input/input.types'

export type DateInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  value?: Date | null // controlled date value
  defaultValue?: Date | null // uncontrolled initial date
  onChange?: (date: Date | null) => void // fires when date is selected/cleared
}
