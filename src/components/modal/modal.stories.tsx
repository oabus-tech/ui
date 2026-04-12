import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '@/components/button'
import { Form } from '@/components/form'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

import { Modal } from './modal'

const meta = {
  component: Modal,
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          onChange={setOpen}
          open={open}
        >
          <Modal.Header closable>
            <Modal.Header.Title>Edit Profile</Modal.Header.Title>
            <Modal.Header.Description>
              Update your account information.
            </Modal.Header.Description>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Field
                label={{
                  content: 'Full name',
                  required: true,
                }}
              >
                <Input placeholder="John Doe" />
              </Form.Field>
              <Form.Field
                label={{
                  content: 'Email',
                  required: true,
                }}
              >
                <Input placeholder="john@example.com" />
              </Form.Field>
              <Form.Field
                description="This determines the user's permissions."
                label="Role"
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>Save</Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}

export const Bordered: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Bordered Modal</Button>
        <Modal
          onChange={setOpen}
          open={open}
        >
          <Modal.Header
            bordered
            closable
          >
            <Modal.Header.Title>Bordered Modal</Modal.Header.Title>
            <Modal.Header.Description>
              Header and footer have borders.
            </Modal.Header.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted-foreground text-sm">
              Modal body content goes here.
            </p>
          </Modal.Body>
          <Modal.Footer bordered>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}

export const Simple: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Simple Modal</Button>
        <Modal
          onChange={setOpen}
          open={open}
        >
          <Modal.Header closable>
            <Modal.Header.Title>Delete item?</Modal.Header.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted-foreground text-sm">
              This action cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setOpen(false)}
              variant="destructive"
            >
              Delete
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>
        <Modal
          onChange={setOpen}
          open={open}
        >
          <Modal.Header
            bordered
            closable
          >
            <Modal.Header.Title>Terms of Service</Modal.Header.Title>
            <Modal.Header.Description>
              Please read carefully before accepting.
            </Modal.Header.Description>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4 text-muted-foreground text-sm">
              {Array.from(
                {
                  length: 20,
                },
                (_, i) => (
                  <p key={i}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                ),
              )}
            </div>
          </Modal.Body>
          <Modal.Footer bordered>
            <Button onClick={() => setOpen(false)}>Accept</Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}

export const NoFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Info Modal</Button>
        <Modal
          onChange={setOpen}
          open={open}
        >
          <Modal.Header closable>
            <Modal.Header.Title>Information</Modal.Header.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted-foreground text-sm">
              This is an informational modal with no footer actions. Click the X
              or press Escape to close.
            </p>
          </Modal.Body>
        </Modal>
      </>
    )
  },
}
