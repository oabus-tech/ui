// Dependencies: none (base input component, used by many specialized inputs)

export type InputSize = 'sm' | 'md' | 'lg'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'size' | 'value' | 'defaultValue' | 'type'
> & {
  /** @internal Use only for internal composition (e.g. PasswordInput). */
  type?: 'text' | 'password' // internal: controls input type attribute
  value?: string | null // controlled value (null clears)
  defaultValue?: string | null // uncontrolled initial value
  size?: InputSize // visual size variant
  rootClassName?: string // className for the root wrapper div
  leftSection?: React.ReactNode // element rendered on the left (e.g. icon)
  rightSection?: React.ReactNode // element rendered on the right (e.g. clear button)
  debounce?: boolean // debounces onChange calls
  loading?: boolean // shows loader in right section
  onChange?: (value: string | null) => void // fires on value change (null when empty)
}
