// Dependencies: @radix-ui/react-avatar (or @base-ui equivalent)

export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarVariant = 'circle' | 'square'

export type AvatarProps = {
  src?: string | null // image URL
  alt?: string // alt text for the image
  size?: AvatarSize // controls rendered dimensions
  variant?: AvatarVariant // circle or square shape via border-radius
}
