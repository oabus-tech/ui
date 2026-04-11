import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
}

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products and features.',
  },
}

export const Checked: Story = {
  args: { label: 'Already checked', checked: true },
}

export const Bordered: Story = {
  args: {
    label: 'Bordered checkbox',
    description: 'With a visible container.',
    bordered: true,
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const Small: Story = { args: { label: 'Small', size: 'sm' } }

export const Large: Story = { args: { label: 'Large', size: 'lg' } }

export const Group: Story = {
  render: () => (
    <Checkbox.Group
      items={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte', disabled: true },
      ]}
      value={['react']}
      onChange={() => {}}
    />
  ),
}

export const HorizontalGroup: Story = {
  render: () => (
    <Checkbox.Group
      variant="horizontal"
      items={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ]}
      value={[]}
      onChange={() => {}}
    />
  ),
}
