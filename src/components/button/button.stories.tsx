import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail, Trash } from 'lucide-react'

import { Button } from './button'

const meta = {
  component: Button,
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Dashed: Story = {
  args: {
    children: 'Dashed',
    variant: 'dashed',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
}

export const Loading: Story = {
  args: {
    children: 'Saving...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const Block: Story = {
  args: {
    block: true,
    children: 'Full width',
  },
}

export const WithLeftSection: Story = {
  args: {
    children: 'Send email',
    leftSection: <Mail />,
  },
}

export const WithRightSection: Story = {
  args: {
    children: 'Delete',
    rightSection: <Trash />,
    variant: 'destructive',
  },
}

export const SizeSm: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}

export const SizeLg: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}

export const IconMd: Story = {
  args: {
    children: <Mail />,
    size: 'icon-md',
    variant: 'outline',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="dashed">Dashed</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button
        size="icon-sm"
        variant="outline"
      >
        <Mail />
      </Button>
      <Button
        size="icon-md"
        variant="outline"
      >
        <Mail />
      </Button>
      <Button
        size="icon-lg"
        variant="outline"
      >
        <Mail />
      </Button>
    </div>
  ),
}
