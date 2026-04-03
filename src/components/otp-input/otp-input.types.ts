// Dependencies: none (custom segmented input implementation)

export type OTPInputSize = 'sm' | 'md' | 'lg'

export type OTPInputProps = {
  pattern?: number[] // digit count per segment, e.g. [3, 3] for XXX-XXX
  size?: OTPInputSize // visual size of each cell
  value?: string | null // controlled value (concatenated digits)
  defaultValue?: string | null // uncontrolled initial value
  onChange?: (value: string | null) => void // fires with full OTP string
}
