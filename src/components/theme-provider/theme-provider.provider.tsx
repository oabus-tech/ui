import { useCallback, useEffect, useMemo, useState } from 'react'

import { ThemeContext } from './theme-provider.context'
import type { Theme, ThemeProviderProps } from './theme-provider.types'

const STORAGE_KEY = 'oabus-theme'

export function ThemeProvider({
  children,
  defaultTheme = 'mono',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'mono' || stored === 'nova') {
      return stored
    }
    return defaultTheme
  })

  const changeTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [
    theme,
  ])

  const value = useMemo(
    () => ({
      changeTheme,
      theme,
    }),
    [
      theme,
      changeTheme,
    ],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
