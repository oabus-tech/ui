import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type { TypographyProps } from './typography.types'

const styles = tv({
  base: 'text-foreground',
  variants: {
    size: {
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
      base: 'text-base',
      lg: 'text-lg',
      sm: 'text-sm',
      xl: 'text-xl',
      xs: 'text-xs',
    },
    truncate: {
      true: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
    },
    weight: {
      black: 'font-black',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      extralight: 'font-extralight',
      light: 'font-light',
      medium: 'font-medium',
      normal: 'font-normal',
      semibold: 'font-semibold',
      thin: 'font-thin',
    },
  },
})

function Typography(props: PropsWithChildren<TypographyProps>) {
  const {
    children,
    component: Tag = 'span',
    size,
    truncate,
    variant,
    weight,
  } = props

  return (
    <Tag
      className={styles({
        size,
        truncate,
        variant,
        weight,
      })}
    >
      {children}
    </Tag>
  )
}

export { Typography }
