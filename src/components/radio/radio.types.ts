/**
 * Radio
 *
 * Single-select option input. Used individually or as a group
 * where only one option can be selected at a time.
 *
 * Behavior:
 * - Circle fill icon appears on selected state (Lucide Circle)
 * - Bordered variant wraps radio + label in a clickable bordered container
 * - Group renders items in horizontal or vertical layout
 * - Group enforces single selection — selecting one deselects others
 * - Items support description text below the label
 *
 * Implementation:
 * - Use Radix UI RadioGroup primitive for single-selection enforcement
 * - Peer selectors for label association with radio state
 * - <Radio label="Option A" value="a" bordered />
 * - <Radio.Group items={options} value={selected} variant="vertical" onChange={setSelected} />
 *
 * Dependencies: @radix-ui/react-radio-group, lucide-react (Circle icon)
 */

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
