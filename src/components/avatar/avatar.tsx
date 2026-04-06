import { User } from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

import type { AvatarProps } from './avatar.types'

const styles = tv({
  defaultVariants: {
    size: 'md',
    variant: 'circle',
  },
  slots: {
    fallback:
      'flex h-full w-full items-center justify-center bg-muted text-muted-foreground',
    icon: 'size-[45%]',
    image: 'aspect-square h-full w-full object-cover',
    initials: 'select-none font-medium text-xs leading-none',
    root: 'relative inline-flex shrink-0 overflow-hidden',
  },
  variants: {
    size: {
      lg: {
        root: 'size-12',
      },
      md: {
        root: 'size-9',
      },
      sm: {
        root: 'size-7',
      },
    },
    variant: {
      circle: {
        root: 'rounded-full',
      },
      square: {
        root: 'rounded-md',
      },
    },
  },
})

function getInitials(alt?: string) {
  if (!alt) {
    return null
  }
  const parts = alt.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0]?.charAt(0).toUpperCase() ?? null
  }
  return (
    (parts[0]?.charAt(0).toUpperCase() ?? '') +
    (parts[parts.length - 1]?.charAt(0).toUpperCase() ?? '')
  )
}

function Avatar(props: AvatarProps) {
  const { alt, size = 'md', src, variant = 'circle' } = props
  const [error, setError] = useState(false)

  const s = styles({
    size,
    variant,
  })
  const initials = getInitials(alt)
  const showImage = src && !error

  return (
    <span className={s.root()}>
      {showImage ? (
        <img
          alt={alt}
          className={s.image()}
          onError={() => setError(true)}
          src={src}
        />
      ) : (
        <span className={s.fallback()}>
          {initials ? (
            <span className={s.initials()}>{initials}</span>
          ) : (
            <User className={s.icon()} />
          )}
        </span>
      )}
    </span>
  )
}

export { Avatar }
