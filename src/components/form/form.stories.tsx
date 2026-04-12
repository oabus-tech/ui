import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '@/components/checkbox'
import { Input } from '@/components/input'
import { PasswordInput } from '@/components/password-input'
import { PhoneInput } from '@/components/phone-input'
import { Select } from '@/components/select'
import { Switch } from '@/components/switch'
import { Textarea } from '@/components/textarea'

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
        <PasswordInput placeholder="Enter your password" />
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

export const CompleteForm: Story = {
  render: () => (
    <Form>
      <Form.FieldSet legend="Personal Information">
        <Form.Field
          label={{
            content: 'Full name',
            required: true,
          }}
          name="name"
        >
          <Input placeholder="John Doe" />
        </Form.Field>
        <Form.Field
          description="We'll use this for account recovery."
          label={{
            content: 'Email',
            required: true,
          }}
          name="email"
        >
          <Input placeholder="john@example.com" />
        </Form.Field>
        <Form.Field
          label="Phone"
          name="phone"
        >
          <PhoneInput />
        </Form.Field>
        <Form.Field
          label={{
            content: 'Password',
            required: true,
          }}
          name="password"
        >
          <PasswordInput placeholder="Min. 8 characters" />
        </Form.Field>
      </Form.FieldSet>
      <Form.FieldSet legend="Preferences">
        <Form.Field
          description="Determines what the user can access."
          label="Role"
          name="role"
        >
          <Select
            mode="single"
            optionLabel="label"
            options={[
              {
                label: 'Admin',
                value: 'admin',
              },
              {
                label: 'Editor',
                value: 'editor',
              },
              {
                label: 'Viewer',
                value: 'viewer',
              },
            ]}
            optionValue="value"
            placeholder="Select a role"
          />
        </Form.Field>
        <Form.Field
          description="Brief description for your profile."
          label="Bio"
          name="bio"
        >
          <Textarea placeholder="Tell us about yourself..." />
        </Form.Field>
        <Form.Field name="notifications">
          <Switch label="Email notifications" />
        </Form.Field>
        <Form.Field name="terms">
          <Checkbox label="I agree to the terms and conditions" />
        </Form.Field>
      </Form.FieldSet>
    </Form>
  ),
}

export const WithMultipleErrors: Story = {
  render: () => (
    <Form>
      <Form.Field
        error="Name is required."
        label={{
          content: 'Full name',
          required: true,
        }}
        name="name"
      >
        <Input
          aria-invalid
          placeholder="John Doe"
        />
      </Form.Field>
      <Form.Field
        error="Please enter a valid email address."
        label={{
          content: 'Email',
          required: true,
        }}
        name="email"
      >
        <Input
          aria-invalid
          placeholder="john@example.com"
        />
      </Form.Field>
      <Form.Field
        label={{
          content: 'Password',
          required: true,
        }}
        name="password"
      >
        <PasswordInput placeholder="Min. 8 characters" />
      </Form.Field>
    </Form>
  ),
}

export const WithOptionalFields: Story = {
  render: () => (
    <Form>
      <Form.Field
        label={{
          content: 'Email',
          required: true,
        }}
        name="email"
      >
        <Input placeholder="john@example.com" />
      </Form.Field>
      <Form.Field
        label={{
          content: 'Nickname',
          optional: true,
        }}
        name="nickname"
      >
        <Input placeholder="johnny" />
      </Form.Field>
      <Form.Field
        label={{
          content: 'Referral code',
          optional: true,
          tooltip: 'Enter a code if someone referred you.',
        }}
        name="referral"
      >
        <Input placeholder="ABC123" />
      </Form.Field>
    </Form>
  ),
}
