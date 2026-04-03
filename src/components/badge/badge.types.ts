// Dependencies: class-variance-authority (for variant styling)

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export type BadgeAlign = 'start' | 'center' | 'end'

export type BadgeProps = {
  variant?: BadgeVariant // visual style variant
  align?: BadgeAlign // text alignment inside the badge
  block?: boolean // makes badge full-width
  loading?: boolean // shows loading state
  asChild?: boolean // render as child element via Slot
  onClick?: React.MouseEventHandler<HTMLDivElement> // click handler
}
