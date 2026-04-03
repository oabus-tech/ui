// Dependencies: @radix-ui/react-separator (or @base-ui equivalent)

export type SeparatorOrientation = 'horizontal' | 'vertical'

export type SeparatorProps = {
  orientation?: SeparatorOrientation // line direction
  decorative?: boolean // if true, not announced by screen readers
}
