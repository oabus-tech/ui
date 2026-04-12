import { Menu } from '@base-ui/react/menu'
import { CheckIcon } from 'lucide-react'
import { isValidElement, type PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuTriggerProps,
} from './dropdown-menu.types'
import { cn } from '@/support/utils'

const dropdownMenu = tv({
  slots: {
    popup: [
      'dropdown-menu-popup w-40 z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin)',
      'overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground',
      'shadow-md ring-1 ring-foreground/10 duration-100 outline-none',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2',
      'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    item: [
      "dropdown-menu-item group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground",
      "data-inset:pl-7",
      "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
    ],
    checkboxItem: [
      "dropdown-menu-checkbox-item relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
      "data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    radioItem: [
      "dropdown-menu-radio-item relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground",
      "data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    indicator:
      'dropdown-menu-indicator pointer-events-none absolute right-2 flex items-center justify-center',
    label:
      'dropdown-menu-label px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7',
    separator: 'dropdown-menu-separator -mx-1 my-1 h-px bg-border',
    shortcut:
      'dropdown-menu-shortcut ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
  },
})

const {
  popup,
  item,
  checkboxItem,
  radioItem,
  indicator,
  label,
  separator,
  shortcut,
} = dropdownMenu()

function DropdownMenuRoot({
  open,
  onOpenChange,
  children,
}: PropsWithChildren<DropdownMenuProps>) {
  return (
    <Menu.Root onOpenChange={onOpenChange} open={open}>
      {children}
    </Menu.Root>
  )
}

function DropdownMenuTrigger({
  asChild,
  children,
}: PropsWithChildren<DropdownMenuTriggerProps>) {
  if (asChild && isValidElement(children)) {
    return <Menu.Trigger render={children} />
  }
  return <Menu.Trigger>{children}</Menu.Trigger>
}

function DropdownMenuContent({
  width,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  children,
}: PropsWithChildren<DropdownMenuContentProps>) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        align={align}
        className="isolate z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <Menu.Popup
          className={popup()}
          data-testid="dropdown-menu-popup"
          style={width ? { width } : undefined}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuItem({
  variant = 'default',
  disabled,
  onClick,
  children,
}: PropsWithChildren<DropdownMenuItemProps>) {
  return (
    <Menu.Item
      className={item()}
      data-testid="dropdown-menu-item"
      data-variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Menu.Item>
  )
}

function DropdownMenuCheckboxItem({
  checked,
  disabled,
  onCheckedChange,
  children,
}: PropsWithChildren<DropdownMenuCheckboxItemProps>) {
  return (
    <Menu.CheckboxItem
      checked={checked}
      className={checkboxItem()}
      data-testid="dropdown-menu-checkbox-item"
      disabled={disabled}
      onCheckedChange={onCheckedChange}
    >
      <span className={indicator()} data-testid="dropdown-menu-indicator">
        <Menu.CheckboxItemIndicator>
          <CheckIcon />
        </Menu.CheckboxItemIndicator>
      </span>
      {children}
    </Menu.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
}: PropsWithChildren<DropdownMenuRadioGroupProps>) {
  return (
    <Menu.RadioGroup
      data-testid="dropdown-menu-radio-group"
      onValueChange={onValueChange}
      value={value}
    >
      {children}
    </Menu.RadioGroup>
  )
}

function DropdownMenuRadioItem({
  value,
  disabled,
  children,
}: PropsWithChildren<DropdownMenuRadioItemProps>) {
  return (
    <Menu.RadioItem
      className={radioItem()}
      data-testid="dropdown-menu-radio-item"
      disabled={disabled}
      value={value}
    >
      <span className={indicator()} data-testid="dropdown-menu-indicator">
        <Menu.RadioItemIndicator>
          <CheckIcon />
        </Menu.RadioItemIndicator>
      </span>
      {children}
    </Menu.RadioItem>
  )
}

function DropdownMenuLabel({
  inset,
  children,
}: PropsWithChildren<DropdownMenuLabelProps>) {
  return (
    <Menu.GroupLabel
      className={label()}
      data-inset={inset || undefined}
      data-testid="dropdown-menu-label"
    >
      {children}
    </Menu.GroupLabel>
  )
}

function DropdownMenuSeparator() {
  return (
    <Menu.Separator
      className={separator()}
      data-testid="dropdown-menu-separator"
    />
  )
}

function DropdownMenuShortcut({ children }: PropsWithChildren) {
  return (
    <span className={shortcut()} data-testid="dropdown-menu-shortcut">
      {children}
    </span>
  )
}

function DropdownMenuGroup({ children }: PropsWithChildren) {
  return <Menu.Group data-testid="dropdown-menu-group">{children}</Menu.Group>
}

const DropdownMenu = Object.assign(DropdownMenuRoot, {
  CheckboxItem: DropdownMenuCheckboxItem,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Trigger: DropdownMenuTrigger,
})

export { DropdownMenu }
