import { ChevronRight, MoreHorizontal } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { cloneElement, isValidElement } from 'react'
import { tv } from 'tailwind-variants'

import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from './breadcrumb.types'

const styles = tv({
  slots: {
    ellipsis: 'flex size-9 items-center justify-center',
    ellipsisIcon: 'size-4',
    item: 'inline-flex items-center gap-1.5',
    link: 'text-muted-foreground transition-colors hover:text-foreground',
    list: 'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5',
    page: 'font-normal text-foreground',
    root: '',
    separator: 'text-muted-foreground [&>svg]:size-3.5',
  },
})

function BreadcrumbRoot({ children }: PropsWithChildren<BreadcrumbProps>) {
  const s = styles()

  return (
    <nav
      aria-label="breadcrumb"
      className={s.root()}
    >
      {children}
    </nav>
  )
}

function BreadcrumbList({ children }: PropsWithChildren<BreadcrumbListProps>) {
  const s = styles()

  return <ol className={s.list()}>{children}</ol>
}

function BreadcrumbItem({ children }: PropsWithChildren<BreadcrumbItemProps>) {
  const s = styles()

  return <li className={s.item()}>{children}</li>
}

function BreadcrumbLink({
  asChild,
  children,
  href,
}: PropsWithChildren<BreadcrumbLinkProps>) {
  const s = styles()

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<{
        className?: string
      }>,
      {
        className: s.link(),
      },
    )
  }

  return (
    <a
      className={s.link()}
      href={href}
    >
      {children}
    </a>
  )
}

function BreadcrumbPage({ children }: PropsWithChildren<BreadcrumbPageProps>) {
  const s = styles()

  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={s.page()}
    >
      {children}
    </span>
  )
}

function BreadcrumbSeparator({
  children,
}: PropsWithChildren<BreadcrumbSeparatorProps>) {
  const s = styles()

  return (
    <li
      aria-hidden="true"
      className={s.separator()}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  children: _children,
}: PropsWithChildren<BreadcrumbEllipsisProps>) {
  const s = styles()

  return (
    <span
      aria-hidden="true"
      className={s.ellipsis()}
    >
      <MoreHorizontal className={s.ellipsisIcon()} />
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
