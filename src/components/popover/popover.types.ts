// Dependencies: @radix-ui/react-popover (or @base-ui equivalent)

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'

export type PopoverAlign = 'start' | 'center' | 'end'

export type PopoverProps = {
  content: React.ReactNode // popover content (required)
  side?: PopoverSide // preferred side for placement
  sideOffset?: number // distance from trigger in px
  align?: PopoverAlign // alignment relative to trigger
}
