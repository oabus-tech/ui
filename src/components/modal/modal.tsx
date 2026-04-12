import type { PropsWithChildren } from 'react'

import { Dialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

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
      'duration-100 data-open:animate-in data-open:fade-in-0',
      'data-closed:animate-out data-closed:fade-out-0',
    ],
    popup: [
      'modal-popup fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-full max-w-lg',
      '-translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-popover',
      'text-popover-foreground shadow-xl ring-1 ring-foreground/10 outline-none',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    header: 'modal-header flex items-start justify-between gap-2 p-4',
    headerContent: 'modal-header-content flex flex-col gap-1',
    title: 'modal-title font-heading text-base font-medium leading-none',
    description: 'modal-description text-sm text-muted-foreground',
    body: 'modal-body flex-1 overflow-auto p-4 pt-0',
    footer: 'modal-footer flex flex-row-reverse gap-2 p-4 pt-0',
  },
  variants: {
    headerBordered: { true: { header: 'border-b' } },
    footerBordered: { true: { footer: 'border-t pt-4' } },
  },
})

const { backdrop, popup, header, headerContent, title, description, body, footer } = modal()

function ModalRoot({ open, onChange, children }: PropsWithChildren<ModalProps>) {
  return (
    <Dialog.Root open={open} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Backdrop data-testid="modal-backdrop" className={backdrop()} />
        <Dialog.Popup data-testid="modal-popup" className={popup()}>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ModalHeader({ children, closable, bordered }: PropsWithChildren<ModalHeaderProps>) {
  return (
    <div data-testid="modal-header" className={modal({ headerBordered: bordered }).header()}>
      <div className={headerContent()}>{children}</div>
      {closable && (
        <Dialog.Close
          data-testid="modal-close"
          render={<Button variant="ghost" size="icon-sm" />}
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
    <Dialog.Title data-testid="modal-title" className={title()}>
      {children}
    </Dialog.Title>
  )
}

function ModalHeaderDescription({ children }: PropsWithChildren) {
  return (
    <Dialog.Description data-testid="modal-description" className={description()}>
      {children}
    </Dialog.Description>
  )
}

function ModalBody({ children }: PropsWithChildren<ModalBodyProps>) {
  return (
    <div data-testid="modal-body" className={body()}>
      {children}
    </div>
  )
}

function ModalFooter({ children, bordered }: PropsWithChildren<ModalFooterProps>) {
  return (
    <div data-testid="modal-footer" className={modal({ footerBordered: bordered }).footer()}>
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
