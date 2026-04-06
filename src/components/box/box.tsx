import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type { BoxProps } from './box.types'

const styles = tv({
  base: 'block',
  variants: {
    bg: {
      background: 'bg-background',
      card: 'bg-card',
      muted: 'bg-muted',
    },
    grow: {
      true: 'grow',
    },
    minHeight: {
      lg: 'min-h-64',
      md: 'min-h-32',
      screen: 'min-h-screen',
      sm: 'min-h-16',
    },
    overflow: {
      auto: 'overflow-auto',
      hidden: 'overflow-hidden',
      visible: 'overflow-visible',
    },
    padding: {
      lg: 'p-6',
      md: 'p-4',
      none: 'p-0',
      sm: 'p-3',
      xl: 'p-8',
      xs: 'p-2',
    },
    paddingX: {
      lg: 'px-6',
      md: 'px-4',
      none: 'px-0',
      sm: 'px-3',
      xl: 'px-8',
      xs: 'px-2',
    },
    paddingY: {
      lg: 'py-6',
      md: 'py-4',
      none: 'py-0',
      sm: 'py-3',
      xl: 'py-8',
      xs: 'py-2',
    },
    position: {
      absolute: 'absolute',
      relative: 'relative',
      static: 'static',
    },
    rounded: {
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded-md',
      none: 'rounded-none',
      sm: 'rounded-sm',
      xl: 'rounded-xl',
    },
    textAlign: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
    },
  },
})

function Box(props: PropsWithChildren<BoxProps>) {
  const {
    bg,
    children,
    grow,
    minHeight,
    overflow,
    padding,
    paddingX,
    paddingY,
    position,
    rounded,
    textAlign,
    width,
  } = props

  return (
    <div
      className={styles({
        bg,
        grow,
        minHeight,
        overflow,
        padding,
        paddingX,
        paddingY,
        position,
        rounded,
        textAlign,
        width,
      })}
    >
      {children}
    </div>
  )
}

export { Box }
