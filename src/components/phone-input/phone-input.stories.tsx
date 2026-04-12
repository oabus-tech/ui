import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhoneInput } from './phone-input'

const meta = {
  title: 'Form/PhoneInput',
  component: PhoneInput,
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: { iso: 'BR', number: '11999887766', ddi: '+55' },
  },
}

export const US: Story = {
  args: {
    defaultValue: { iso: 'US', number: '', ddi: '+1' },
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}
