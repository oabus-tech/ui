import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/components/button'

import { Confirm } from './confirm'

const meta = {
  args: {
    description:
      'This action cannot be undone. The item will be permanently deleted.',
    onCancel: () => {},
    onClose: () => {},
    onConfirm: () => {},
    title: 'Delete item?',
  },
  component: Confirm,
  title: 'Components/Confirm',
} satisfies Meta<typeof Confirm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Confirm</Button>
        <Confirm
          description="This action cannot be undone. The item will be permanently deleted."
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          open={open}
          title="Delete item?"
        />
      </>
    )
  },
}

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          variant="destructive"
        >
          Delete Account
        </Button>
        <Confirm
          cancelText="Keep account"
          confirmProps={{
            variant: 'destructive',
          }}
          confirmText="Delete account"
          description="All your data will be permanently deleted. This cannot be undone."
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          open={open}
          title="Delete your account?"
        />
      </>
    )
  },
}

export const Async: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Confirm with async</Button>
        <Confirm
          confirmText="Submit"
          description="Your data will be sent to the server."
          onClose={() => setOpen(false)}
          onConfirm={() =>
            new Promise<void>((resolve) => setTimeout(resolve, 2000))
          }
          open={open}
          title="Submit form?"
        />
      </>
    )
  },
}
