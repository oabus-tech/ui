import { Loader2 } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { cloneElement, isValidElement } from 'react'
import { tv } from 'tailwind-variants'

import type { ButtonProps } from './button.types'

const styles = tv({
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  slots: {
    leftSection: '',
    rightSection: '',
    root: 'relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    spinner: 'animate-spin',
  },
  variants: {
    block: {
      true: {
        root: 'w-full',
      },
    },
    size: {
      'icon-lg': {
        root: 'size-10',
        spinner: 'size-5',
      },
      'icon-md': {
        root: 'size-9',
        spinner: 'size-4',
      },
      'icon-sm': {
        root: 'size-8',
        spinner: 'size-4',
      },
      lg: {
        root: 'h-10 px-6 text-base',
        spinner: 'size-5',
      },
      md: {
        root: 'h-9 px-4',
        spinner: 'size-4',
      },
      sm: {
        root: 'h-8 px-3 text-xs',
        spinner: 'size-3',
      },
    },
    variant: {
      dashed:
        'border border-input border-dashed bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
      default: {
        root: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      },
      destructive: {
        root: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      },
      ghost: {
        root: 'hover:bg-accent hover:text-accent-foreground',
      },
      link: {
        root: 'text-primary underline-offset-4 hover:underline',
      },
      outline: {
        root: 'border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      secondary: {
        root: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      },
    },
  },
})

function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    asChild,
    block,
    children,
    disabled,
    form,
    leftSection,
    loading,
    onClick,
    rightSection,
    size = 'md',
    type = 'button',
    variant,
  } = props

  const s = styles({
    block,
    size,
    variant,
  })

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<{
        className?: string
      }>,
      {
        className: s.root(),
      },
    )
  }

  return (
    <button
      className={s.root()}
      disabled={disabled || loading}
      form={form}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <Loader2 className={s.spinner()} />
      ) : (
        leftSection && <span className={s.leftSection()}>{leftSection}</span>
      )}
      {children}
      {rightSection && <span className={s.rightSection()}>{rightSection}</span>}
    </button>
  )
}

export { Button }
