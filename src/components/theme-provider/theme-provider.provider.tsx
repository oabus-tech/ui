import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

import { ThemeContext } from './theme-provider.context'
import { Theme, type ThemeProviderProps } from './theme-provider.types'

const STORAGE_KEY = 'oabus-theme'

function isTheme(value: string | null): value is Theme {
  return Object.values(Theme).some((theme) => theme === value)
}

export function ThemeProvider({
  children,
  defaultTheme = Theme.Mono,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) {
      return stored
    }
    return defaultTheme
  })

  const changeTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }, [])

  useLayoutEffect(() => {
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
