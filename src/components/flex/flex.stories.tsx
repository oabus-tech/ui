import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '../typography'
import { Flex } from './flex'

const meta = {
  component: Flex,
  title: 'Layout/Flex',
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Flex gap="md">
      <Typography>A</Typography>
      <Typography>B</Typography>
      <Typography>C</Typography>
    </Flex>
  ),
}

export const Column: Story = {
  render: () => (
    <Flex
      direction="col"
      gap="sm"
    >
      <Typography>A</Typography>
      <Typography>B</Typography>
      <Typography>C</Typography>
    </Flex>
  ),
}

export const JustifyBetween: Story = {
  render: () => (
    <Flex
      gap="md"
      justify="between"
    >
      <Typography>Left</Typography>
      <Typography>Center</Typography>
      <Typography>Right</Typography>
    </Flex>
  ),
}

export const JustifyCenter: Story = {
  render: () => (
    <Flex
      gap="md"
      justify="center"
    >
      <Typography>A</Typography>
      <Typography>B</Typography>
    </Flex>
  ),
}

export const AlignCenter: Story = {
  render: () => (
    <Flex
      align="center"
      gap="md"
      minHeight="sm"
    >
      <Typography>A</Typography>
      <Typography>B</Typography>
      <Typography>C</Typography>
    </Flex>
  ),
}

export const Wrap: Story = {
  render: () => (
    <Flex
      gap="sm"
      wrap="wrap"
    >
      {[
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
      ].map((label) => (
        <Typography key={label}>{label}</Typography>
      ))}
    </Flex>
  ),
}

export const Inline: Story = {
  render: () => (
    <div>
      <Flex
        gap="sm"
        inline
      >
        <Typography>A</Typography>
        <Typography>B</Typography>
        <Typography>C</Typography>
      </Flex>
      <p className="mt-2 text-muted-foreground text-sm">
        Inline flex — sits inline with other content.
      </p>
    </div>
  ),
}

export const Block: Story = {
  render: () => (
    <Flex
      block
      justify="between"
    >
      <Typography>Left</Typography>
      <Typography>Right</Typography>
    </Flex>
  ),
}

export const AllGaps: Story = {
  render: () => (
    <Flex
      direction="col"
      gap="lg"
    >
      {(
        [
          'none',
          'xs',
          'sm',
          'md',
          'lg',
          'xl',
        ] as const
      ).map((gap) => (
        <div key={gap}>
          <Typography size="xs">gap="{gap}"</Typography>
          <Flex gap={gap}>
            <Typography>A</Typography>
            <Typography>B</Typography>
            <Typography>C</Typography>
          </Flex>
        </div>
      ))}
    </Flex>
  ),
}
