import type React from 'react'
import { useCallback } from 'react'

import { Confirm } from '@/components/confirm'
import type { ConfirmProps } from '@/components/confirm/confirm.types'

import { useDisclosure } from './use-disclosure'

export type UnsavedOptions = {
  confirm?: Omit<ConfirmProps, 'open' | 'onConfirm' | 'onClose'>
  unsaved?: boolean
  leaving?: boolean
  onProceed?: () => void
}

export type UseUnsavedReturn = [
  () => void,
  () => React.ReactNode,
]

export type UnsavedConfirmProps = {
  confirm?: UnsavedOptions['confirm']
  open?: boolean
  onConfirm?: () => void
  onClose?: () => void
}

function UnsavedConfirm({ confirm, ...props }: UnsavedConfirmProps) {
  return (
    <Confirm
      {...props}
      cancelText="Cancelar"
      confirmProps={{
        variant: 'destructive',
      }}
      confirmText="Sair"
      description="Você tem alterações não salvas. Tem certeza que deseja sair?"
      title="Alterações não salvas"
      {...confirm}
    />
  )
}

export function useUnsaved({
  confirm,
  unsaved,
  leaving,
  onProceed,
}: UnsavedOptions): UseUnsavedReturn {
  const { on, off, value } = useDisclosure()

  const unsavedHandler = useCallback(() => {
    if (unsaved && leaving) {
      on()

      return
    }

    onProceed?.()
    off()
  }, [
    unsaved,
    leaving,
    on,
    off,
    onProceed,
  ])

  return [
    unsavedHandler,
    () => (
      <UnsavedConfirm
        confirm={confirm}
        onClose={off}
        onConfirm={onProceed}
        open={value}
      />
    ),
  ]
}
