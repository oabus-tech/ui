import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Slider } from './slider'

const meta = {
  component: Slider,
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 40,
    mode: 'single',
    orientation: 'horizontal',
  },
}

export const Range: Story = {
  args: {
    defaultValue: [
      20,
      80,
    ],
    mode: 'range',
    orientation: 'horizontal',
  },
}

export const SizeSm: Story = {
  args: {
    defaultValue: 40,
    mode: 'single',
    orientation: 'horizontal',
    size: 'sm',
  },
}

export const SizeLg: Story = {
  args: {
    defaultValue: 40,
    mode: 'single',
    orientation: 'horizontal',
    size: 'lg',
  },
}

export const Vertical: Story = {
  args: {
    defaultValue: 40,
    mode: 'single',
    orientation: 'vertical',
  },
}

export const VerticalRange: Story = {
  args: {
    defaultValue: [
      20,
      80,
    ],
    mode: 'range',
    orientation: 'vertical',
  },
}

export const Controlled: Story = {
  args: {
    mode: 'single',
    orientation: 'horizontal',
  },
  render: () => {
    const [value, setValue] = useState(30)
    return (
      <div className="flex w-64 flex-col gap-4">
        <Slider
          mode="single"
          onValueChange={setValue}
          orientation="horizontal"
          value={value}
        />
        <p className="text-sm">Valor: {value}</p>
      </div>
    )
  },
}

export const ControlledRange: Story = {
  args: {
    mode: 'range',
    orientation: 'horizontal',
  },
  render: () => {
    const [value, setValue] = useState<
      [
        number,
        number,
      ]
    >([
      20,
      80,
    ])
    return (
      <div className="flex w-64 flex-col gap-4">
        <Slider
          mode="range"
          onValueChange={setValue}
          orientation="horizontal"
          value={value}
        />
        <p className="text-sm">
          De {value[0]} até {value[1]}
        </p>
      </div>
    )
  },
}

export const AllSizes: Story = {
  args: {
    mode: 'single',
    orientation: 'horizontal',
  },
  render: () => (
    <div className="flex w-64 flex-col gap-6">
      <Slider
        defaultValue={40}
        mode="single"
        orientation="horizontal"
        size="sm"
      />
      <Slider
        defaultValue={40}
        mode="single"
        orientation="horizontal"
        size="md"
      />
      <Slider
        defaultValue={40}
        mode="single"
        orientation="horizontal"
        size="lg"
      />
    </div>
  ),
}
