import {
  cloneElement,
  createContext,
  isValidElement,
  type ReactElement,
  useContext,
} from 'react'
import { tv } from 'tailwind-variants'

import type { BottomTabsItemProps, BottomTabsProps } from './bottom-tabs.types'

const BottomTabsContext = createContext<
  Pick<BottomTabsProps, 'value' | 'onChange' | 'showLabels'> | undefined
>(undefined)

const bottomTabs = tv({
  slots: {
    icon: 'bottom-tabs-icon flex size-5 items-center justify-center',
    item: [
      'bottom-tabs-item flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg',
      'px-2 py-1.5 text-muted-foreground text-xs outline-none transition-colors',
      'hover:bg-muted hover:text-foreground',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
      'aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground',
      'data-[selected]:font-medium data-[selected]:shadow-sm',
    ],
    label: 'bottom-tabs-label max-w-full truncate',
    root: [
      'fixed inset-x-0 bottom-0 bottom-tabs z-40 flex gap-1 border-border border-t',
      'bg-background/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] backdrop-blur',
    ],
  },
})

function BottomTabsRoot({
  value,
  onChange,
  showLabels = true,
  children,
}: BottomTabsProps) {
  const { root } = bottomTabs()

  return (
    <BottomTabsContext.Provider
      value={{
        onChange,
        showLabels,
        value,
      }}
    >
      <nav
        className={root()}
        data-testid="bottom-tabs"
      >
        {children}
      </nav>
    </BottomTabsContext.Provider>
  )
}

function BottomTabsItem({
  value,
  label,
  icon,
  disabled,
  onClick,
  asChild,
  children,
}: BottomTabsItemProps) {
  const context = useContext(BottomTabsContext)
  const selected = context?.value === value
  const { item, icon: iconClass, label: labelClass } = bottomTabs()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (!event.defaultPrevented) {
      context?.onChange?.(event, value)
    }
  }

  const content = (
    <>
      {icon && <span className={iconClass()}>{icon}</span>}
      {context?.showLabels !== false && label && (
        <span className={labelClass()}>{label}</span>
      )}
      {children}
    </>
  )

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onClick?: React.MouseEventHandler<HTMLElement>
    }>

    return cloneElement(child, {
      'aria-current': selected ? 'page' : undefined,
      'data-selected': selected ? '' : undefined,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event)
        if (!event.defaultPrevented) {
          context?.onChange?.(event, value)
        }
      },
    })
  }

  return (
    <button
      aria-current={selected ? 'page' : undefined}
      className={item()}
      data-selected={selected ? '' : undefined}
      data-testid="bottom-tabs-item"
      disabled={disabled}
      onClick={handleClick}
      type="button"
    >
      {content}
    </button>
  )
}

const BottomTabs = Object.assign(BottomTabsRoot, {
  Item: BottomTabsItem,
})

export { BottomTabs }
