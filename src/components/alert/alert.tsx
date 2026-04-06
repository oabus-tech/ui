import { X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { tv } from 'tailwind-variants'

import type {
  AlertActionProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertProps,
  AlertTitleProps,
  AlertVariant,
} from './alert.types'

type AlertContextValue = {
  variant: AlertVariant
}

const AlertContext = createContext<AlertContextValue>({
  variant: 'default',
})

const styles = tv({
  defaultVariants: {
    variant: 'default',
  },
  slots: {
    action: 'col-start-2',
    closeButton:
      'absolute top-3 right-3 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none',
    description:
      'col-start-2 text-muted-foreground text-sm [&_p]:leading-relaxed',
    icon: 'col-start-1 row-start-1 [&>svg]:size-4 [&>svg]:translate-y-0.5',
    root: 'relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-0.5 rounded-lg border px-4 py-3 text-sm transition-[opacity,transform] duration-200',
    title: 'col-start-2 font-medium leading-none tracking-tight',
  },
  variants: {
    closing: {
      true: {
        root: '-translate-y-1 opacity-0',
      },
    },
    variant: {
      default: {
        icon: 'text-foreground',
        root: 'bg-card text-card-foreground',
      },
      destructive: {
        icon: 'text-destructive',
        root: 'border-destructive/50 text-destructive dark:border-destructive',
      },
    },
  },
})

function AlertRoot(props: PropsWithChildren<AlertProps>) {
  const { children, closable, onClose, variant = 'default' } = props
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(true)

  const s = styles({
    closing,
    variant,
  })

  function handleClose() {
    setClosing(true)
  }

  function handleTransitionEnd() {
    if (closing) {
      setMounted(false)
      onClose?.()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <AlertContext.Provider
      value={{
        variant,
      }}
    >
      <div
        className={s.root()}
        onTransitionEnd={handleTransitionEnd}
        role="alert"
      >
        {children}
        {closable && (
          <button
            aria-label="Fechar"
            className={s.closeButton()}
            onClick={handleClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </AlertContext.Provider>
  )
}

function AlertIcon({ children }: PropsWithChildren<AlertIconProps>) {
  const { variant } = useContext(AlertContext)
  const s = styles({
    variant,
  })

  return <span className={s.icon()}>{children}</span>
}

function AlertTitle({ children }: PropsWithChildren<AlertTitleProps>) {
  const s = styles()

  return <div className={s.title()}>{children}</div>
}

function AlertDescription({
  children,
}: PropsWithChildren<AlertDescriptionProps>) {
  const s = styles()

  return <div className={s.description()}>{children}</div>
}

function AlertAction({ children }: PropsWithChildren<AlertActionProps>) {
  const s = styles()

  return <div className={s.action()}>{children}</div>
}

const Alert = Object.assign(AlertRoot, {
  Action: AlertAction,
  Description: AlertDescription,
  Icon: AlertIcon,
  Title: AlertTitle,
})

export { Alert }
