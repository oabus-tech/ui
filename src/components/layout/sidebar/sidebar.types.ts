/**
 * Sidebar
 *
 * Collapsible navigation sidebar with multiple variants and mobile support.
 * Supports nested menus, groups, tooltips, and keyboard shortcuts.
 *
 * Behavior:
 * - Variants: sidebar (default), floating, inset
 * - Collapsible modes: offcanvas, icon, none
 * - Side: left (default), right
 * - Mobile: renders as a sheet dialog
 * - Keyboard shortcut: Ctrl+B / Cmd+B to toggle
 * - Cookie persistence for open/collapsed state
 *
 * Dependencies: @base-ui/react/dialog, lucide-react, Sheet, Tooltip, Button
 */

export type SidebarState = 'expanded' | 'collapsed'

export type SidebarSide = 'left' | 'right'

export type SidebarVariant = 'sidebar' | 'floating' | 'inset'

export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'

export type SidebarProviderProps = {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type SidebarProps = {
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
}

export type SidebarTriggerProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type SidebarMenuButtonSize = 'sm' | 'default' | 'lg'

export type SidebarMenuButtonVariant = 'default' | 'outline'

export type SidebarMenuButtonProps = {
  isActive?: boolean
  size?: SidebarMenuButtonSize
  variant?: SidebarMenuButtonVariant
  tooltip?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type SidebarMenuActionProps = {
  showOnHover?: boolean
}

export type SidebarMenuSkeletonProps = {
  showIcon?: boolean
}

export type SidebarMenuSubButtonProps = {
  isActive?: boolean
  size?: 'sm' | 'md'
}
