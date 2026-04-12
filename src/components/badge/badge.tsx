import { Loader2 } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type { BadgeProps } from './badge.types'

const badge = tv({
  defaultVariants: {
    align: 'center',
    variant: 'default',
  },
  slots: {
    content: 'badge-content inline-flex items-center gap-1',
    root: [
      'badge-root relative inline-flex h-5 w-fit shrink-0 items-center justify-center',
      'gap-1 overflow-hidden rounded-full border border-transparent',
      'whitespace-nowrap px-2 py-0.5 font-medium text-xs transition-all',
      '[&>svg]:pointer-events-none [&>svg]:size-3',
    ],
  },
  variants: {
    align: {
      center: {
        root: 'justify-center',
      },
      end: {
        root: 'justify-end',
      },
      start: {
        root: 'justify-start',
      },
    },
    block: {
      true: {
        root: 'w-full',
      },
    },
    loading: {
      true: {
        content: 'invisible',
      },
    },
    variant: {
      default: {
        root: 'bg-primary text-primary-foreground',
      },
      destructive: {
        root: 'bg-destructive/10 text-destructive',
      },
      outline: {
        root: 'border-border text-foreground',
      },
      secondary: {
        root: 'bg-secondary text-secondary-foreground',
      },
    },
  },
})

function Badge({
  children,
  variant,
  align,
  block,
  loading,
  onClick,
}: PropsWithChildren<BadgeProps>) {
  const { root, content } = badge({
    align,
    block,
    loading,
    variant,
  })

  return (
    <span
      className={root({
        className: onClick ? 'cursor-pointer' : undefined,
      })}
      data-testid="badge"
      onClick={onClick}
    >
      <span
        className={content()}
        data-testid="badge-content"
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-3 animate-spin" />
        </span>
      )}
    </span>
  )
}

export { Badge }
