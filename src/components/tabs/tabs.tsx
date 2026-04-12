import type { PropsWithChildren } from 'react'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { tv } from 'tailwind-variants'

import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './tabs.types'

const tabs = tv({
  slots: {
    root: 'tabs-root flex gap-2',
    list: 'tabs-list inline-flex w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground',
    trigger:
      'tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-1.5 py-0.5 font-medium text-foreground/60 text-sm transition-all hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-sm dark:text-muted-foreground dark:hover:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground [&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    content: 'tabs-content flex-1 text-sm outline-none',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'h-8',
      },
      vertical: {
        list: 'h-fit flex-col',
        trigger: 'w-full justify-start',
      },
    },
    justified: {
      true: {
        list: 'w-full',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

function TabsRoot({
  orientation,
  value,
  defaultValue,
  onChange,
  children,
}: PropsWithChildren<TabsProps>) {
  const { root } = tabs({ orientation })

  return (
    <TabsPrimitive.Root
      data-testid="tabs-root"
      className={root()}
      orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange ? (v) => onChange(v as string) : undefined}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

function TabsList({
  justified,
  children,
}: PropsWithChildren<TabsListProps>) {
  const { list } = tabs({ justified })

  return (
    <TabsPrimitive.List
      data-testid="tabs-list"
      className={list()}
    >
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  value,
  icon,
  children,
}: PropsWithChildren<TabsTriggerProps>) {
  const { trigger } = tabs()

  return (
    <TabsPrimitive.Tab
      data-testid="tabs-trigger"
      className={trigger()}
      value={value}
    >
      {icon}
      {children}
    </TabsPrimitive.Tab>
  )
}

function TabsContent({
  value,
  children,
}: PropsWithChildren<TabsContentProps>) {
  const { content } = tabs()

  return (
    <TabsPrimitive.Panel
      data-testid="tabs-content"
      className={content()}
      value={value}
    >
      {children}
    </TabsPrimitive.Panel>
  )
}

const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
})

export { Tabs }
