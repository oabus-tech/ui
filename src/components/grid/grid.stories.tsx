import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from '../box'
import { Typography } from '../typography'
import { Grid } from './grid'

const meta = {
  component: Grid,
  title: 'Layout/Grid',
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Cell = ({ label }: { label: string }) => (
  <Typography>
    <Box bg="muted">{label}</Box>
  </Typography>
)

export const Default: Story = {
  render: () => (
    <Grid
      cols={3}
      gap="md"
    >
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
    </Grid>
  ),
}

export const TwoCols: Story = {
  render: () => (
    <Grid
      cols={2}
      gap="md"
    >
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
    </Grid>
  ),
}

export const FourCols: Story = {
  render: () => (
    <Grid
      cols={4}
      gap="md"
    >
      {[
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
      ].map((n) => (
        <Cell
          key={n}
          label={n}
        />
      ))}
    </Grid>
  ),
}

export const TwelveCols: Story = {
  render: () => (
    <Grid
      cols={12}
      gap="sm"
    >
      {[
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ].map((n) => (
        <Cell
          key={n}
          label={n}
        />
      ))}
    </Grid>
  ),
}

export const WithItemSpan: Story = {
  render: () => (
    <Grid
      cols={12}
      gap="md"
    >
      <Grid.Item span={8}>
        <Cell label="span 8" />
      </Grid.Item>
      <Grid.Item span={4}>
        <Cell label="span 4" />
      </Grid.Item>
      <Grid.Item span={4}>
        <Cell label="span 4" />
      </Grid.Item>
      <Grid.Item span={4}>
        <Cell label="span 4" />
      </Grid.Item>
      <Grid.Item span={4}>
        <Cell label="span 4" />
      </Grid.Item>
      <Grid.Item span={6}>
        <Cell label="span 6" />
      </Grid.Item>
      <Grid.Item span={6}>
        <Cell label="span 6" />
      </Grid.Item>
    </Grid>
  ),
}

export const FullSpan: Story = {
  render: () => (
    <Grid
      cols={3}
      gap="md"
    >
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Grid.Item span="full">
        <Cell label="full width" />
      </Grid.Item>
      <Cell label="5" />
      <Cell label="6" />
    </Grid>
  ),
}

export const AllGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
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
          <p className="mb-2 text-muted-foreground text-xs">gap="{gap}"</p>
          <Grid
            cols={4}
            gap={gap}
          >
            {(
              [
                '1',
                '2',
                '3',
                '4',
              ] as const
            ).map((n) => (
              <Cell
                key={n}
                label={n}
              />
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
}
