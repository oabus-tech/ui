/**
 * PhoneInput
 *
 * Phone number input with country selector dropdown.
 * Displays flag emoji and applies country-specific mask patterns.
 *
 * Behavior:
 * - Left section: dropdown trigger showing selected country flag + dial code
 * - Dropdown: searchable country list (300px max-width, scrollable)
 * - Search filters by country name (localized via Intl.DisplayNames)
 * - Selecting a country applies its phone mask pattern
 * - Value includes ISO code, number string, and dial code
 *
 * Implementation:
 * - Compose MaskInput with Radix Dropdown for country selector
 * - Country data file provides code, ddi, flag emoji, and mask per country
 * - Search uses Intl.DisplayNames for localized country names
 * - <PhoneInput value={{ iso: "BR", number: "11999887766" }} onChange={setPhone} />
 *
 * Dependencies: MaskInput component, @radix-ui/react-dropdown-menu, country data file
 */

import type { MaskInputProps } from '@/components/mask-input/mask-input.types'

export type Country = {
  code: string // ISO country code (e.g. 'BR')
  ddi: string // international dialing code (e.g. '+55')
  flag: string // emoji flag
  mask: string // phone mask pattern for this country
}

export type PhoneValue = {
  iso: string // selected country ISO code
  number: string // phone number string
  ddi?: string // dialing code
}

export type PhoneInputProps = Omit<
  MaskInputProps,
  'value' | 'defaultValue' | 'mask' | 'onChange' | 'leftSection'
> & {
  value?: PhoneValue | null // controlled phone value
  defaultValue?: PhoneValue | null // uncontrolled initial value
  onChange?: (value: PhoneValue | null) => void // fires on phone change
}
