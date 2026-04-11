import type { PropsWithChildren } from 'react'

import { Loader2 } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { BadgeProps } from './badge.types'

const badge = tv({
  slots: {
    root: [
      'badge-root relative inline-flex h-5 w-fit shrink-0 items-center justify-center',
      'gap-1 overflow-hidden rounded-full border border-transparent',
      'px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all',
      '[&>svg]:pointer-events-none [&>svg]:size-3',
    ],
    content: 'badge-content inline-flex items-center gap-1',
  },
  variants: {
    variant: {
      default: { root: 'bg-primary text-primary-foreground' },
      secondary: { root: 'bg-secondary text-secondary-foreground' },
      destructive: { root: 'bg-destructive/10 text-destructive' },
      outline: { root: 'border-border text-foreground' },
    },
    align: {
      start: { root: 'justify-start' },
      center: { root: 'justify-center' },
      end: { root: 'justify-end' },
    },
    block: {
      true: { root: 'w-full' },
    },
    loading: {
      true: { content: 'invisible' },
    },
  },
  defaultVariants: { variant: 'default', align: 'center' },
})

function Badge({
  children,
  variant,
  align,
  block,
  loading,
  onClick,
}: PropsWithChildren<BadgeProps>) {
  const { root, content } = badge({ variant, align, block, loading })

  return (
    <span data-testid="badge" className={root()} onClick={onClick}>
      <span data-testid="badge-content" className={content()}>
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
