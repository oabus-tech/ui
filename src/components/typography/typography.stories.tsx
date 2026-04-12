import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from './typography'

const meta = {
  title: 'Feedback/Typography',
  component: Typography,
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default text',
  },
}

export const Heading: Story = {
  args: {
    component: 'h1',
    size: '3xl',
    weight: 'bold',
    children: 'Page Title',
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    size: 'sm',
    children: 'Secondary description text',
  },
}

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      'This is a very long text that should be truncated with an ellipsis when it overflows its container boundary',
  },
  decorators: [
    (Story) => (
      <div className="w-[200px]">
        <Story />
      </div>
    ),
  ],
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography size="xs">Extra small (xs)</Typography>
      <Typography size="sm">Small (sm)</Typography>
      <Typography size="base">Base</Typography>
      <Typography size="lg">Large (lg)</Typography>
      <Typography size="xl">Extra large (xl)</Typography>
      <Typography size="2xl">2XL</Typography>
      <Typography size="3xl">3XL</Typography>
    </div>
  ),
}

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography weight="thin">Thin</Typography>
      <Typography weight="light">Light</Typography>
      <Typography weight="normal">Normal</Typography>
      <Typography weight="medium">Medium</Typography>
      <Typography weight="semibold">Semibold</Typography>
      <Typography weight="bold">Bold</Typography>
      <Typography weight="extrabold">Extrabold</Typography>
      <Typography weight="black">Black</Typography>
    </div>
  ),
}
