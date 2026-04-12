import type { Meta, StoryObj } from '@storybook/react-vite'

import { CurrencyInput } from './currency-input'

const meta = {
  title: 'Form/CurrencyInput',
  component: CurrencyInput,
} satisfies Meta<typeof CurrencyInput>

export default meta
type Story = StoryObj<typeof meta>

export const BRL: Story = {
  args: { variant: 'brl', mode: 'single', placeholder: '0,00' },
}

export const USD: Story = {
  args: { variant: 'usd', mode: 'single', placeholder: '0.00' },
}

export const EUR: Story = {
  args: { variant: 'eur', mode: 'single', placeholder: '0,00' },
}

export const Any: Story = {
  args: { variant: 'any', mode: 'single' },
}

export const Range: Story = {
  args: { variant: 'brl', mode: 'range', placeholder: '– –' },
}

export const Disabled: Story = {
  args: { variant: 'brl', mode: 'single', disabled: true },
}
