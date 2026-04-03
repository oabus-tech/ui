import { useContext } from 'react'

import { ThemeContext } from './theme-provider.context'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within an OABusProvider')
  }

  return context
}
