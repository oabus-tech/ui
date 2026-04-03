// Dependencies: @radix-ui/react-checkbox (or @base-ui equivalent)

export type CheckboxSize = 'sm' | 'md' | 'lg'

export type CheckboxItem = {
  label: string // display text for the checkbox
  value: string // unique value identifier
  disabled?: boolean // prevents interaction
}

export type CheckboxProps = {
  label?: string // text label next to checkbox
  description?: string // helper text below label
  value?: string // value for form submission
  size?: CheckboxSize // visual size of the checkbox
  disabled?: boolean // prevents interaction
  bordered?: boolean // adds border around the checkbox wrapper
  checked?: boolean // controlled checked state
  defaultChecked?: boolean // uncontrolled initial state
  onChange?: (checked: boolean) => void // fires on check/uncheck
}

export type CheckboxGroupVariant = 'vertical' | 'horizontal'

export type CheckboxGroupProps = {
  items: CheckboxItem[] // list of checkbox options
  value?: string[] // controlled: selected values
  defaultValue?: string[] // uncontrolled: initially selected values
  disabled?: boolean // disables all checkboxes in group
  variant?: CheckboxGroupVariant // layout direction
  onChange?: (value: string[]) => void // fires when selection changes
}
