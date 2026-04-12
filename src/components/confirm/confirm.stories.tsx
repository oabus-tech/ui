import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/button'

import { Confirm } from './confirm'

const meta = {
  title: 'Components/Confirm',
  component: Confirm,
  args: {
    title: 'Delete item?',
    description: 'This action cannot be undone. The item will be permanently deleted.',
    onConfirm: () => {},
    onCancel: () => {},
    onClose: () => {},
  },
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
          open={open}
          title="Delete item?"
          description="This action cannot be undone. The item will be permanently deleted."
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
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
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete Account</Button>
        <Confirm
          open={open}
          title="Delete your account?"
          description="All your data will be permanently deleted. This cannot be undone."
          confirmText="Delete account"
          cancelText="Keep account"
          confirmProps={{ variant: 'destructive' }}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
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
          open={open}
          title="Submit form?"
          description="Your data will be sent to the server."
          confirmText="Submit"
          onConfirm={() => new Promise<void>((resolve) => setTimeout(resolve, 2000))}
          onClose={() => setOpen(false)}
        />
      </>
    )
  },
}
