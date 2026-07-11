import type { PropsWithChildren } from 'react'

export const Theme = {
  Flow: 'flow',
  Mob: 'mob',
  Mono: 'mono',
  Nova: 'nova',
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

export type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme
}>

export type ThemeContextState = {
  theme: Theme
  changeTheme: (theme: Theme) => void
}
