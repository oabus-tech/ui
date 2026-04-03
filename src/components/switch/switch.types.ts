// Dependencies: @radix-ui/react-switch (or @base-ui equivalent), @/components/label (WithLabelProps)

import type { WithLabelProps } from '@/components/label'

export type SwitchSize = 'sm' | 'md' | 'lg'

export type SwitchProps = WithLabelProps<{
  value?: string // value for form submission
  size?: SwitchSize // visual size variant
  description?: string // helper text below the switch
  checked?: boolean // controlled state
  defaultChecked?: boolean // uncontrolled initial state
  disabled?: boolean // prevents interaction
  bordered?: boolean // adds border around switch wrapper
  onCheckedChange?: (checked: boolean) => void // fires on toggle
}>
