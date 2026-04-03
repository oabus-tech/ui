// Dependencies: none (pure CSS component)

export type CardProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement> // makes card interactive/clickable
}

export type CardHeaderProps = {
  bordered?: boolean // adds bottom border to header
}

export type CardTitleProps = {}

export type CardDescriptionProps = {}

export type CardContentProps = {}

export type CardFooterProps = {
  bordered?: boolean // adds top border to footer
}

export type CardSeparatorProps = {}
