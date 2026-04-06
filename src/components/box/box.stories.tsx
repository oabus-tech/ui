import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from './box'

const meta = {
  component: Box,
  title: 'Layout/Box',
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    bg: 'card',
    children: 'Box content',
    padding: 'md',
    rounded: 'md',
  },
}

export const Muted: Story = {
  args: {
    bg: 'muted',
    children: 'Muted background',
    padding: 'lg',
    rounded: 'lg',
  },
}

export const FullWidth: Story = {
  args: {
    bg: 'card',
    children: 'Full width box',
    padding: 'md',
    rounded: 'md',
    width: 'full',
  },
}

export const WithMinHeight: Story = {
  args: {
    bg: 'muted',
    children: 'Min height md',
    minHeight: 'md',
    padding: 'md',
    rounded: 'md',
  },
}

export const Overflow: Story = {
  args: {
    bg: 'card',
    children:
      'This box has overflow hidden applied so content will be clipped at the boundaries.',
    overflow: 'hidden',
    padding: 'md',
    rounded: 'md',
    width: 'full',
  },
}

export const TextAlignCenter: Story = {
  args: {
    bg: 'card',
    children: 'Centered text',
    padding: 'md',
    rounded: 'md',
    textAlign: 'center',
    width: 'full',
  },
}

export const PaddingAxes: Story = {
  render: () => (
    <Box
      bg="card"
      paddingX="xl"
      paddingY="sm"
      rounded="md"
      width="full"
    >
      paddingX xl + paddingY sm
    </Box>
  ),
}
