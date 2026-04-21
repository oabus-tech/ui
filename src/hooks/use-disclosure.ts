import { useCallback, useState } from 'react'

export type UseDisclosureReturn = {
  value: boolean
  on: () => void
  off: () => void
  toggle: () => void
}

export function useDisclosure(initial = false): UseDisclosureReturn {
  const [value, setValue] = useState(initial)

  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((v) => !v), [])

  return {
    off,
    on,
    toggle,
    value,
  }
}
