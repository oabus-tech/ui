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
    mode: 'single',
    step: 1,
  },
}

export const WithStep: Story = {
  args: {
    defaultValue: 50,
    mode: 'single',
    step: 10,
  },
}

export const Range: Story = {
  args: {
    defaultValue: {
      from: 10,
      to: 100,
    },
    mode: 'range',
    placeholder: 'Select range',
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 5,
    disabled: true,
    mode: 'single',
  },
}
