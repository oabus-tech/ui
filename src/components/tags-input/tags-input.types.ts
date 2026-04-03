// Dependencies: @/components/input (InputProps as base)

import type { InputProps } from '@/components/input/input.types'

export type TagsInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange'
> & {
  value?: string[] // controlled list of tags
  defaultValue?: string[] // uncontrolled initial tags
  maxTags?: number // maximum number of tags allowed
  allowDuplicates?: boolean // whether duplicate tags are permitted
  onChange?: (value: string[]) => void // fires when tags change
}
