import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from './skeleton'

const meta = {
  component: Skeleton,
  title: 'Components/Skeleton',
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-4 w-64',
  },
}

export const Circle: Story = {
  args: {
    className: 'size-12 rounded-full',
  },
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-40 w-80 rounded-xl" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-48" />
    </div>
  ),
}

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}
