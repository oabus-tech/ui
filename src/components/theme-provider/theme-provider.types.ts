import type { PropsWithChildren } from 'react'

export type Theme = 'mono' | 'nova'

export type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme
}>

export type ThemeContextState = {
  theme: Theme
  changeTheme: (theme: Theme) => void
}
