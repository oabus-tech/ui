import type { PropsWithChildren } from 'react'

import { LayoutContent } from './content'
import { LayoutFooter } from './footer'
import { LayoutHeader } from './header'
import type { LayoutProps } from './layout.types'
import { LayoutMain } from './main'

function LayoutRoot(_props: PropsWithChildren<LayoutProps>) {
  return <div></div>
}

const Layout = Object.assign(LayoutRoot, {
  Content: LayoutContent,
  Footer: LayoutFooter,
  Header: LayoutHeader,
  Main: LayoutMain,
})

export { Layout }
