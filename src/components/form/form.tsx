import type { PropsWithChildren } from 'react'

import { Info } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Label } from '@/components/label'
import { Tooltip } from '@/components/tooltip'

import type { FormFieldProps, FormFieldSetProps, FormProps } from './form.types'

const form = tv({
  slots: {
    root: 'form-root flex flex-col gap-4',
    field: 'form-field flex flex-col gap-1.5',
    fieldDescription: 'form-field-description text-sm text-muted-foreground',
    fieldError: 'form-field-error text-sm text-destructive',
    fieldSet: 'form-field-set flex flex-col gap-4',
    fieldSetLegend: 'form-field-set-legend mb-1 flex items-center gap-1.5 font-medium',
  },
})

const { root, field, fieldDescription, fieldError, fieldSet, fieldSetLegend } = form()

function FormRoot({ children, onSubmit }: PropsWithChildren<FormProps>) {
  return (
    <form data-testid="form-root" className={root()} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

function FormField({
  children,
  label,
  name,
  description,
  error,
}: PropsWithChildren<FormFieldProps>) {
  const labelText = typeof label === 'string' ? label : label?.content
  const labelExtras = typeof label === 'object' && label !== null ? label : {}

  return (
    <div data-testid="form-field" className={field()}>
      {labelText && (
        <Label
          htmlFor={(labelExtras as { htmlFor?: string }).htmlFor ?? name}
          required={(labelExtras as { required?: boolean }).required}
          optional={(labelExtras as { optional?: boolean }).optional}
          tooltip={(labelExtras as { tooltip?: React.ReactNode }).tooltip}
          disabled={(labelExtras as { disabled?: boolean }).disabled}
        >
          {labelText}
        </Label>
      )}
      {children}
      {description && (
        <p data-testid="form-field-description" className={fieldDescription()}>
          {description}
        </p>
      )}
      {error && (
        <p role="alert" data-testid="form-field-error" className={fieldError()}>
          {error}
        </p>
      )}
    </div>
  )
}

function FormFieldSet({ children, legend, tooltip }: PropsWithChildren<FormFieldSetProps>) {
  return (
    <fieldset data-testid="form-field-set" className={fieldSet()}>
      {legend && (
        <legend data-testid="form-field-set-legend" className={fieldSetLegend()}>
          {legend}
          {tooltip && (
            <Tooltip
              content={typeof tooltip === 'string' ? tooltip : tooltip.content}
              side={typeof tooltip === 'object' ? tooltip.side : undefined}
            >
              <Info size={14} className="text-muted-foreground" />
            </Tooltip>
          )}
        </legend>
      )}
      {children}
    </fieldset>
  )
}

const Form = Object.assign(FormRoot, {
  Field: FormField,
  FieldSet: FormFieldSet,
})

export { Form }
