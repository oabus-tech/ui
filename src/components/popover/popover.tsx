import type { PropsWithChildren } from 'react'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { tv } from 'tailwind-variants'

import type { PopoverProps } from './popover.types'

const popover = tv({
  slots: {
    trigger: 'popover-trigger inline-flex',
    positioner: 'isolate z-50',
    popup: [
      'popover-popup z-50 w-72 rounded-lg',
      'bg-popover p-4 text-sm text-popover-foreground',
      'shadow-md ring-1 ring-foreground/10 outline-hidden',
      'origin-(--transform-origin)',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
  },
})

const { trigger, positioner, popup } = popover()

function Popover({
  children,
  content,
  open,
  onOpenChange,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
}: PropsWithChildren<PopoverProps>) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger
        data-testid="popover-trigger"
        render={<span className={trigger()} />}
      >
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          className={positioner()}
        >
          <PopoverPrimitive.Popup data-testid="popover-popup" className={popup()}>
            {content}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { Popover }
