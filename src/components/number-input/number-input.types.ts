/**
 * NumberInput
 *
 * Numeric input with increment/decrement stepper buttons.
 * Supports single value and from/to range modes.
 *
 * Behavior:
 * - Single mode: input with minus/plus stepper buttons
 * - Range mode: opens a popover with two inputs (from/to) and confirm/cancel
 * - Step prop controls increment/decrement amount
 * - Stepper buttons render as a grouped control with divider
 * - Input type="number" with inputMode="numeric"
 *
 * Implementation:
 * - Compose with Input for base styling
 * - Stepper UI: minus button | divider | plus button in right section
 * - Radix Popover for range mode
 * - <NumberInput mode="single" step={5} value={count} onChange={setCount} />
 * - <NumberInput mode="range" value={{ from: 0, to: 100 }} onChange={setRange} />
 *
 * Dependencies: Input component, @radix-ui/react-popover, lucide-react (Minus, Plus)
 */

import type { InputProps } from '@/components/input/input.types'

export type NumberInputMode = 'single' | 'range'

export type NumberInputSingleValue = number

export type NumberInputRangeValue = {
  from?: number // range start
  to?: number // range end
}

type BaseNumberInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  step?: number // increment/decrement step value
}

type SingleNumberInputProps = {
  mode: 'single' // single number input
  value?: NumberInputSingleValue // controlled value
  defaultValue?: NumberInputSingleValue // uncontrolled initial value
  onChange?: (value: NumberInputSingleValue) => void // fires on change
}

type RangeNumberInputProps = {
  mode: 'range' // from/to range input
  value?: NumberInputRangeValue // controlled range
  defaultValue?: NumberInputRangeValue // uncontrolled initial range
  onChange?: (value: NumberInputRangeValue) => void // fires on change
}

export type NumberInputProps = BaseNumberInputProps &
  (SingleNumberInputProps | RangeNumberInputProps)
