// Dependencies: @/components/label (LabelProps), @/components/tooltip (TooltipProps)

import type { LabelProps } from '@/components/label'
import type { TooltipProps } from '@/components/tooltip'

export type FormProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement> // form submission handler
}

export type FormFieldLabelInput =
  | string
  | (LabelProps & {
      content: string
    })

export type FormFieldProps = {
  label?: FormFieldLabelInput // field label (string or rich label config)
  labelFloating?: boolean // enables floating label animation
  name?: string // input name for form data
  description?: React.ReactNode // helper text below the field
  error?: React.ReactNode // error message (renders in error state)
}

export type FormFieldLabelProps = {
  htmlFor?: string // associates with input id
  required?: boolean // shows required indicator
  optional?: boolean // shows optional text
  disabled?: boolean // applies disabled styling
  tooltip?: React.ReactNode // tooltip next to label
}

export type FormFieldSetTooltip = string | TooltipProps

export type FormFieldSetProps = {
  legend?: string // fieldset legend text
  tooltip?: FormFieldSetTooltip // tooltip on the legend
}
