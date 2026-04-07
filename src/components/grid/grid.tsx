import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type { GridItemProps, GridProps } from './grid.types'

const gridStyles = tv({
  base: 'grid',
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    },
    gap: {
      lg: 'gap-6',
      md: 'gap-4',
      none: 'gap-0',
      sm: 'gap-2',
      xl: 'gap-8',
      xs: 'gap-1',
    },
  },
})

const itemStyles = tv({
  base: '',
  variants: {
    span: {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12',
      full: 'col-span-full',
    },
  },
})

function GridRoot(props: PropsWithChildren<GridProps>) {
  const { children, cols, gap } = props

  return (
    <div
      className={gridStyles({
        cols,
        gap,
      })}
    >
      {children}
    </div>
  )
}

function GridItem(props: PropsWithChildren<GridItemProps>) {
  const { children, span } = props

  return (
    <div
      className={itemStyles({
        span,
      })}
    >
      {children}
    </div>
  )
}

const Grid = Object.assign(GridRoot, {
  Item: GridItem,
})

export { Grid }
