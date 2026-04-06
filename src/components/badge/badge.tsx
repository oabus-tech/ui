import { Loader2 } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { cloneElement, isValidElement } from 'react'
import { tv } from 'tailwind-variants'

import type { BadgeProps } from './badge.types'

const styles = tv({
  defaultVariants: {
    align: 'start',
    variant: 'default',
  },
  slots: {
    content: '',
    root: 'relative inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs transition-colors focus:outline-none',
    spinner: 'absolute inset-0 flex items-center justify-center',
    spinnerIcon: 'size-3 animate-spin',
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
        root: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      },
      destructive: {
        root: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
      outline: {
        root: 'text-foreground',
      },
      secondary: {
        root: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
})

function Badge(props: PropsWithChildren<BadgeProps>) {
  const { align, asChild, block, children, loading, onClick, variant } = props

  const s = styles({
    align,
    block,
    loading,
    variant,
  })

  const content = (
    <>
      <span className={s.content()}>{children}</span>
      {loading && (
        <span className={s.spinner()}>
          <Loader2 className={s.spinnerIcon()} />
        </span>
      )}
    </>
  )

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<{
        className?: string
        onClick?: React.MouseEventHandler
      }>,
      {
        className: s.root(),
        onClick,
      },
    )
  }

  return <div className={s.root()}>{content}</div>
}

export { Badge }
