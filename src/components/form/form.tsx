import type { PropsWithChildren } from 'react'

import type { FormFieldProps, FormFieldSetProps, FormProps } from './form.types'

function FormRoot(_props: PropsWithChildren<FormProps>) {
  return <div></div>
}

function FormField(_props: PropsWithChildren<FormFieldProps>) {
  return <div></div>
}

function FormFieldSet(_props: PropsWithChildren<FormFieldSetProps>) {
  return <div></div>
}

const Form = Object.assign(FormRoot, {
  Field: FormField,
  FieldSet: FormFieldSet,
})

export { Form }
