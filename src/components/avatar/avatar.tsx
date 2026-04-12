import type { PropsWithChildren } from 'react'

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { tv } from 'tailwind-variants'

import type { AvatarProps } from './avatar.types'

const avatar = tv({
  slots: {
    root: 'avatar-root relative flex shrink-0 select-none overflow-hidden',
    image: 'avatar-image aspect-square size-full object-cover',
    fallback:
      'avatar-fallback flex size-full items-center justify-center bg-muted text-muted-foreground',
  },
  variants: {
    size: {
      sm: { root: 'size-7', fallback: 'text-xs' },
      md: { root: 'size-9', fallback: 'text-sm' },
      lg: { root: 'size-12', fallback: 'text-base' },
    },
    variant: {
      circle: { root: 'rounded-full', image: 'rounded-full', fallback: 'rounded-full' },
      square: { root: 'rounded-md', image: 'rounded-md', fallback: 'rounded-md' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'circle',
  },
})

function Avatar({
  src,
  alt,
  size,
  variant,
  children,
}: PropsWithChildren<AvatarProps>) {
  const { root, image, fallback } = avatar({ size, variant })

  return (
    <AvatarPrimitive.Root data-testid="avatar-root" className={root()}>
      {src && (
        <AvatarPrimitive.Image
          data-testid="avatar-image"
          className={image()}
          src={src}
          alt={alt}
        />
      )}
      <AvatarPrimitive.Fallback
        data-testid="avatar-fallback"
        className={fallback()}
      >
        {children}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { Avatar }
