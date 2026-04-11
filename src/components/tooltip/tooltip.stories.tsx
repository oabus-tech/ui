import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tooltip } from './tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'This is a tooltip',
    children: <button className="rounded border px-3 py-1.5 text-sm">Hover me</button>,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Bottom: Story = { args: { side: 'bottom' } }

export const Left: Story = { args: { side: 'left' } }

export const Right: Story = { args: { side: 'right' } }

export const WithDelay: Story = { args: { delayDuration: 800 } }

export const RichContent: Story = {
  args: {
    content: (
      <span>
        Press <kbd className="rounded bg-background/20 px-1 font-mono text-xs">⌘K</kbd> to open
      </span>
    ),
  },
}
