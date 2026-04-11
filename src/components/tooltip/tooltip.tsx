import type { PropsWithChildren } from 'react'

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { tv } from 'tailwind-variants'

import type { TooltipProps } from './tooltip.types'

const tooltip = tv({
  slots: {
    trigger: 'tooltip-trigger inline-flex',
    popup: [
      'tooltip-popup z-50 w-fit max-w-xs rounded-md',
      'origin-(--transform-origin)',
      'bg-foreground px-3 py-1.5 text-xs text-background',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    arrow: [
      'tooltip-arrow z-50 size-2.5 rotate-45 rounded-[2px]',
      'bg-foreground fill-foreground',
      'translate-y-[calc(-50%-2px)]',
      'data-[side=bottom]:top-1',
      'data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2',
      'data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2',
      'data-[side=top]:-bottom-2.5',
    ],
  },
})

const { trigger, popup, arrow } = tooltip()

function Tooltip({
  children,
  content,
  side = 'top',
  sideOffset = 4,
  delayDuration = 200,
}: PropsWithChildren<TooltipProps>) {
  return (
    <TooltipPrimitive.Provider delay={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          data-testid="tooltip-trigger"
          render={<span className={trigger()} />}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={side}
            sideOffset={sideOffset}
            className="isolate z-50"
          >
            <TooltipPrimitive.Popup
              data-testid="tooltip-popup"
              className={popup()}
            >
              {content}
              <TooltipPrimitive.Arrow
                data-testid="tooltip-arrow"
                className={arrow()}
              />
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export { Tooltip }
