import type { PropsWithChildren } from 'react'

import type { BreadcrumbLinkProps } from './breadcrumb.types'

function BreadcrumbRoot(_props: PropsWithChildren) {
  return <div></div>
}

function BreadcrumbList(_props: PropsWithChildren) {
  return <div></div>
}

function BreadcrumbItem(_props: PropsWithChildren) {
  return <div></div>
}

function BreadcrumbLink(_props: PropsWithChildren<BreadcrumbLinkProps>) {
  return <div></div>
}

function BreadcrumbPage(_props: PropsWithChildren) {
  return <div></div>
}

function BreadcrumbSeparator(_props: PropsWithChildren) {
  return <div></div>
}

function BreadcrumbEllipsis(_props: PropsWithChildren) {
  return <div></div>
}

const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Ellipsis: BreadcrumbEllipsis,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  List: BreadcrumbList,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
})

export { Breadcrumb }
