// Dependencies: none

export type LayoutHeaderSize = 'sm' | 'md' | 'lg'

export type LayoutHeaderProps = {
  bordered?: boolean // adds bottom border
  sticky?: boolean // makes header sticky at top
  size?: LayoutHeaderSize // controls header height
}
