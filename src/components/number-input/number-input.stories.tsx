import type { Meta, StoryObj } from '@storybook/react-vite'

import { NumberInput } from './number-input'

const meta = {
  title: 'Form/NumberInput',
  component: NumberInput,
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: { mode: 'single', defaultValue: 0, step: 1 },
}

export const WithStep: Story = {
  args: { mode: 'single', defaultValue: 50, step: 10 },
}

export const Range: Story = {
  args: {
    mode: 'range',
    defaultValue: { from: 10, to: 100 },
    placeholder: 'Select range',
  },
}

export const Disabled: Story = {
  args: { mode: 'single', defaultValue: 5, disabled: true },
}
