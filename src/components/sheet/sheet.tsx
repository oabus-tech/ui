import type { PropsWithChildren } from 'react'

import type {
  SheetFooterProps,
  SheetHeaderProps,
  SheetProps,
} from './sheet.types'

function SheetRoot(_props: PropsWithChildren<SheetProps>) {
  return <div></div>
}

function SheetHeader(_props: PropsWithChildren<SheetHeaderProps>) {
  return <div></div>
}

function SheetTitle(_props: PropsWithChildren) {
  return <div></div>
}

function SheetDescription(_props: PropsWithChildren) {
  return <div></div>
}

function SheetBody(_props: PropsWithChildren) {
  return <div></div>
}

function SheetFooter(_props: PropsWithChildren<SheetFooterProps>) {
  return <div></div>
}

const Sheet = Object.assign(SheetRoot, {
  Body: SheetBody,
  Footer: SheetFooter,
  Header: Object.assign(SheetHeader, {
    Description: SheetDescription,
    Title: SheetTitle,
  }),
})

export { Sheet }
