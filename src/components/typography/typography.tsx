import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type { TypographyProps } from './typography.types'

const typography = tv({
  base: 'typography',
  defaultVariants: {
    size: 'base',
    variant: 'default',
    weight: 'normal',
  },
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
      true: 'inline-block max-w-full truncate',
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

function Typography({
  component: Component = 'span',
  size,
  variant,
  weight,
  truncate,
  children,
}: PropsWithChildren<TypographyProps>) {
  return (
    <Component
      className={typography({
        size,
        truncate,
        variant,
        weight,
      })}
      data-testid="typography"
    >
      {children}
    </Component>
  )
}

export { Typography }
