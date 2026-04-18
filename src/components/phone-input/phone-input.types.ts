import type * as RPNInput from 'react-phone-number-input'

import type { InputProps } from '@/components/input/input.types'

export type PhoneValue = {
  iso: string // selected country ISO code
  number: string // phone number string
  ddi?: string // dialing code
}

export type PhoneInputProps = Omit<
  InputProps,
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'type'
  | 'leftSection'
  | 'leftSectionWidth'
  | 'rootClassName'
> & {
  value?: PhoneValue | null
  defaultValue?: PhoneValue | null
  onChange?: (value: PhoneValue | null) => void
  defaultCountry?: RPNInput.Country
}
