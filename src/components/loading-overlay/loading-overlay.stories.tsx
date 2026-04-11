import type { Meta, StoryObj } from '@storybook/react-vite'

import { LoadingOverlay } from './loading-overlay'

const meta = {
  title: 'Feedback/LoadingOverlay',
  component: LoadingOverlay,
  decorators: [
    (Story) => (
      <div className="relative h-40 w-full rounded-lg border border-dashed p-4">
        <p className="text-sm text-muted-foreground">Content behind overlay</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Hidden: Story = {
  args: { visible: false },
}

export const Visible: Story = {
  args: { visible: true },
}
