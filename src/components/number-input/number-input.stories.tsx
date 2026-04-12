import type { Meta, StoryObj } from '@storybook/react-vite'

import { NumberInput } from './number-input'

const meta = {
  component: NumberInput,
  title: 'Form/NumberInput',
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    defaultValue: 0,
    step: 1,
  },
}

export const WithStep: Story = {
  args: {
    defaultValue: 50,
    step: 10,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 5,
    disabled: true,
  },
}
