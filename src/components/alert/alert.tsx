import type { PropsWithChildren } from 'react'

import type { AlertProps } from './alert.types'

function AlertRoot(_props: PropsWithChildren<AlertProps>) {
  return <div></div>
}

function AlertIcon(_props: PropsWithChildren) {
  return <div></div>
}

function AlertTitle(_props: PropsWithChildren) {
  return <div></div>
}

function AlertDescription(_props: PropsWithChildren) {
  return <div></div>
}

function AlertAction(_props: PropsWithChildren) {
  return <div></div>
}

const Alert = Object.assign(AlertRoot, {
  Action: AlertAction,
  Description: AlertDescription,
  Icon: AlertIcon,
  Title: AlertTitle,
})

export { Alert }
