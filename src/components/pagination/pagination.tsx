import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
} from './pagination.types'

const pagination = tv({
  slots: {
    root: 'pagination-root mx-auto flex w-full justify-center',
    content: 'pagination-content flex items-center gap-0.5',
    item: 'pagination-item',
    link: [
      'pagination-link inline-flex size-8 items-center justify-center gap-1 rounded-lg border text-sm',
      'transition-colors outline-none select-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:opacity-50',
      'border-transparent hover:bg-muted hover:text-foreground',
      'aria-[current=page]:border-border aria-[current=page]:bg-muted',
    ],
    navLink: [
      'pagination-nav-link inline-flex h-8 items-center justify-center gap-1 rounded-lg border text-sm',
      'border-transparent px-2.5 transition-colors outline-none select-none',
      'hover:bg-muted hover:text-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    ellipsis: 'pagination-ellipsis flex size-8 items-center justify-center text-muted-foreground',
  },
})

const { root, content, item, link, navLink, ellipsis } = pagination()

function Pagination({ children, className }: PaginationProps) {
  return (
    <nav
      data-testid="pagination-root"
      role="navigation"
      aria-label="pagination"
      className={root({ className })}
    >
      {children}
    </nav>
  )
}

function PaginationContent({ children, className }: PaginationContentProps) {
  return (
    <ul data-testid="pagination-content" className={content({ className })}>
      {children}
    </ul>
  )
}

function PaginationItem({ children, className }: PaginationItemProps) {
  return (
    <li data-testid="pagination-item" className={item({ className })}>
      {children}
    </li>
  )
}

function PaginationLink({ isActive, href, children, className, disabled, onClick }: PaginationLinkProps) {
  return (
    <ButtonPrimitive
      data-testid="pagination-link"
      disabled={disabled}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={link({ className })}
      render={href ? <a href={href} /> : undefined}
    >
      {children}
    </ButtonPrimitive>
  )
}

function PaginationPrevious({ href, text = 'Previous', className, disabled, onClick }: PaginationPreviousProps) {
  return (
    <ButtonPrimitive
      data-testid="pagination-prev"
      aria-label="Go to previous page"
      disabled={disabled}
      onClick={onClick}
      className={navLink({ className })}
      render={href ? <a href={href} /> : undefined}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:block">{text}</span>
    </ButtonPrimitive>
  )
}

function PaginationNext({ href, text = 'Next', className, disabled, onClick }: PaginationNextProps) {
  return (
    <ButtonPrimitive
      data-testid="pagination-next"
      aria-label="Go to next page"
      disabled={disabled}
      onClick={onClick}
      className={navLink({ className })}
      render={href ? <a href={href} /> : undefined}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRight className="size-4" />
    </ButtonPrimitive>
  )
}

function PaginationEllipsis({ className }: PaginationEllipsisProps) {
  return (
    <span
      data-testid="pagination-ellipsis"
      aria-hidden
      className={ellipsis({ className })}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
