import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './tabs.types'

const tabs = tv({
  defaultVariants: {
    orientation: 'horizontal',
  },
  slots: {
    content: 'tabs-content flex-1 text-sm outline-none',
    list: 'tabs-list inline-flex w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground',
    root: 'tabs-root flex gap-2',
    trigger:
      'tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-1.5 py-0.5 font-medium text-foreground/60 text-sm transition-all hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-active:bg-background data-active:text-foreground data-disabled:opacity-50 data-active:shadow-sm dark:text-muted-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground dark:hover:text-foreground [&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  },
  variants: {
    justified: {
      true: {
        list: 'w-full',
      },
    },
    orientation: {
      horizontal: {
        list: 'h-8',
        root: 'flex-col',
      },
      vertical: {
        list: 'h-fit flex-col',
        trigger: 'w-full justify-start',
      },
    },
  },
})

function TabsRoot({
  orientation,
  value,
  defaultValue,
  onChange,
  children,
}: PropsWithChildren<TabsProps>) {
  const { root } = tabs({
    orientation,
  })

  return (
    <TabsPrimitive.Root
      className={root()}
      data-testid="tabs-root"
      defaultValue={defaultValue}
      onValueChange={onChange ? (v) => onChange(v as string) : undefined}
      orientation={orientation}
      value={value}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

function TabsList({ justified, children }: PropsWithChildren<TabsListProps>) {
  const { list } = tabs({
    justified,
  })

  return (
    <TabsPrimitive.List
      className={list()}
      data-testid="tabs-list"
    >
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  value,
  icon,
  disabled,
  children,
}: PropsWithChildren<TabsTriggerProps>) {
  const { trigger } = tabs()

  return (
    <TabsPrimitive.Tab
      className={trigger()}
      data-testid="tabs-trigger"
      disabled={disabled}
      value={value}
    >
      {icon}
      {children}
    </TabsPrimitive.Tab>
  )
}

function TabsContent({ value, children }: PropsWithChildren<TabsContentProps>) {
  const { content } = tabs()

  return (
    <TabsPrimitive.Panel
      className={content()}
      data-testid="tabs-content"
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
