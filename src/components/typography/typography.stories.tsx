import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from './typography'

const meta = {
  component: Typography,
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
}

export const Muted: Story = {
  args: {
    children: 'Muted text for secondary content.',
    variant: 'muted',
  },
}

export const Bold: Story = {
  args: {
    children: 'Bold text.',
    weight: 'bold',
  },
}

export const Truncate: Story = {
  render: () => (
    <div className="w-64">
      <Typography truncate>
        This is a very long text that should be truncated with an ellipsis when
        it overflows its container.
      </Typography>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
        ] as const
      ).map((size) => (
        <Typography
          key={size}
          size={size}
        >
          {size} — The quick brown fox
        </Typography>
      ))}
    </div>
  ),
}

export const AllWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ] as const
      ).map((weight) => (
        <Typography
          key={weight}
          weight={weight}
        >
          {weight} — The quick brown fox
        </Typography>
      ))}
    </div>
  ),
}

export const AsHeadings: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography
        component="h1"
        size="4xl"
        weight="bold"
      >
        Heading 1
      </Typography>
      <Typography
        component="h2"
        size="3xl"
        weight="semibold"
      >
        Heading 2
      </Typography>
      <Typography
        component="h3"
        size="2xl"
        weight="semibold"
      >
        Heading 3
      </Typography>
      <Typography
        component="h4"
        size="xl"
        weight="medium"
      >
        Heading 4
      </Typography>
      <Typography
        component="h5"
        size="lg"
        weight="medium"
      >
        Heading 5
      </Typography>
      <Typography
        component="h6"
        size="base"
        weight="medium"
      >
        Heading 6
      </Typography>
    </div>
  ),
}

export const AsParagraph: Story = {
  render: () => (
    <Typography
      component="p"
      size="base"
    >
      This is a paragraph of body text. It renders as a <code>&lt;p&gt;</code>{' '}
      element with base font size.
    </Typography>
  ),
}
