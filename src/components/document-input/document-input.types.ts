// Dependencies: @/components/mask-input (MaskInputProps as base)

import type { MaskInputProps } from '@/components/mask-input/mask-input.types'

export type DocumentType = 'cpf' | 'cnpj' | 'any'

export type DocumentValue = {
  type: DocumentType // document type identifier
  number: string // formatted document number
}

export type DocumentInputProps = Omit<
  MaskInputProps,
  'mask' | 'value' | 'defaultValue' | 'onChange'
> & {
  variant: DocumentType // determines mask pattern and validation (required)
  value?: DocumentValue | null // controlled value
  defaultValue?: DocumentValue | null // uncontrolled initial value
  onChange?: (value: DocumentValue | null) => void // fires on value change
}
