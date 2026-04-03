import type { PropsWithChildren } from 'react'

import type {
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './modal.types'

function ModalRoot(_props: PropsWithChildren<ModalProps>) {
  return <div></div>
}

function ModalHeader(_props: PropsWithChildren<ModalHeaderProps>) {
  return <div></div>
}

function ModalHeaderTitle(_props: PropsWithChildren) {
  return <div></div>
}

function ModalHeaderDescription(_props: PropsWithChildren) {
  return <div></div>
}

function ModalBody(_props: PropsWithChildren) {
  return <div></div>
}

function ModalFooter(_props: PropsWithChildren<ModalFooterProps>) {
  return <div></div>
}

const Modal = Object.assign(ModalRoot, {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: Object.assign(ModalHeader, {
    Description: ModalHeaderDescription,
    Title: ModalHeaderTitle,
  }),
})

export { Modal }
