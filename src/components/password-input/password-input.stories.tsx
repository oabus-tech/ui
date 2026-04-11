import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { PasswordInput } from './password-input'

const meta = {
  title: 'Form/PasswordInput',
  component: PasswordInput,
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
  },
}

export const WithStrength: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(v) => setValue(v ?? '')}
        placeholder="Enter password"
        showStrength
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Enter password',
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    placeholder: 'Enter password',
    'aria-invalid': true,
  },
}
