import { tv } from 'tailwind-variants'

import type { SkeletonProps } from './skeleton.types'

const skeleton = tv({
  base: 'skeleton animate-pulse rounded-md bg-muted',
})

function Skeleton({ className }: SkeletonProps) {
  return <div data-testid="skeleton" className={skeleton({ className })} />
}

export { Skeleton }
