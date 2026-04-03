import { createContext } from 'react'

import type { ThemeContextState } from './theme-provider.types'

export const ThemeContext = createContext<ThemeContextState | undefined>(
  undefined,
)
