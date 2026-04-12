import type { Meta, StoryObj } from '@storybook/react-vite'

import { CurrencyInput } from './currency-input'

const meta = {
  title: 'Form/CurrencyInput',
  component: CurrencyInput,
} satisfies Meta<typeof CurrencyInput>

export default meta
type Story = StoryObj<typeof meta>

export const BRL: Story = {
  args: { variant: 'brl', placeholder: '0,00' },
}

export const USD: Story = {
  args: { variant: 'usd', placeholder: '0.00' },
}

export const EUR: Story = {
  args: { variant: 'eur', placeholder: '0,00' },
}

export const Any: Story = {
  args: { variant: 'any' },
}

export const Disabled: Story = {
  args: { variant: 'brl', disabled: true },
}
