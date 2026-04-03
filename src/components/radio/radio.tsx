import type { PropsWithChildren } from 'react'

import type { RadioGroupProps, RadioProps } from './radio.types'

function RadioRoot(_props: PropsWithChildren<RadioProps>) {
  return <div></div>
}

function RadioGroup(_props: PropsWithChildren<RadioGroupProps>) {
  return <div></div>
}

const Radio = Object.assign(RadioRoot, {
  Group: RadioGroup,
})

export { Radio }
