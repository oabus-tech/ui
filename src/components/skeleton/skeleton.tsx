import { tv } from 'tailwind-variants'

import type { SkeletonProps } from './skeleton.types'

const skeleton = tv({
  base: 'skeleton animate-pulse rounded-md bg-muted',
})

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={skeleton({
        className,
      })}
      data-testid="skeleton"
    />
  )
}

export { Skeleton }
