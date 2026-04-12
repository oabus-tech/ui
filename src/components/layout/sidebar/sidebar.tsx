import { Dialog } from '@base-ui/react/dialog'
import { PanelLeftIcon } from 'lucide-react'
import {
  type CSSProperties,
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'
import { Tooltip } from '@/components/tooltip'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/support/utils'

import type {
  SidebarMenuActionProps,
  SidebarMenuButtonProps,
  SidebarMenuSkeletonProps,
  SidebarMenuSubButtonProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarTriggerProps,
} from './sidebar.types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type SidebarContextValue = {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  state: 'expanded' | 'collapsed'
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar.Provider.')
  }
  return context
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const providerStyles = tv({
  base: 'sidebar-provider group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
})

const sidebarGapStyles = tv({
  base: [
    'sidebar-gap relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
    'group-data-[collapsible=offcanvas]:w-0',
    'group-data-[side=right]:rotate-180',
  ],
  defaultVariants: {
    variant: 'sidebar',
  },
  variants: {
    variant: {
      floating:
        'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]',
      inset:
        'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]',
      sidebar: 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
    },
  },
})

const sidebarContainerStyles = tv({
  base: [
    'sidebar-container fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
    'data-[side=right]:right-0 data-[side=left]:left-0',
    'data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
    'data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
  ],
  defaultVariants: {
    variant: 'sidebar',
  },
  variants: {
    variant: {
      floating:
        'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]',
      inset:
        'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]',
      sidebar:
        'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
    },
  },
})

const sidebarInnerStyles = tv({
  base: 'sidebar-inner flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border',
})

const menuButtonStyles = tv({
  base: [
    'sidebar-menu-button peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding]',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2',
    'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    'data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground',
    'data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground',
    '[&_svg]:size-4 [&_svg]:shrink-0',
    '[&>span:last-child]:truncate',
  ],
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    size: {
      default: 'h-8 text-sm',
      lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      sm: 'h-7 text-xs',
    },
    variant: {
      default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      outline:
        'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
    },
  },
})

const mobileBackdropStyles = tv({
  base: [
    'sidebar-mobile-backdrop fixed inset-0 z-50 bg-black/50',
    'data-open:fade-in-0 duration-150 data-open:animate-in',
    'data-closed:fade-out-0 data-closed:animate-out',
  ],
})

const mobilePopupStyles = tv({
  base: [
    'sidebar-mobile-popup fixed z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-xl outline-none',
    'duration-200 ease-in-out',
    'data-closed:animate-out data-open:animate-in',
  ],
  defaultVariants: {
    side: 'left',
  },
  variants: {
    side: {
      left: 'data-open:slide-in-from-left data-closed:slide-out-to-left inset-y-0 left-0 h-full w-(--sidebar-width)',
      right:
        'data-open:slide-in-from-right data-closed:slide-out-to-right inset-y-0 right-0 h-full w-(--sidebar-width)',
    },
  },
})

// ---------------------------------------------------------------------------
// SidebarProvider
// ---------------------------------------------------------------------------

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
}: PropsWithChildren<SidebarProviderProps>) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)
  const [_open, _setOpen] = useState(defaultOpen)

  const open = openProp ?? _open

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [
      setOpenProp,
      open,
    ],
  )

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [
    isMobile,
    setOpen,
    setOpenMobile,
  ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    toggleSidebar,
  ])

  const state = open ? 'expanded' : 'collapsed'

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      isMobile,
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      state,
      toggleSidebar,
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    ],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={providerStyles()}
        data-testid="sidebar-provider"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Sidebar (main)
// ---------------------------------------------------------------------------

function SidebarMain({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  children,
}: PropsWithChildren<SidebarProps>) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        className="sidebar-root flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground"
        data-slot="sidebar"
        data-testid="sidebar-root"
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Dialog.Root
        onOpenChange={setOpenMobile}
        open={openMobile}
      >
        <Dialog.Portal>
          <Dialog.Backdrop
            className={mobileBackdropStyles()}
            data-testid="sidebar-mobile-backdrop"
          />
          <Dialog.Popup
            className={mobilePopupStyles({
              side,
            })}
            data-mobile="true"
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-testid="sidebar-mobile-popup"
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              } as CSSProperties
            }
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <div
      className="sidebar-root group peer hidden text-sidebar-foreground md:block"
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-side={side}
      data-slot="sidebar"
      data-state={state}
      data-testid="sidebar-root"
      data-variant={variant}
    >
      <div
        className={sidebarGapStyles({
          variant,
        })}
        data-slot="sidebar-gap"
        data-testid="sidebar-gap"
      />
      <div
        className={sidebarContainerStyles({
          variant,
        })}
        data-side={side}
        data-slot="sidebar-container"
        data-testid="sidebar-container"
      >
        <div
          className={sidebarInnerStyles()}
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          data-testid="sidebar-inner"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarTrigger
// ---------------------------------------------------------------------------

