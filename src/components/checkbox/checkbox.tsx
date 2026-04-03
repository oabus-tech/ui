import type { PropsWithChildren } from 'react'

import type { CheckboxGroupProps, CheckboxProps } from './checkbox.types'

function CheckboxRoot(_props: PropsWithChildren<CheckboxProps>) {
  return <div></div>
}

function CheckboxGroup(_props: PropsWithChildren<CheckboxGroupProps>) {
  return <div></div>
}

const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
})

export { Checkbox }
