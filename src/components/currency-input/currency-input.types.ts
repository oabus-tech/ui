// Dependencies: @/components/input (InputProps as base)

import type { InputProps } from '@/components/input/input.types'

export type Currency = 'brl' | 'usd' | 'eur'

export type CurrencyVariant = Currency | 'any'

export type CurrencyInputSingleValue = number | null
export type CurrencyInputRangeValue = {
  from?: number | null
  to?: number | null
}

type BaseCurrencyInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  variant?: CurrencyVariant // currency type determines symbol/formatting
}

type SingleCurrencyInputProps = {
  mode?: 'single' // single value input
  value?: number | null // controlled numeric value
  defaultValue?: number | null // uncontrolled initial value
  onChange?: (value: number | null) => void // fires on value change
}

type RangeCurrencyInputProps = {
  mode: 'range' // from/to range input
  value?: CurrencyInputRangeValue // controlled range value
  defaultValue?: CurrencyInputRangeValue // uncontrolled initial range
  onChange?: (v: CurrencyInputRangeValue) => void // fires on range change
}

export type CurrencyInputProps = BaseCurrencyInputProps &
  (SingleCurrencyInputProps | RangeCurrencyInputProps)
