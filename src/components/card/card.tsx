import type { PropsWithChildren } from 'react'

import type { CardFooterProps, CardHeaderProps, CardProps } from './card.types'

function CardRoot(_props: PropsWithChildren<CardProps>) {
  return <div></div>
}

function CardHeader(_props: PropsWithChildren<CardHeaderProps>) {
  return <div></div>
}

function CardTitle(_props: PropsWithChildren) {
  return <div></div>
}

function CardDescription(_props: PropsWithChildren) {
  return <div></div>
}

function CardContent(_props: PropsWithChildren) {
  return <div></div>
}

function CardFooter(_props: PropsWithChildren<CardFooterProps>) {
  return <div></div>
}

function CardSeparator() {
  return <div></div>
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
