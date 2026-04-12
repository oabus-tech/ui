import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import { Modal } from './modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onChange={setOpen}>
          <Modal.Header closable>
            <Modal.Header.Title>Edit Profile</Modal.Header.Title>
            <Modal.Header.Description>Update your account information.</Modal.Header.Description>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4">
              <Input placeholder="Full name" />
              <Input placeholder="Email" type="email" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)}>Save</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}

export const WithBorderedSections: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Bordered Modal</Button>
        <Modal open={open} onChange={setOpen}>
          <Modal.Header closable bordered>
            <Modal.Header.Title>Bordered Modal</Modal.Header.Title>
            <Modal.Header.Description>Header and footer have borders.</Modal.Header.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-muted-foreground">Modal body content goes here.</p>
          </Modal.Body>
          <Modal.Footer bordered>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
}
