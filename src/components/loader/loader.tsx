import { Loader2 } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { LoaderProps } from './loader.types'

const loader = tv({
  base: 'loader animate-spin text-muted-foreground',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

function Loader({ size }: LoaderProps) {
  return <Loader2 data-testid="loader" className={loader({ size })} />
}

export { Loader }
