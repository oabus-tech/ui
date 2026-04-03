import type { PropsWithChildren } from 'react'

import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './tabs.types'

function TabsRoot(_props: PropsWithChildren<TabsProps>) {
  return <div></div>
}

function TabsList(_props: PropsWithChildren<TabsListProps>) {
  return <div></div>
}

function TabsTrigger(_props: PropsWithChildren<TabsTriggerProps>) {
  return <div></div>
}

function TabsContent(_props: PropsWithChildren<TabsContentProps>) {
  return <div></div>
}

const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
})

export { Tabs }
