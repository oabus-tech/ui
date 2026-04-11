/**
 * Pagination
 *
 * Compound component for page navigation.
 * Compose with PaginationContent, PaginationItem, PaginationLink,
 * PaginationPrevious, PaginationNext, and PaginationEllipsis.
 *
 * Usage:
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
 *     <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationEllipsis /></PaginationItem>
 *     <PaginationItem><PaginationNext href="#" /></PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 *
 * Dependencies: @base-ui/react/button, lucide-react
 */

export type PaginationProps = {
  children?: React.ReactNode
  className?: string
}

export type PaginationContentProps = {
  children?: React.ReactNode
  className?: string
}

export type PaginationItemProps = {
  children?: React.ReactNode
  className?: string
}

export type PaginationLinkProps = {
  isActive?: boolean
  href?: string
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export type PaginationPreviousProps = {
  href?: string
  text?: string
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export type PaginationNextProps = {
  href?: string
  text?: string
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export type PaginationEllipsisProps = {
  className?: string
}
