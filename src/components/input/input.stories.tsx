import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search, X } from 'lucide-react'

import { Input } from './input'

const meta = {
  component: Input,
  title: 'Form/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'Controlled input',
    value: 'Hello world',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: 'Searching...',
  },
}

export const WithLeftSection: Story = {
  args: {
    leftSection: <Search />,
    placeholder: 'Search...',
  },
}

export const WithRightSection: Story = {
  args: {
    placeholder: 'Type to clear',
    rightSection: <X />,
    value: 'Some value',
  },
}

export const WithBothSections: Story = {
  args: {
    leftSection: <Search />,
    placeholder: 'Search...',
    rightSection: <X />,
  },
}

export const SizeSm: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
}

export const SizeLg: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Small"
        size="sm"
      />
      <Input
        placeholder="Medium (default)"
        size="md"
      />
      <Input
        placeholder="Large"
        size="lg"
      />
    </div>
  ),
}

export const Password: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
  },
}