function SidebarTrigger({ onClick }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-testid="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      size="icon-sm"
      variant="ghost"
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

// ---------------------------------------------------------------------------
// SidebarRail
// ---------------------------------------------------------------------------

function SidebarRail() {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      aria-label="Toggle Sidebar"
      className={cn(
        'sidebar-rail absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear sm:flex',
        'after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border',
        'group-data-[side=left]:-right-4 group-data-[side=right]:left-0',
        'ltr:-translate-x-1/2 rtl:-translate-x-1/2',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      )}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      data-testid="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle Sidebar"
      type="button"
    />
  )
}

// ---------------------------------------------------------------------------
// SidebarInset
// ---------------------------------------------------------------------------

function SidebarInset({ children }: PropsWithChildren) {
  return (
    <main
      className={cn(
        'sidebar-inset relative flex w-full flex-1 flex-col bg-background',
        'md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0',
        'md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
      )}
      data-slot="sidebar-inset"
      data-testid="sidebar-inset"
    >
      {children}
    </main>
  )
}

// ---------------------------------------------------------------------------
// SidebarHeader
// ---------------------------------------------------------------------------

function SidebarHeader({ children }: PropsWithChildren) {
  return (
    <div
      className="sidebar-header flex flex-col gap-2 p-2"
      data-sidebar="header"
      data-slot="sidebar-header"
      data-testid="sidebar-header"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarFooter
// ---------------------------------------------------------------------------

function SidebarFooter({ children }: PropsWithChildren) {
  return (
    <div
      className="sidebar-footer flex flex-col gap-2 p-2"
      data-sidebar="footer"
      data-slot="sidebar-footer"
      data-testid="sidebar-footer"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarContent
// ---------------------------------------------------------------------------

function SidebarContent({ children }: PropsWithChildren) {
  return (
    <div
      className="sidebar-content no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
      data-sidebar="content"
      data-slot="sidebar-content"
      data-testid="sidebar-content"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarSeparator
// ---------------------------------------------------------------------------

function SidebarSeparator() {
  return (
    <div
      className="sidebar-separator mx-2 h-px w-auto shrink-0 bg-sidebar-border"
      data-sidebar="separator"
      data-slot="sidebar-separator"
      data-testid="sidebar-separator"
    />
  )
}

// ---------------------------------------------------------------------------
// SidebarGroup
// ---------------------------------------------------------------------------

function SidebarGroup({ children }: PropsWithChildren) {
  return (
    <div
      className="sidebar-group relative flex w-full min-w-0 flex-col p-2"
      data-sidebar="group"
      data-slot="sidebar-group"
      data-testid="sidebar-group"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarGroupLabel
// ---------------------------------------------------------------------------

function SidebarGroupLabel({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        'sidebar-group-label flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs',
        'outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        'focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
      )}
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      data-testid="sidebar-group-label"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarGroupAction
// ---------------------------------------------------------------------------

function SidebarGroupAction({ children }: PropsWithChildren) {
  return (
    <button
      className={cn(
        'sidebar-group-action absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0',
        'text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform',
        'group-data-[collapsible=icon]:hidden',
        'after:absolute after:-inset-2',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'md:after:hidden',
        '[&>svg]:size-4 [&>svg]:shrink-0',
      )}
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      data-testid="sidebar-group-action"
      type="button"
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// SidebarGroupContent
// ---------------------------------------------------------------------------

function SidebarGroupContent({ children }: PropsWithChildren) {
  return (
    <div
      className="sidebar-group-content w-full text-sm"
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      data-testid="sidebar-group-content"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenu
// ---------------------------------------------------------------------------

function SidebarMenu({ children }: PropsWithChildren) {
  return (
    <ul
      className="sidebar-menu flex w-full min-w-0 flex-col gap-0"
      data-sidebar="menu"
      data-slot="sidebar-menu"
      data-testid="sidebar-menu"
    >
      {children}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuItem
// ---------------------------------------------------------------------------

function SidebarMenuItem({ children }: PropsWithChildren) {
  return (
    <li
      className="sidebar-menu-item group/menu-item relative"
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      data-testid="sidebar-menu-item"
    >
      {children}
    </li>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuButton
// ---------------------------------------------------------------------------

function SidebarMenuButton({
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  onClick,
  children,
}: PropsWithChildren<SidebarMenuButtonProps>) {
  const { isMobile, state } = useSidebar()

  const button = (
    <button
      className={menuButtonStyles({
        size,
        variant,
      })}
      data-active={isActive || undefined}
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
      data-testid="sidebar-menu-button"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )

  if (!tooltip) {
    return button
  }

  return (
    <Tooltip
      content={tooltip}
      delayDuration={0}
      side="right"
    >
      {state === 'collapsed' && !isMobile ? button : button}
    </Tooltip>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuAction
// ---------------------------------------------------------------------------

function SidebarMenuAction({
  showOnHover = false,
  children,
}: PropsWithChildren<SidebarMenuActionProps>) {
  return (
    <button
      className={cn(
        'sidebar-menu-action absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0',
        'text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform',
        'group-data-[collapsible=icon]:hidden',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'peer-data-[size=sm]/menu-button:top-1',
        'after:absolute after:-inset-2',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'md:after:hidden',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 aria-expanded:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground md:opacity-0',
      )}
      data-sidebar="menu-action"
      data-slot="sidebar-menu-action"
      data-testid="sidebar-menu-action"
      type="button"
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuBadge
// ---------------------------------------------------------------------------

function SidebarMenuBadge({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        'sidebar-menu-badge pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        'group-data-[collapsible=icon]:hidden',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-active/menu-button:text-sidebar-accent-foreground',
      )}
      data-sidebar="menu-badge"
      data-slot="sidebar-menu-badge"
      data-testid="sidebar-menu-badge"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuSkeleton
// ---------------------------------------------------------------------------

function SidebarMenuSkeleton({ showIcon = false }: SidebarMenuSkeletonProps) {
  const [width] = useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      className="sidebar-menu-skeleton flex h-8 items-center gap-2 rounded-md px-2"
      data-sidebar="menu-skeleton"
      data-slot="sidebar-menu-skeleton"
      data-testid="sidebar-menu-skeleton"
    >
      {showIcon && (
        <div
          className="size-4 animate-pulse rounded-md bg-muted"
          data-testid="sidebar-menu-skeleton-icon"
        />
      )}
      <div
        className="h-4 max-w-(--skeleton-width) flex-1 animate-pulse rounded-md bg-muted"
        data-testid="sidebar-menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as CSSProperties
        }
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuSub
// ---------------------------------------------------------------------------

function SidebarMenuSub({ children }: PropsWithChildren) {
  return (
    <ul
      className="sidebar-menu-sub mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden"
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      data-testid="sidebar-menu-sub"
    >
      {children}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuSubItem
// ---------------------------------------------------------------------------

function SidebarMenuSubItem({ children }: PropsWithChildren) {
  return (
    <li
      className="sidebar-menu-sub-item group/menu-sub-item relative"
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      data-testid="sidebar-menu-sub-item"
    >
      {children}
    </li>
  )
}

// ---------------------------------------------------------------------------
// SidebarMenuSubButton
// ---------------------------------------------------------------------------

function SidebarMenuSubButton({
  isActive = false,
  size = 'md',
  children,
}: PropsWithChildren<SidebarMenuSubButtonProps>) {
  return (
    <a
      className={cn(
        'sidebar-menu-sub-button flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2',
        'text-sidebar-foreground outline-hidden ring-sidebar-ring',
        'group-data-[collapsible=icon]:hidden',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-2',
        'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        size === 'sm' ? 'text-xs' : 'text-sm',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        '[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
      )}
      data-active={isActive || undefined}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-slot="sidebar-menu-sub-button"
      data-testid="sidebar-menu-sub-button"
    >
      {children}
    </a>
  )
}

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

const Sidebar = Object.assign(SidebarMain, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: Object.assign(SidebarGroup, {
    Action: SidebarGroupAction,
    Content: SidebarGroupContent,
    Label: SidebarGroupLabel,
  }),
  Header: SidebarHeader,
  Inset: SidebarInset,
  Menu: Object.assign(SidebarMenu, {
    Action: SidebarMenuAction,
    Badge: SidebarMenuBadge,
    Button: SidebarMenuButton,
    Item: SidebarMenuItem,
    Skeleton: SidebarMenuSkeleton,
    Sub: Object.assign(SidebarMenuSub, {
      Button: SidebarMenuSubButton,
      Item: SidebarMenuSubItem,
    }),
  }),
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger,
})

export { Sidebar, useSidebar }
