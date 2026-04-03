// Dependencies: none (pure CSS component with polymorphic rendering)

export type TypographySize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

export type TypographyVariant = 'default' | 'muted'

export type TypographyWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'

export type TypographyComponent =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'

export type TypographyProps = {
  component?: TypographyComponent // HTML element to render as (polymorphic)
  size?: TypographySize // font size preset
  variant?: TypographyVariant // color variant
  weight?: TypographyWeight // font weight
  truncate?: boolean // truncates text with ellipsis on overflow
}
