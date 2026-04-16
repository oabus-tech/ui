import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhoneInput } from './phone-input'

const meta = {
  args: {
    placeholder: 'Enter your phone number',
    size: 'md',
  },
  component: PhoneInput,
  title: 'Form/PhoneInput',
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {},
}

export const UncontrolledEmpty: Story = {
  args: {
    defaultValue: undefined,
    onChange: (e) => {
      console.log({
        e,
      })
    },
  },
}

export const UncontrolledWithDefault: Story = {
  args: {},
}

export const UncontrolledDisabled: Story = {
  args: {},
}
