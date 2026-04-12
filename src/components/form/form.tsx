import { Info } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import { Label } from '@/components/label'
import { Tooltip } from '@/components/tooltip'

import type { FormFieldProps, FormFieldSetProps, FormProps } from './form.types'

const form = tv({
  slots: {
    field: 'form-field flex flex-col gap-1.5',
    fieldDescription: 'form-field-description text-muted-foreground text-sm',
    fieldError: 'form-field-error text-destructive text-sm',
    fieldSet: 'form-field-set flex flex-col gap-4',
    fieldSetLegend:
      'form-field-set-legend mb-1 flex items-center gap-1.5 font-medium',
    root: 'form-root flex flex-col gap-4',
  },
})

const { root, field, fieldDescription, fieldError, fieldSet, fieldSetLegend } =
  form()

function FormRoot({ children, onSubmit }: PropsWithChildren<FormProps>) {
  return (
    <form
      className={root()}
      data-testid="form-root"
      onSubmit={onSubmit}
    >
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
    <div
      className={field()}
      data-testid="form-field"
    >
      {labelText && (
        <Label
          disabled={
            (
              labelExtras as {
                disabled?: boolean
              }
            ).disabled
          }
          htmlFor={
            (
              labelExtras as {
                htmlFor?: string
              }
            ).htmlFor ?? name
          }
          optional={
            (
              labelExtras as {
                optional?: boolean
              }
            ).optional
          }
          required={
            (
              labelExtras as {
                required?: boolean
              }
            ).required
          }
          tooltip={
            (
              labelExtras as {
                tooltip?: React.ReactNode
              }
            ).tooltip
          }
        >
          {labelText}
        </Label>
      )}
      {children}
      {description && (
        <p
          className={fieldDescription()}
          data-testid="form-field-description"
        >
          {description}
        </p>
      )}
      {error && (
        <p
          className={fieldError()}
          data-testid="form-field-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function FormFieldSet({
  children,
  legend,
  tooltip,
}: PropsWithChildren<FormFieldSetProps>) {
  return (
    <fieldset
      className={fieldSet()}
      data-testid="form-field-set"
    >
      {legend && (
        <legend
          className={fieldSetLegend()}
          data-testid="form-field-set-legend"
        >
          {legend}
          {tooltip && (
            <Tooltip
              content={typeof tooltip === 'string' ? tooltip : tooltip.content}
              side={typeof tooltip === 'object' ? tooltip.side : undefined}
            >
              <Info
                className="text-muted-foreground"
                size={14}
              />
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
