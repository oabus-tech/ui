import {
  type PropsWithChildren,
  type ReactElement,
  isValidElement,
  cloneElement,
} from 'react'

import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { BreadcrumbLinkProps } from './breadcrumb.types'

const breadcrumb = tv({
  slots: {
    root: 'breadcrumb-root',
    list: 'breadcrumb-list flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm',
    item: 'breadcrumb-item inline-flex items-center gap-1',
    link: 'breadcrumb-link transition-colors hover:text-foreground',
    page: 'breadcrumb-page font-normal text-foreground',
    separator: 'breadcrumb-separator [&>svg]:size-3.5',
    ellipsis:
      'breadcrumb-ellipsis flex size-5 items-center justify-center [&>svg]:size-4',
  },
})

const {
  root,
  list,
  item,
  link,
  page,
  separator,
  ellipsis,
} = breadcrumb()

function BreadcrumbRoot({ children }: PropsWithChildren) {
  return (
    <nav data-testid="breadcrumb-root" className={root()} aria-label="breadcrumb">
      {children}
    </nav>
  )
}

function BreadcrumbList({ children }: PropsWithChildren) {
  return (
    <ol data-testid="breadcrumb-list" className={list()}>
      {children}
    </ol>
  )
}

function BreadcrumbItem({ children }: PropsWithChildren) {
  return (
    <li data-testid="breadcrumb-item" className={item()}>
      {children}
    </li>
  )
}

function BreadcrumbLink({
  asChild,
  href,
  children,
}: PropsWithChildren<BreadcrumbLinkProps>) {
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      className: link(),
      'data-testid': 'breadcrumb-link',
    })
  }

  return (
    <a data-testid="breadcrumb-link" className={link()} href={href}>
      {children}
    </a>
  )
}

function BreadcrumbPage({ children }: PropsWithChildren) {
  return (
    <span
      data-testid="breadcrumb-page"
      className={page()}
      role="link"
      aria-disabled="true"
      aria-current="page"
    >
      {children}
    </span>
  )
}

function BreadcrumbSeparator({ children }: PropsWithChildren) {
  return (
    <li
      data-testid="breadcrumb-separator"
      className={separator()}
      role="presentation"
      aria-hidden="true"
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis() {
  return (
    <span
      data-testid="breadcrumb-ellipsis"
      className={ellipsis()}
      role="presentation"
      aria-hidden="true"
    >
      <MoreHorizontal />
      <span className="sr-only">More</span>
    </span>
  )
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
