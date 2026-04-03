// Dependencies: @radix-ui/react-tooltip (or @base-ui equivalent)

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export type TooltipProps = {
  content: React.ReactNode // tooltip content (required)
  side?: TooltipSide // preferred placement side
  sideOffset?: number // distance from trigger in px
  delayDuration?: number // delay before showing in ms
}
