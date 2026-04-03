// Dependencies: none (pure CSS grid utility)

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type GridProps = {
  cols?: GridCols // number of grid columns (grid-template-columns)
  gap?: GridGap // gap between grid items
}

export type GridItemSpan =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'full'

export type GridItemProps = {
  span?: GridItemSpan // how many columns this item spans (grid-column: span N)
}
