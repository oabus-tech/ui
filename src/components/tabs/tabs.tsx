import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './tabs.types'

const styles = tv({
  slots: {
    content: 'flex-1 text-sm outline-none',
    list: 'group/tabs-list inline-flex items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
    root: 'group/tabs flex gap-2 data-horizontal:flex-col',
    trigger:
      'relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-1.5 py-0.5 font-medium text-foreground/60 text-sm transition-all hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-sm group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start dark:text-muted-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
    triggerIcon: 'shrink-0',
  },
  variants: {
    justified: {
      true: {
        list: 'w-full',
      },
    },
  },
})

function TabsRoot(props: PropsWithChildren<TabsProps>) {
  const {
    children,
    defaultValue,
    onChange,
    orientation = 'horizontal',
    value,
  } = props
  const s = styles()

  return (
    <TabsPrimitive.Root
      className={s.root()}
      data-horizontal={orientation === 'horizontal' ? '' : undefined}
      data-vertical={orientation === 'vertical' ? '' : undefined}
      defaultValue={defaultValue}
      onValueChange={onChange}
      orientation={orientation}
      value={value}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

function TabsListRoot(props: PropsWithChildren<TabsListProps>) {
  const { children, justified } = props
  const s = styles({
    justified,
  })

  return (
    <TabsPrimitive.List className={s.list()}>{children}</TabsPrimitive.List>
  )
}

function TabsTriggerRoot(props: PropsWithChildren<TabsTriggerProps>) {
  const { children, icon, value } = props
  const s = styles()

  return (
    <TabsPrimitive.Tab
      className={s.trigger()}
      value={value}
    >
      {icon && <span className={s.triggerIcon()}>{icon}</span>}
      {children}
    </TabsPrimitive.Tab>
  )
}

function TabsContentRoot(props: PropsWithChildren<TabsContentProps>) {
  const { children, value } = props
  const s = styles()

  return (
    <TabsPrimitive.Panel
      className={s.content()}
      value={value}
    >
      {children}
    </TabsPrimitive.Panel>
  )
}

const Tabs = Object.assign(TabsRoot, {
  Content: TabsContentRoot,
  List: TabsListRoot,
  Trigger: TabsTriggerRoot,
})

export { Tabs }
