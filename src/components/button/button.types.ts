// Dependencies: @base-ui/react (Button primitive), class-variance-authority (variant styling)

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'dashed'
  | 'secondary'
  | 'ghost'
  | 'link'

export type ButtonProps = {
  form?: string // associates button with a form by id
  type?: ButtonType // HTML button type attribute
  size?: ButtonSize // visual size variant
  variant?: ButtonVariant // visual style variant
  leftSection?: React.ReactNode // element rendered before label (e.g. icon)
  rightSection?: React.ReactNode // element rendered after label (e.g. icon)
  block?: boolean // makes button full-width
  loading?: boolean // shows loading spinner and disables interaction
  disabled?: boolean // prevents interaction
  asChild?: boolean // render as child element via Slot
  onClick?: React.MouseEventHandler<HTMLButtonElement> // click handler
}
