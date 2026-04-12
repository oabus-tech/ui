import { Dialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

import type {
  SheetFooterProps,
  SheetHeaderProps,
  SheetProps,
} from './sheet.types'

const styles = tv({
  defaultVariants: {
    side: 'right',
  },
  slots: {
    backdrop: [
      'sheet-backdrop fixed inset-0 z-50 bg-black/50',
      'data-open:fade-in-0 duration-150 data-open:animate-in',
      'data-closed:fade-out-0 data-closed:animate-out',
    ],
    body: 'sheet-body flex-1 overflow-y-auto p-4 pt-0',
    description: 'sheet-description text-muted-foreground text-sm',
    footer: 'sheet-footer flex flex-row-reverse gap-2 p-4 pt-0',
    header: 'sheet-header flex items-start justify-between gap-2 p-4',
    headerContent: 'sheet-header-content flex flex-col gap-1',
    popup: [
      'sheet-popup fixed z-50 flex flex-col bg-popover text-popover-foreground shadow-xl outline-none',
      'duration-200 ease-in-out',
      'data-open:animate-in data-closed:animate-out',
    ],
    title: 'sheet-title font-heading font-medium text-base leading-none',
  },
  variants: {
    bordered: {
      true: {},
    },
    side: {
      bottom: {
        popup: [
          'inset-x-0 bottom-0 h-auto border-t',
          'data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
        ],
      },
      left: {
        popup: [
          'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          'data-open:slide-in-from-left data-closed:slide-out-to-left',
        ],
      },
      right: {
        popup: [
          'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          'data-open:slide-in-from-right data-closed:slide-out-to-right',
        ],
      },
      top: {
        popup: [
          'inset-x-0 top-0 h-auto border-b',
          'data-open:slide-in-from-top data-closed:slide-out-to-top',
        ],
      },
    },
  },
  compoundVariants: [
    {
      bordered: true,
      class: {
        footer: 'border-t pt-4',
        header: 'border-b pb-4',
      },
    },
  ],
})

function SheetRoot({
  open,
  side = 'right',
  onChange,
  children,
}: PropsWithChildren<SheetProps>) {
  const { backdrop, popup } = styles({ side })

  return (
    <Dialog.Root
      onOpenChange={onChange}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={backdrop()}
          data-testid="sheet-backdrop"
        />
        <Dialog.Popup
          className={popup()}
          data-side={side}
          data-testid="sheet-popup"
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SheetHeader({
  children,
  closable,
  bordered,
}: PropsWithChildren<SheetHeaderProps>) {
  const { header, headerContent } = styles({ bordered })

  return (
    <div
      className={header()}
      data-testid="sheet-header"
    >
      <div className={headerContent()}>{children}</div>
      {closable && (
        <Dialog.Close
          data-testid="sheet-close"
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

function SheetTitle({ children }: PropsWithChildren) {
  const { title } = styles()

  return (
    <Dialog.Title
      className={title()}
      data-testid="sheet-title"
    >
      {children}
    </Dialog.Title>
  )
}

function SheetDescription({ children }: PropsWithChildren) {
  const { description } = styles()

  return (
    <Dialog.Description
      className={description()}
      data-testid="sheet-description"
    >
      {children}
    </Dialog.Description>
  )
}

function SheetBody({ children }: PropsWithChildren) {
  const { body } = styles()

  return (
    <div
      className={body()}
      data-testid="sheet-body"
    >
      {children}
    </div>
  )
}

function SheetFooter({
  children,
  bordered,
}: PropsWithChildren<SheetFooterProps>) {
  const { footer } = styles({ bordered })

  return (
    <div
      className={footer()}
      data-testid="sheet-footer"
    >
      {children}
    </div>
  )
}

const Sheet = Object.assign(SheetRoot, {
  Body: SheetBody,
  Footer: SheetFooter,
  Header: Object.assign(SheetHeader, {
    Description: SheetDescription,
    Title: SheetTitle,
  }),
})

export { Sheet }
