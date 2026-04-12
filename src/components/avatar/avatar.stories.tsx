import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './avatar'

const meta = {
  title: 'Feedback/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=1',
    alt: 'User avatar',
  },
}

export const Fallback: Story = {
  args: {
    alt: 'John Doe',
    children: 'JD',
  },
}

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=2',
    alt: 'Small avatar',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=3',
    alt: 'Large avatar',
    size: 'lg',
  },
}

export const Square: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=4',
    alt: 'Square avatar',
    variant: 'square',
  },
}

export const SquareFallback: Story = {
  args: {
    alt: 'Ana Silva',
    variant: 'square',
    children: 'AS',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?u=5" alt="Small" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?u=5" alt="Medium" size="md" />
      <Avatar src="https://i.pravatar.cc/150?u=5" alt="Large" size="lg" />
    </div>
  ),
}
