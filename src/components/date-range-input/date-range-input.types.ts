/**
 * DateRangeInput
 *
 * Date range picker showing two months side-by-side in a popover.
 * Displays "from ~ to" formatted in the input field.
 *
 * Behavior:
 * - Input is read-only — clicking opens a popover with dual-month Calendar
 * - Calendar renders with numberOfMonths={2} and mode="range"
 * - Displays formatted range as "dd/MM/yyyy ~ dd/MM/yyyy"
 * - Separator between dates is customizable
 * - Selecting start then end date fires onChange with { from, to }
 *
 * Implementation:
 * - Compose Input (read-only) with Radix Popover and Calendar (mode="range")
 * - <DateRangeInput value={{ from: startDate, to: endDate }} onChange={setRange} />
 *
 * Dependencies: Input component, @radix-ui/react-popover, date-fns, Calendar component
 */

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
