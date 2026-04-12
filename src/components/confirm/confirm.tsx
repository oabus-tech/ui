import { useState } from 'react'

import { AlertDialog } from '@base-ui/react/alert-dialog'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

import type { ConfirmProps } from './confirm.types'

const confirm = tv({
  slots: {
    backdrop: [
      'confirm-backdrop fixed inset-0 isolate z-50 bg-black/50',
      'duration-100 data-open:animate-in data-open:fade-in-0',
      'data-closed:animate-out data-closed:fade-out-0',
    ],
    popup: [
      'confirm-popup fixed top-1/2 left-1/2 z-50 grid w-full max-w-sm',
      '-translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4',
      'text-popover-foreground shadow-xl ring-1 ring-foreground/10 outline-none',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    header: 'confirm-header flex flex-col gap-1.5',
    title: 'confirm-title font-heading text-base font-medium',
    description: 'confirm-description text-sm text-muted-foreground',
    footer: 'confirm-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
  },
})

const { backdrop, popup, header, title, description, footer } = confirm()

function Confirm({
  open,
  title: titleText,
  description: descriptionText,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmProps,
  cancelProps,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmProps) {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await Promise.resolve(onConfirm?.())
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCancel = async () => {
    setCancelLoading(true)
    try {
      await Promise.resolve(onCancel?.())
    } finally {
      setCancelLoading(false)
    }
  }

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose?.()
      }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Backdrop data-testid="confirm-backdrop" className={backdrop()} />
        <AlertDialog.Popup data-testid="confirm-popup" className={popup()}>
          <div data-testid="confirm-header" className={header()}>
            <AlertDialog.Title data-testid="confirm-title" className={title()}>
              {titleText}
            </AlertDialog.Title>
            <AlertDialog.Description
              data-testid="confirm-description"
              className={description()}
            >
              {descriptionText}
            </AlertDialog.Description>
          </div>
          <div data-testid="confirm-footer" className={footer()}>
            <AlertDialog.Close
              data-testid="confirm-cancel"
              render={
                <Button
                  variant="outline"
                  {...cancelProps}
                  loading={cancelLoading}
                  onClick={handleCancel}
                />
              }
            >
              {cancelText}
            </AlertDialog.Close>
            <Button
              data-testid="confirm-action"
              {...confirmProps}
              loading={confirmLoading}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export { Confirm }
