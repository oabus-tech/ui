import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardSeparatorProps,
  CardTitleProps,
} from './card.types'

const styles = tv({
  slots: {
    content: 'p-6 pt-0',
    description: 'text-muted-foreground text-sm',
    footer: 'flex items-center p-6 pt-0',
    header: 'flex flex-col gap-1.5 p-6',
    root: 'rounded-xl border bg-card text-card-foreground shadow-sm',
    separator: 'border-t',
    title: 'font-semibold text-xl leading-none tracking-tight',
  },
  variants: {
    footerBordered: {
      true: {
        footer: 'border-t pt-6',
      },
    },
    headerBordered: {
      true: {
        header: 'border-b',
      },
    },
    interactive: {
      true: {
        root: 'cursor-pointer transition-colors hover:bg-accent/50',
      },
    },
  },
})

function CardRoot(props: PropsWithChildren<CardProps>) {
  const { children, onClick } = props

  const s = styles({
    interactive: !!onClick,
  })

  return (
    <div
      className={s.root()}
      // onClick={onClick}
    >
      {children}
    </div>
  )
}

function CardHeader(props: PropsWithChildren<CardHeaderProps>) {
  const { bordered, children } = props

  const s = styles({
    headerBordered: bordered,
  })

  return <div className={s.header()}>{children}</div>
}

function CardTitle({ children }: PropsWithChildren<CardTitleProps>) {
  const s = styles()

  return <div className={s.title()}>{children}</div>
}

function CardDescription({
  children,
}: PropsWithChildren<CardDescriptionProps>) {
  const s = styles()

  return <p className={s.description()}>{children}</p>
}

function CardContent({ children }: PropsWithChildren<CardContentProps>) {
  const s = styles()

  return <div className={s.content()}>{children}</div>
}

function CardFooter(props: PropsWithChildren<CardFooterProps>) {
  const { bordered, children } = props

  const s = styles({
    footerBordered: bordered,
  })

  return <div className={s.footer()}>{children}</div>
}

function CardSeparator(_props: CardSeparatorProps) {
  const s = styles()

  return <hr className={s.separator()} />
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
