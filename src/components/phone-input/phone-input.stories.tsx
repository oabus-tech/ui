import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhoneInput } from './phone-input'

const meta = {
  component: PhoneInput,
  title: 'Form/PhoneInput',
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: {
      ddi: '+55',
      iso: 'BR',
      number: '11999887766',
    },
  },
}

export const US: Story = {
  args: {
    defaultValue: {
      ddi: '+1',
      iso: 'US',
      number: '',
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
