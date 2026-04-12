import type { PropsWithChildren } from 'react'

import { tv } from 'tailwind-variants'

import type { TypographyProps } from './typography.types'

const typography = tv({
  base: 'typography',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    truncate: {
      true: 'truncate',
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'default',
    weight: 'normal',
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
      data-testid="typography"
      className={typography({ size, variant, weight, truncate })}
    >
      {children}
    </Component>
  )
}

export { Typography }
