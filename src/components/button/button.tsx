import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { Loader2 } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { buttonShared } from './button.shared'
import type { ButtonProps } from './button.types'

function Button({
  children,
  variant,
  size,
  block,
  loading,
  disabled,
  leftSection,
  rightSection,
  type = 'button',
  form,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <ButtonPrimitive
      className={buttonShared({
        block,
        size,
        variant,
      })}
      data-slot="button"
      data-testid="button"
      disabled={disabled || loading}
      form={form}
      onClick={onClick}
      type={type}
    >
      {loading ? <Loader2 className="animate-spin" /> : leftSection}
      {children}
      {rightSection}
    </ButtonPrimitive>
  )
}

export { Button }
