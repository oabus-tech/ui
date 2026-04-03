// Dependencies: react-input-mask (or similar mask library), @/components/input (InputProps)

import type { InputProps } from '@/components/input/input.types'

export type MaskInputProps = Omit<
  InputProps,
  'type' | 'onChange' | 'debounce'
> & {
  mask: string | string[] // mask pattern(s): e.g. '999.999.999-99' (required)
  className?: string // additional CSS class
  onChange?: (value: string | null) => void // fires with unmasked/masked value
}
