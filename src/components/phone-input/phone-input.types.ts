// Dependencies: @/components/mask-input (MaskInputProps), country data file with DDI/masks

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
