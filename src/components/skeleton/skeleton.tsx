import { tv } from 'tailwind-variants'

import type { SkeletonProps } from './skeleton.types'

const styles = tv({
  slots: {
    root: 'animate-pulse rounded-md bg-muted',
  },
})

function Skeleton({ className }: SkeletonProps) {
  const s = styles()

  return (
    <div
      className={s.root({
        class: className,
      })}
    />
  )
}

export { Skeleton }
