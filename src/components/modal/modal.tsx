import { Dialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'
import { cn } from '@/support/utils'

import type {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './modal.types'

const modal = tv({
  slots: {
    backdrop: [
      'modal-backdrop fixed inset-0 isolate z-50 bg-black/50',
      'data-open:fade-in-0 duration-100 data-open:animate-in',
      'data-closed:fade-out-0 data-closed:animate-out',
    ],
    body: 'modal-body flex-1 overflow-auto p-4 pt-0',
    description: 'modal-description text-muted-foreground text-sm',
    footer: 'modal-footer flex flex-row-reverse gap-2 p-4 pt-0',
    header: 'modal-header flex items-start justify-between gap-2 p-4',
    headerContent: 'modal-header-content flex flex-col gap-1',
    popup: [
      'modal-popup fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-full max-w-lg',
      '-translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-popover',
      'text-popover-foreground shadow-xl outline-none ring-1 ring-foreground/10',
      'data-open:fade-in-0 data-open:zoom-in-95 duration-100 data-open:animate-in',
      'data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out',
    ],
    title: 'modal-title font-heading font-medium text-base leading-none',
  },
  variants: {
    footerBordered: {
      true: {
        footer: 'border-t pt-4',
      },
    },
    headerBordered: {
      true: {
        header: 'border-b',
      },
    },
  },
})

const {
  backdrop,
  popup,
  headerContent,
  title,
  description,
  body,
  footer,
  header,
} = modal()

function ModalRoot({
  open,
  onChange,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <Dialog.Root
      onOpenChange={onChange}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={backdrop()}
          data-testid="modal-backdrop"
        />
        <Dialog.Popup
          className={popup()}
          data-testid="modal-popup"
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ModalHeader({
  children,
  closable,
  bordered,
}: PropsWithChildren<ModalHeaderProps>) {
  return (
    <div
      className={cn(
        header(),
        modal({
          headerBordered: bordered,
        }),
      )}
      data-testid="modal-header"
    >
      <div className={headerContent()}>{children}</div>
      {closable && (
        <Dialog.Close
          data-testid="modal-close"
          render={
            <Button
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          <X />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      )}
    </div>
  )
}

function ModalHeaderTitle({ children }: PropsWithChildren) {
  return (
    <Dialog.Title
      className={title()}
      data-testid="modal-title"
    >
      {children}
    </Dialog.Title>
  )
}

function ModalHeaderDescription({ children }: PropsWithChildren) {
  return (
    <Dialog.Description
      className={description()}
      data-testid="modal-description"
    >
      {children}
    </Dialog.Description>
  )
}

function ModalBody({ children }: PropsWithChildren<ModalBodyProps>) {
  return (
    <div
      className={body()}
      data-testid="modal-body"
    >
      {children}
    </div>
  )
}

function ModalFooter({
  children,
  bordered,
}: PropsWithChildren<ModalFooterProps>) {
  return (
    <div
      className={cn(
        footer(),
        modal({
          footerBordered: bordered,
        }),
      )}
      data-testid="modal-footer"
    >
      {children}
    </div>
  )
}

const Modal = Object.assign(ModalRoot, {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: Object.assign(ModalHeader, {
    Description: ModalHeaderDescription,
    Title: ModalHeaderTitle,
  }),
})

export { Modal }
