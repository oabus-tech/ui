import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Radio } from './radio'

const meta = {
  component: Radio,
  title: 'Form/Radio',
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    value: 'accept',
  },
}

export const WithDescription: Story = {
  args: {
    description: 'Receive emails about new products and features.',
    label: 'Marketing emails',
    value: 'marketing',
  },
}

export const Bordered: Story = {
  args: {
    bordered: true,
    description: 'With a visible container.',
    label: 'Bordered radio',
    value: 'bordered',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
    value: 'disabled',
  },
}

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('react')
    return (
      <Radio.Group
        items={[
          {
            label: 'React',
            value: 'react',
          },
          {
            label: 'Vue',
            value: 'vue',
          },
          {
            label: 'Svelte',
            value: 'svelte',
          },
        ]}
        onChange={setValue}
        value={value}
        variant="horizontal"
      />
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('a')
    return (
      <Radio.Group
        items={[
          {
            label: 'Option A',
            value: 'a',
          },
          {
            label: 'Option B',
            value: 'b',
          },
          {
            description: 'This option is not available.',
            disabled: true,
            label: 'Option C',
            value: 'c',
          },
        ]}
        onChange={setValue}
        value={value}
      />
    )
  },
}
