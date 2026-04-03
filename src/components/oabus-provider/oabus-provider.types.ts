import type { PropsWithChildren } from 'react'

import type { ColorScheme } from '@/components/color-scheme-provider/color-scheme-provider.types'
import type { Theme } from '@/components/theme-provider/theme-provider.types'

export type OABusProviderProps = PropsWithChildren<{
  theme?: Theme
  defaultColorScheme?: ColorScheme
}>
