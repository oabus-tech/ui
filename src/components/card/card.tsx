import type { PropsWithChildren } from 'react'

import { tv } from 'tailwind-variants'

import type { CardFooterProps, CardHeaderProps, CardProps } from './card.types'

const card = tv({
  slots: {
    root: 'card-root flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-card-foreground text-sm shadow-sm ring-1 ring-foreground/10',
    header:
      'card-header grid auto-rows-min items-start gap-1 px-4',
    title: 'card-title font-heading font-medium text-base leading-snug',
    description: 'card-description text-muted-foreground text-sm',
    content: 'card-content px-4',
    footer: 'card-footer flex items-center px-4',
    separator: 'card-separator border-t',
  },
  variants: {
    clickable: {
      true: {
        root: 'cursor-pointer transition-shadow hover:shadow-md',
      },
    },
    headerBordered: {
      true: {
        header: 'border-b pb-4',
      },
    },
    footerBordered: {
      true: {
        footer: 'border-t bg-muted/50 pt-4',
      },
    },
  },
})

function CardRoot({
  onClick,
  children,
}: PropsWithChildren<CardProps>) {
  const { root } = card({ clickable: !!onClick })

  return (
    <div
      data-testid="card-root"
      className={root()}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

function CardHeader({
  bordered,
  children,
}: PropsWithChildren<CardHeaderProps>) {
  const { header } = card({ headerBordered: bordered })

  return (
    <div data-testid="card-header" className={header()}>
      {children}
    </div>
  )
}

function CardTitle({ children }: PropsWithChildren) {
  const { title } = card()

  return (
    <div data-testid="card-title" className={title()}>
      {children}
    </div>
  )
}

function CardDescription({ children }: PropsWithChildren) {
  const { description } = card()

  return (
    <div data-testid="card-description" className={description()}>
      {children}
    </div>
  )
}

function CardContent({ children }: PropsWithChildren) {
  const { content } = card()

  return (
    <div data-testid="card-content" className={content()}>
      {children}
    </div>
  )
}

function CardFooter({
  bordered,
  children,
}: PropsWithChildren<CardFooterProps>) {
  const { footer } = card({ footerBordered: bordered })

  return (
    <div data-testid="card-footer" className={footer()}>
      {children}
    </div>
  )
}

function CardSeparator() {
  const { separator } = card()

  return <hr data-testid="card-separator" className={separator()} />
}

const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Separator: CardSeparator,
  Title: CardTitle,
})

export { Card }
