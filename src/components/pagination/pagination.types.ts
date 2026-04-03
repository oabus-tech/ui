// Dependencies: lucide-react (for navigation icons)

type OffsetPaginationProps = {
  mode: 'offset' // traditional page-based pagination
  page: number // current page number (required)
  rowsPerPage: number // items per page (required)
  total: number // total item count (required)
  onPageChange: (page: number) => void // fires on page navigation
  onRowsPerPageChange: (rowsPerPage: number) => void // fires on rows-per-page change
}

type CursorPaginationProps = {
  mode: 'cursor' // cursor-based pagination (for infinite/API-driven)
  rowsPerPage: number // items per page
  hasPreviousPage?: boolean // enables previous button
  hasNextPage?: boolean // enables next button
  onPreviousPage?: () => void // fires on previous navigation
  onNextPage?: () => void // fires on next navigation
  onRowsPerPageChange?: (rowsPerPage: number) => void // fires on rows-per-page change
}

export type PaginationProps = OffsetPaginationProps | CursorPaginationProps
