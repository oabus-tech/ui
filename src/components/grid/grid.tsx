import type { PropsWithChildren } from 'react'

import type { GridItemProps, GridProps } from './grid.types'

function GridRoot(_props: PropsWithChildren<GridProps>) {
  return <div></div>
}

function GridItem(_props: PropsWithChildren<GridItemProps>) {
  return <div></div>
}

const Grid = Object.assign(GridRoot, {
  Item: GridItem,
})

export { Grid }
