// Dependencies: @/components/modal (for dialog), @/components/button (ButtonProps for action buttons)

import type { ButtonProps } from '@/components/button/button.types'

export type ConfirmProps = {
  open?: boolean // controlled visibility
  title: string // confirm dialog title (required)
  description: string // confirm dialog message (required)
  confirmText?: string // custom confirm button text
  cancelText?: string // custom cancel button text
  confirmProps?: Omit<ButtonProps, 'loading' | 'onClick'> // confirm button style overrides
  cancelProps?: Omit<ButtonProps, 'loading' | 'onClick'> // cancel button style overrides
  onConfirm?: () => void // fires when confirm is clicked
  onCancel?: () => void // fires when cancel is clicked
  onClose?: () => void // fires when dialog is closed (any method)
}
