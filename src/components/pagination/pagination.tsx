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
    content: 'pagination-content flex items-center gap-0.5',
    ellipsis:
      'pagination-ellipsis flex size-8 items-center justify-center text-muted-foreground',
    item: 'pagination-item',
    link: [
      'pagination-link inline-flex size-8 items-center justify-center gap-1 rounded-lg border text-sm',
      'select-none outline-none transition-colors',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:opacity-50',
      'border-transparent hover:bg-muted hover:text-foreground',
      'aria-[current=page]:border-border aria-[current=page]:bg-muted',
    ],
    navLink: [
      'pagination-nav-link inline-flex h-8 items-center justify-center gap-1 rounded-lg border text-sm',
      'select-none border-transparent px-2.5 outline-none transition-colors',
      'hover:bg-muted hover:text-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    root: 'pagination-root mx-auto flex w-full justify-center',
  },
})

const { root, content, item, link, navLink, ellipsis } = pagination()

function Pagination({ children, className }: PaginationProps) {
  return (
    <nav
      aria-label="pagination"
      className={root({
        className,
      })}
      data-testid="pagination-root"
    >
      {children}
    </nav>
  )
}

function PaginationContent({ children, className }: PaginationContentProps) {
  return (
    <ul
      className={content({
        className,
      })}
      data-testid="pagination-content"
    >
      {children}
    </ul>
  )
}

function PaginationItem({ children, className }: PaginationItemProps) {
  return (
    <li
      className={item({
        className,
      })}
      data-testid="pagination-item"
    >
      {children}
    </li>
  )
}

function PaginationLink(props: PaginationLinkProps) {
  const { isActive, href, className, disabled, onClick } = props
  return (
    <ButtonPrimitive
      aria-current={isActive ? 'page' : undefined}
      className={link({
        className,
      })}
      data-testid="pagination-link"
      disabled={disabled}
      onClick={onClick}
      render={
        href ? (
          <a
            aria-current={isActive ? 'page' : undefined}
            data-active={isActive}
            data-slot="pagination-link"
            {...props}
          />
        ) : undefined
      }
    ></ButtonPrimitive>
  )
}

function PaginationPrevious(props: PaginationPreviousProps) {
  const { href, text = 'Previous', className, disabled, onClick } = props
  return (
    <ButtonPrimitive
      aria-label="Go to previous page"
      className={navLink({
        className,
      })}
      data-testid="pagination-prev"
      disabled={disabled}
      onClick={onClick}
      render={
        href ? (
          <a
            data-slot="pagination-link"
            {...props}
          />
        ) : undefined
      }
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:block">{text}</span>
    </ButtonPrimitive>
  )
}

function PaginationNext(props: PaginationNextProps) {
  const { href, text = 'Next', className, disabled, onClick } = props
  return (
    <ButtonPrimitive
      aria-label="Go to next page"
      className={navLink({
        className,
      })}
      data-testid="pagination-next"
      disabled={disabled}
      onClick={onClick}
      render={
        href ? (
          <a
            data-slot="pagination-link"
            {...props}
          />
        ) : undefined
      }
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRight className="size-4" />
    </ButtonPrimitive>
  )
}

function PaginationEllipsis({ className }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      className={ellipsis({
        className,
      })}
      data-testid="pagination-ellipsis"
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
