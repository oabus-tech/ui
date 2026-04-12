import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/components/input'

import { Form } from './form'

const meta = {
  title: 'Form/Form',
  component: Form,
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form>
      <Form.Field label="Full name" name="name">
        <Input placeholder="John Doe" />
      </Form.Field>
      <Form.Field label="Email" name="email" description="We'll never share your email.">
        <Input type="email" placeholder="john@example.com" />
      </Form.Field>
    </Form>
  ),
}

export const WithError: Story = {
  render: () => (
    <Form>
      <Form.Field
        label="Email"
        name="email"
        error="Please enter a valid email address."
      >
        <Input type="email" placeholder="john@example.com" aria-invalid />
      </Form.Field>
    </Form>
  ),
}

export const WithRequiredLabel: Story = {
  render: () => (
    <Form>
      <Form.Field label={{ content: 'Password', required: true }}>
        <Input type="password" placeholder="••••••••" />
      </Form.Field>
    </Form>
  ),
}

export const WithFieldSet: Story = {
  render: () => (
    <Form>
      <Form.FieldSet legend="Address" tooltip="Your shipping address">
        <Form.Field label="Street" name="street">
          <Input placeholder="123 Main St" />
        </Form.Field>
        <Form.Field label="City" name="city">
          <Input placeholder="New York" />
        </Form.Field>
      </Form.FieldSet>
    </Form>
  ),
}
