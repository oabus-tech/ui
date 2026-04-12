import type { PropsWithChildren } from 'react'

import { tv } from 'tailwind-variants'

import type { LayoutHeaderProps } from './header.types'

const styles = tv({
  base: 'layout-header flex shrink-0 items-center px-4',
  defaultVariants: {
    size: 'md',
  },
  variants: {
    bordered: {
      true: 'border-b',
    },
    size: {
      lg: 'h-16',
      md: 'h-14',
      sm: 'h-10',
    },
    sticky: {
      true: 'sticky top-0 z-40',
    },
  },
})

function LayoutHeader({
  bordered,
  children,
  size,
  sticky,
}: PropsWithChildren<LayoutHeaderProps>) {
  return (
    <header
      className={styles({ bordered, size, sticky })}
      data-testid="layout-header"
    >
      {children}
    </header>
  )
}

export { LayoutHeader }
