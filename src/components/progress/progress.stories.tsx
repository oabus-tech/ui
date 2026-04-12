import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './progress'

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 60 },
}

export const WithLabel: Story = {
  args: { value: 75, label: 'Upload progress' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      <Progress size="sm" value={40} label="Small" />
      <Progress size="md" value={60} label="Medium" />
      <Progress size="lg" value={80} label="Large" />
    </div>
  ),
}

export const Empty: Story = {
  args: { value: 0 },
}

export const Full: Story = {
  args: { value: 100 },
}

export const RichLabel: Story = {
  args: {
    value: 50,
    label: { content: 'Storage used', tooltip: '5 GB of 10 GB used' },
  },
}
