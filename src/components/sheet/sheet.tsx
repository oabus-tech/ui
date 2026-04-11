'use client'

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

import type {
  SheetBodyProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetProps,
  SheetTitleProps,
} from './sheet.types'

const styles = tv({
  slots: {
    backdrop:
      'fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs',
    body: 'flex-1 overflow-y-auto p-4',
    closeButton: 'absolute top-2 right-2',
    description: 'text-muted-foreground text-sm',
    footer: 'mt-auto flex flex-col gap-2 p-4',
    header: 'relative flex flex-col gap-0.5 p-4',
    popup:
      'fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-popover-foreground text-sm shadow-lg transition duration-200 ease-in-out data-[side=left]:data-ending-style:-translate-x-10 data-[side=left]:data-starting-style:-translate-x-10 data-[side=right]:data-ending-style:translate-x-10 data-[side=right]:data-starting-style:translate-x-10 data-[side=bottom]:data-ending-style:translate-y-10 data-[side=bottom]:data-starting-style:translate-y-10 data-[side=top]:data-ending-style:-translate-y-10 data-[side=top]:data-starting-style:-translate-y-10 data-[side=bottom]:inset-x-0 data-[side=top]:inset-x-0 data-[side=left]:inset-y-0 data-[side=right]:inset-y-0 data-[side=top]:top-0 data-[side=right]:right-0 data-[side=bottom]:bottom-0 data-[side=left]:left-0 data-[side=bottom]:h-auto data-[side=left]:h-full data-[side=right]:h-full data-[side=top]:h-auto data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=bottom]:border-t data-[side=left]:border-r data-[side=top]:border-b data-[side=right]:border-l data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
    title: 'font-heading font-medium text-base text-foreground',
  },
  variants: {
    closable: {
      true: {
        header: 'pr-10',
      },
    },
    footerBordered: {
      true: {
        footer: 'border-t',
      },
    },
    headerBordered: {
      true: {
        header: 'border-b',
      },
    },
  },
})

function SheetRoot(props: PropsWithChildren<SheetProps>) {
  const { children, onChange, open, side = 'right' } = props
  const s = styles()

  return (
    <SheetPrimitive.Root
      onOpenChange={onChange}
      open={open}
    >
      <SheetPrimitive.Portal>
        <SheetPrimitive.Backdrop className={s.backdrop()} />
        <SheetPrimitive.Popup
          className={s.popup()}
          data-side={side}
        >
          {children}
        </SheetPrimitive.Popup>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  )
}

function SheetHeaderRoot(props: PropsWithChildren<SheetHeaderProps>) {
  const { bordered, children, closable } = props
  const s = styles({
    closable,
    headerBordered: bordered,
  })

  return (
    <div className={s.header()}>
      {children}
      {closable && (
        <div className={s.closeButton()}>
          <SheetPrimitive.Close
            render={
              <Button
                size="icon-sm"
                variant="ghost"
              >
                <XIcon />
                <span className="sr-only">Fechar</span>
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}

function SheetTitle(props: PropsWithChildren<SheetTitleProps>) {
  const { children } = props
  const s = styles()

  return (
    <SheetPrimitive.Title className={s.title()}>
      {children}
    </SheetPrimitive.Title>
  )
}

function SheetDescription(props: PropsWithChildren<SheetDescriptionProps>) {
  const { children } = props
  const s = styles()

  return (
    <SheetPrimitive.Description className={s.description()}>
      {children}
    </SheetPrimitive.Description>
  )
}

function SheetBody(props: PropsWithChildren<SheetBodyProps>) {
  const { children } = props
  const s = styles()

  return <div className={s.body()}>{children}</div>
}

function SheetFooter(props: PropsWithChildren<SheetFooterProps>) {
  const { bordered, children } = props
  const s = styles({
    footerBordered: bordered,
  })

  return <div className={s.footer()}>{children}</div>
}

const SheetHeader = Object.assign(SheetHeaderRoot, {
  Description: SheetDescription,
  Title: SheetTitle,
})

const Sheet = Object.assign(SheetRoot, {
  Body: SheetBody,
  Footer: SheetFooter,
  Header: SheetHeader,
})

export { Sheet }
