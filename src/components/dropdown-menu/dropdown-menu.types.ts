// Dependencies: @radix-ui/react-dropdown-menu (or @base-ui equivalent)

export type DropdownMenuSide = 'top' | 'right' | 'bottom' | 'left'
export type DropdownMenuAlign = 'start' | 'center' | 'end'

export type DropdownMenuProps = {
  open?: boolean // controlled open state
  onOpenChange?: (open: boolean) => void // fires on open/close
}

export type DropdownMenuTriggerProps = {
  asChild?: boolean // render as child element
}

export type DropdownMenuContentProps = {
  width?: React.CSSProperties['width'] // dropdown width
  side?: DropdownMenuSide // preferred side for popover
  align?: DropdownMenuAlign // alignment relative to trigger
  sideOffset?: number // distance from trigger in px
}

export type DropdownMenuItemVariant = 'default' | 'destructive'
export type DropdownMenuItemProps = {
  variant?: DropdownMenuItemVariant // visual variant
  disabled?: boolean // prevents interaction
  asChild?: boolean // render as child element
  onClick?: React.MouseEventHandler<HTMLDivElement> // click handler
}

export type DropdownMenuCheckboxItemProps = {
  checked?: boolean // checkbox state
  disabled?: boolean // prevents interaction
  onCheckedChange?: (checked: boolean) => void // fires on toggle
}

export type DropdownMenuRadioGroupProps = {
  value?: string // controlled selected radio value
  onValueChange?: (value: string) => void // fires on selection change
}

export type DropdownMenuRadioItemProps = {
  value: string // radio value (required)
  disabled?: boolean // prevents interaction
}

export type DropdownMenuLabelProps = {
  inset?: boolean // adds left padding for alignment with items
}

export type DropdownMenuSeparatorProps = {}

export type DropdownMenuShortcutProps = {}

export type DropdownMenuGroupProps = {}

export type DropdownMenuSubProps = {}

export type DropdownMenuSubTriggerProps = {
  inset?: boolean // adds left padding for alignment
}

export type DropdownMenuSubContentProps = {}
