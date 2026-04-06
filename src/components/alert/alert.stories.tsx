import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircle, CheckCircle, Info, TriangleAlert } from 'lucide-react'

import { Alert } from './alert'

const meta = {
  component: Alert,
  title: 'Feedback/Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <Alert.Icon>
        <Info />
      </Alert.Icon>
      <Alert.Title>Heads up!</Alert.Title>
      <Alert.Description>
        You can add components to your app using the CLI.
      </Alert.Description>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <Alert.Icon>
        <AlertCircle />
      </Alert.Icon>
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>
        Your session has expired. Please log in again.
      </Alert.Description>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert>
      <Alert.Icon>
        <CheckCircle />
      </Alert.Icon>
      <Alert.Title>Success</Alert.Title>
      <Alert.Description>Your changes have been saved.</Alert.Description>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert>
      <Alert.Icon>
        <TriangleAlert />
      </Alert.Icon>
      <Alert.Title>Warning</Alert.Title>
      <Alert.Description>
        This action cannot be undone. Proceed with caution.
      </Alert.Description>
    </Alert>
  ),
}

export const Closable: Story = {
  render: () => (
    <Alert
      closable
      onClose={() => console.log('closed')}
    >
      <Alert.Icon>
        <Info />
      </Alert.Icon>
      <Alert.Title>Dismissible</Alert.Title>
      <Alert.Description>
        Click the X button to dismiss this alert.
      </Alert.Description>
    </Alert>
  ),
}

export const ClosableDestructive: Story = {
  render: () => (
    <Alert
      closable
      onClose={() => console.log('closed')}
      variant="destructive"
    >
      <Alert.Icon>
        <AlertCircle />
      </Alert.Icon>
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>
        Something went wrong. Please try again.
      </Alert.Description>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert closable>
      <Alert.Icon>
        <AlertCircle />
      </Alert.Icon>
      <Alert.Title>Update available</Alert.Title>
      <Alert.Description>
        A new version is available. Reload to apply.
      </Alert.Description>
      <Alert.Action>
        <button
          className="mt-2 rounded border px-3 py-1 text-xs hover:bg-muted"
          type="button"
        >
          Reload
        </button>
      </Alert.Action>
    </Alert>
  ),
}

export const NoIcon: Story = {
  render: () => (
    <Alert>
      <Alert.Title>No icon</Alert.Title>
      <Alert.Description>
        An alert without an icon, using a single-column layout.
      </Alert.Description>
    </Alert>
  ),
}
