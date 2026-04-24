import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { CurrencyInput } from './currency-input'

const meta = {
  args: {
    size: 'sm',
  },
  component: CurrencyInput,
  title: 'Form/CurrencyInput',
} satisfies Meta<typeof CurrencyInput>

export default meta
type Story = StoryObj<typeof meta>

export const BRL: Story = {
  args: {
    placeholder: '0,00',
    variant: 'brl',
  },
}

export const USD: Story = {
  args: {
    placeholder: '0.00',
    variant: 'usd',
  },
}

export const EUR: Story = {
  args: {
    placeholder: '0,00',
    variant: 'eur',
  },
}

export const Any: Story = {
  args: {
    variant: 'any',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'brl',
  },
}

export const UncontrolledEmpty: Story = {
  args: {
    placeholder: '0,00',
    variant: 'brl',
  },
}

export const UncontrolledWithValue: Story = {
  args: {
    defaultValue: 1234.56,
    variant: 'brl',
  },
}

export const ControlledEmpty: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(null)
    return (
      <CurrencyInput
        {...args}
        onChange={setValue}
        placeholder="0,00"
        value={value}
        variant="brl"
      />
    )
  },
}

export const ControlledWithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(1234.56)
    return (
      <CurrencyInput
        {...args}
        onChange={setValue}
        value={value}
        variant="brl"
      />
    )
  },
}
