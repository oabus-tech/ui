import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import type { DateRange } from './date-range-input.types'

import { DateRangeInput } from './date-range-input'

const meta = {
  component: DateRangeInput,
  title: 'Form/DateRangeInput',
} satisfies Meta<typeof DateRangeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | null>({
      from: new Date(2025, 0, 10),
      to: new Date(2025, 0, 20),
    })
    return (
      <DateRangeInput
        onChange={setRange}
        value={range}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: {
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 15),
    },
  },
}
