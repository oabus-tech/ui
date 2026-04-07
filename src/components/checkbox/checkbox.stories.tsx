import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox'

const meta = {
  component: Checkbox,
  title: 'Form/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const WithDescription: Story = {
  args: {
    description: 'You agree to our Terms of Service and Privacy Policy.',
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Already checked',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled and checked',
  },
}

export const Bordered: Story = {
  args: {
    bordered: true,
    description: 'Receive emails about your account activity.',
    label: 'Email notifications',
  },
}

export const BorderedChecked: Story = {
  args: {
    bordered: true,
    checked: true,
    description: 'Receive emails about your account activity.',
    label: 'Email notifications',
  },
}

export const SizeSm: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
}

export const SizeLg: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Small"
        size="sm"
      />
      <Checkbox
        label="Medium (default)"
        size="md"
      />
      <Checkbox
        label="Large"
        size="lg"
      />
    </div>
  ),
}

export const GroupVertical: Story = {
  render: () => (
    <Checkbox.Group
      items={[
        {
          label: 'Option A',
          value: 'a',
        },
        {
          label: 'Option B',
          value: 'b',
        },
        {
          label: 'Option C',
          value: 'c',
        },
      ]}
    />
  ),
}

export const GroupHorizontal: Story = {
  render: () => (
    <Checkbox.Group
      items={[
        {
          label: 'Option A',
          value: 'a',
        },
        {
          label: 'Option B',
          value: 'b',
        },
        {
          label: 'Option C',
          value: 'c',
        },
      ]}
      variant="horizontal"
    />
  ),
}

export const GroupWithDefaultValue: Story = {
  render: () => (
    <Checkbox.Group
      defaultValue={[
        'b',
      ]}
      items={[
        {
          label: 'Option A',
          value: 'a',
        },
        {
          label: 'Option B',
          value: 'b',
        },
        {
          label: 'Option C',
          value: 'c',
        },
      ]}
    />
  ),
}

export const GroupWithDisabledItem: Story = {
  render: () => (
    <Checkbox.Group
      defaultValue={[
        'a',
      ]}
      items={[
        {
          label: 'Option A',
          value: 'a',
        },
        {
          disabled: true,
          label: 'Option B (disabled)',
          value: 'b',
        },
        {
          label: 'Option C',
          value: 'c',
        },
      ]}
    />
  ),
}

export const GroupDisabled: Story = {
  render: () => (
    <Checkbox.Group
      defaultValue={[
        'a',
      ]}
      disabled
      items={[
        {
          label: 'Option A',
          value: 'a',
        },
        {
          label: 'Option B',
          value: 'b',
        },
        {
          label: 'Option C',
          value: 'c',
        },
      ]}
    />
  ),
}
