import { ColorSchemeProvider } from '@/components/color-scheme-provider'
import { Theme, ThemeProvider } from '@/components/theme-provider'
import { Toast } from '@/components/toast'

import type { OABusProviderProps } from './oabus-provider.types'

export function OABusProvider({
  children,
  theme = Theme.Mono,
  defaultColorScheme,
}: OABusProviderProps) {
  return (
    <ThemeProvider defaultTheme={theme}>
      <ColorSchemeProvider defaultColorScheme={defaultColorScheme}>
        {children}
        <Toast />
      </ColorSchemeProvider>
    </ThemeProvider>
  )
}
