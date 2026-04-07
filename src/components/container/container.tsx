import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type { ContainerProps } from './container.types'

const styles = tv({
  base: 'w-full px-4',
  defaultVariants: {
    centered: true,
    maxWidth: 'xl',
  },
  variants: {
    centered: {
      true: 'mx-auto',
    },
    maxWidth: {
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
      lg: 'max-w-screen-lg',
      md: 'max-w-screen-md',
      sm: 'max-w-screen-sm',
      xl: 'max-w-screen-xl',
      xs: 'max-w-xs',
    },
    textAlign: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
  },
})

function Container(props: PropsWithChildren<ContainerProps>) {
  const { centered = true, children, maxWidth = 'xl', textAlign } = props

  return (
    <div
      className={styles({
        centered,
        maxWidth,
        textAlign,
      })}
    >
      {children}
    </div>
  )
}

export { Container }
