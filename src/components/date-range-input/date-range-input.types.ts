// Dependencies: date-fns, calendar component, @/components/input (InputProps)

import type { InputProps } from '@/components/input/input.types'

export type DateRange = {
  from?: Date // start date
  to?: Date // end date
}

export type DateRangeInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  value?: DateRange | null // controlled range value
  defaultValue?: DateRange | null // uncontrolled initial range
  onChange?: (range: DateRange | null) => void // fires when range changes
}
