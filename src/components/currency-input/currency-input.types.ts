/**
 * CurrencyInput
 *
 * Numeric input formatted as currency with symbol prefix.
 * Supports single value, currency selector, and from/to range modes.
 *
 * Behavior:
 * - Single mode: displays formatted currency value (e.g. R$ 1.234,56)
 * - "any" variant: renders a dropdown to select currency (BRL/USD/EUR)
 * - Range mode: opens a popover with two inputs (from/to) and confirm/cancel buttons
 * - Formatting uses Intl.NumberFormat based on currency locale
 * - Parsing strips non-digits, divides by 100 for decimal placement
 * - Left section shows currency symbol, right section shows dropdown trigger
 *
 * Implementation:
 * - Compose with Input component for base styling
 * - Radix Popover for range mode dual-input UI
 * - Radix Dropdown for currency type selector in "any" mode
 * - Locale map: brl → pt-BR, usd → en-US, eur → de-DE
 * - <CurrencyInput variant="brl" value={1234.56} onChange={setValue} />
 * - <CurrencyInput mode="range" variant="usd" value={{ from: 10, to: 100 }} onChange={setRange} />
 *
 * Dependencies: Input component, @radix-ui/react-popover, @radix-ui/react-dropdown-menu
 */

import type { InputProps } from '@/components/input/input.types'

export type Currency = 'brl' | 'usd' | 'eur'

export type CurrencyVariant = Currency | 'any'

export type CurrencyInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  variant?: CurrencyVariant // currency type determines symbol/formatting
  value?: number | null // controlled numeric value
  defaultValue?: number | null // uncontrolled initial value
  onChange?: (value: number | null) => void // fires on value change
}
