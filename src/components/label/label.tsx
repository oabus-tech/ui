import { InfoIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { LabelProps } from './label.types'

const styles = tv({
  slots: {
    icon: 'size-3.5 cursor-help text-muted-foreground',
    optional: 'font-normal text-muted-foreground text-xs',
    required: 'text-destructive',
    root: 'flex select-none items-center gap-1.5 font-medium text-sm leading-none',
  },
  variants: {
    disabled: {
      true: {
        root: 'pointer-events-none opacity-50',
      },
    },
  },
})

function Label(props: React.PropsWithChildren<LabelProps>) {
  const { children, disabled, htmlFor, optional, required, tooltip } = props
  const s = styles({
    disabled,
  })

  const content = (
    <>
      {children}
      {required && <span className={s.required()}>*</span>}
      {optional && <span className={s.optional()}>(opcional)</span>}
      {tooltip && <InfoIcon className={s.icon()} />}
    </>
  )

  if (htmlFor) {
    return (
      <label
        className={s.root()}
        htmlFor={htmlFor}
      >
        {content}
      </label>
    )
  }

  return <span className={s.root()}>{content}</span>
}

export { Label }
