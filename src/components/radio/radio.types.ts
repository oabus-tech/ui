// Dependencies: @radix-ui/react-radio-group (or @base-ui equivalent)

export type RadioItem = {
  label: string // display text
  value: string // unique value
  description?: string // helper text below label
  disabled?: boolean // prevents interaction
}

export type RadioProps = {
  label?: string // text label
  description?: string // helper text
  value?: string // radio value for form
  disabled?: boolean // prevents interaction
  bordered?: boolean // adds border around radio wrapper
  checked?: boolean // controlled state
  defaultChecked?: boolean // uncontrolled initial state
  onChange?: (checked: boolean) => void // fires on selection
}

export type RadioGroupVariant = 'vertical' | 'horizontal'

export type RadioGroupProps = {
  items: RadioItem[] // list of radio options
  variant?: RadioGroupVariant // layout direction
  value?: string // controlled: selected value
  defaultValue?: string // uncontrolled: initially selected
  disabled?: boolean // disables all radios
  bordered?: boolean // adds border around each radio
  onChange?: (value: string) => void // fires when selection changes
}
