import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './avatar'

const meta = {
  component: Avatar,
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const IMAGE_URL =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'

export const Default: Story = {
  args: {
    alt: 'John Doe',
    src: IMAGE_URL,
  },
}

export const WithInitials: Story = {
  args: {
    alt: 'John Doe',
    src: null,
  },
}

export const FallbackIcon: Story = {
  args: {
    src: null,
  },
}

export const BrokenSrc: Story = {
  args: {
    alt: 'Jane Smith',
    src: 'https://broken.url/image.jpg',
  },
}

export const SizeSm: Story = {
  args: {
    alt: 'User',
    size: 'sm',
    src: IMAGE_URL,
  },
}

export const SizeMd: Story = {
  args: {
    alt: 'User',
    size: 'md',
    src: IMAGE_URL,
  },
}

export const SizeLg: Story = {
  args: {
    alt: 'User',
    size: 'lg',
    src: IMAGE_URL,
  },
}

export const Square: Story = {
  args: {
    alt: 'User',
    src: IMAGE_URL,
    variant: 'square',
  },
}

export const SquareWithInitials: Story = {
  args: {
    alt: 'Roberto Junior',
    src: null,
    variant: 'square',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        alt="User"
        size="sm"
        src={IMAGE_URL}
      />
      <Avatar
        alt="User"
        size="md"
        src={IMAGE_URL}
      />
      <Avatar
        alt="User"
        size="lg"
        src={IMAGE_URL}
      />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        alt="User"
        src={IMAGE_URL}
        variant="circle"
      />
      <Avatar
        alt="User"
        src={IMAGE_URL}
        variant="square"
      />
    </div>
  ),
}

export const FallbackStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src={null} />
      <Avatar
        alt="John"
        src={null}
      />
      <Avatar
        alt="John Doe"
        src={null}
      />
    </div>
  ),
}
