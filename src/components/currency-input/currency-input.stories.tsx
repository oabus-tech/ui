import type { Meta, StoryObj } from '@storybook/react-vite'

import { CurrencyInput } from './currency-input'

const meta = {
  args: {
    size: 'sm'
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
