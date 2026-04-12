import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/components/input'

import { Form } from './form'

const meta = {
  component: Form,
  title: 'Form/Form',
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form>
      <Form.Field
        label="Full name"
        name="name"
      >
        <Input placeholder="John Doe" />
      </Form.Field>
      <Form.Field
        description="We'll never share your email."
        label="Email"
        name="email"
      >
        <Input placeholder="john@example.com" />
      </Form.Field>
    </Form>
  ),
}

export const WithError: Story = {
  render: () => (
    <Form>
      <Form.Field
        error="Please enter a valid email address."
        label="Email"
        name="email"
      >
        <Input
          aria-invalid
          placeholder="john@example.com"
        />
      </Form.Field>
    </Form>
  ),
}

export const WithRequiredLabel: Story = {
  render: () => (
    <Form>
      <Form.Field
        label={{
          content: 'Password',
          required: true,
        }}
      >
        <Input
          placeholder="••••••••"
          type="password"
        />
      </Form.Field>
    </Form>
  ),
}

export const WithFieldSet: Story = {
  render: () => (
    <Form>
      <Form.FieldSet
        legend="Address"
        tooltip="Your shipping address"
      >
        <Form.Field
          label="Street"
          name="street"
        >
          <Input placeholder="123 Main St" />
        </Form.Field>
        <Form.Field
          label="City"
          name="city"
        >
          <Input placeholder="New York" />
        </Form.Field>
      </Form.FieldSet>
    </Form>
  ),
}
