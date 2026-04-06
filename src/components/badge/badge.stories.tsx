import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './badge'

const meta = {
  component: Badge,
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
  },
}

export const LoadingDestructive: Story = {
  args: {
    children: 'Error',
    loading: true,
    variant: 'destructive',
  },
}

export const Block: Story = {
  args: {
    block: true,
    children: 'Full width',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const Clickable: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('clicked'),
    variant: 'secondary',
  },
}
