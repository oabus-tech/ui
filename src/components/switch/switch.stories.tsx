import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './switch'

const meta = {
  title: 'Form/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Dark mode' },
}

export const WithDescription: Story = {
  args: {
    label: 'Notifications',
    description: 'Receive email notifications when someone mentions you.',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
}

export const Bordered: Story = {
  args: {
    label: 'Airplane mode',
    description: 'Disable all wireless connections.',
    bordered: true,
  },
}

export const Checked: Story = {
  args: { label: 'Dark mode', checked: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const RichLabel: Story = {
  args: {
    label: { content: 'Marketing emails', required: true, tooltip: 'You can unsubscribe anytime.' },
    description: 'Receive updates about new features and promotions.',
  },
}
