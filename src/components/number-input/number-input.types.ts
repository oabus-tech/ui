// Dependencies: @/components/input (InputProps as base)

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
