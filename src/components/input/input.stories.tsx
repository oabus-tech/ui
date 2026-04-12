import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'

import { Input } from './input'

const meta = {
  args: {
    placeholder: 'Type something...',
  },
  component: Input,
  title: 'Form/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLeftSection: Story = {
  args: {
    leftSection: <Search size={16} />,
  },
}

export const WithRightSection: Story = {
  args: {
    rightSection: <span className="text-muted-foreground text-xs">kg</span>,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}
