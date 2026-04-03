import type { PropsWithChildren } from 'react'

import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from './dropdown-menu.types'

function DropdownMenuRoot(_props: PropsWithChildren<DropdownMenuProps>) {
  return <div></div>
}

function DropdownMenuTrigger(
  _props: PropsWithChildren<DropdownMenuTriggerProps>,
) {
  return <div></div>
}

function DropdownMenuContent(
  _props: PropsWithChildren<DropdownMenuContentProps>,
) {
  return <div></div>
}

function DropdownMenuItem(_props: PropsWithChildren<DropdownMenuItemProps>) {
  return <div></div>
}

function DropdownMenuCheckboxItem(
  _props: PropsWithChildren<DropdownMenuCheckboxItemProps>,
) {
  return <div></div>
}

function DropdownMenuRadioGroup(
  _props: PropsWithChildren<DropdownMenuRadioGroupProps>,
) {
  return <div></div>
}

function DropdownMenuRadioItem(
  _props: PropsWithChildren<DropdownMenuRadioItemProps>,
) {
  return <div></div>
}

function DropdownMenuLabel(_props: PropsWithChildren<DropdownMenuLabelProps>) {
  return <div></div>
}

function DropdownMenuSeparator() {
  return <div></div>
}

function DropdownMenuShortcut(_props: PropsWithChildren) {
  return <div></div>
}

function DropdownMenuGroup(_props: PropsWithChildren) {
  return <div></div>
}

function DropdownMenuSub(_props: PropsWithChildren) {
  return <div></div>
}

function DropdownMenuSubTrigger(
  _props: PropsWithChildren<DropdownMenuSubTriggerProps>,
) {
  return <div></div>
}

function DropdownMenuSubContent(_props: PropsWithChildren) {
  return <div></div>
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
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  Trigger: DropdownMenuTrigger,
})

export { DropdownMenu }
