/**
 * TimeInput
 *
 * Masked time entry with HH:MM (or HH:MM:SS) format and optional min/max
 * bounds. Out-of-range values are clamped once the mask is filled. Composes
 * Input styling with react-imask.
 *
 * Behavior:
 * - Mask: HH:MM by default; HH:MM:SS when withSeconds is true
 * - Default leftSection renders a Clock icon (overridable)
 * - Empty input emits null in onChange
 * - On accept, fully-formed values outside [minTime, maxTime] are clamped
 *   to the nearest bound; partial values pass through unmodified
 *
 * Implementation:
 * - Wraps IMaskInput inside the shared Input wrapper (inputShared slots)
 * - minTime/maxTime expressed in the same format as value (HH:MM or HH:MM:SS)
 * - <TimeInput value={time} onChange={setTime} minTime="08:00" maxTime="22:00" />
 *
 * Dependencies: react-imask, Input (InputProps + inputShared), Loader,
 * lucide-react (Clock)
 */

import type { InputProps } from '@/components/input/input.types'

export type TimeInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'debounce'
> & {
  value?: string | null // controlled value (HH:MM or HH:MM:SS, null clears)
  defaultValue?: string | null // uncontrolled initial value
  onChange?: (value: string | null) => void // fires on accept (null when empty)
  withSeconds?: boolean // toggles HH:MM ↔ HH:MM:SS
  minTime?: string // lower bound, same format as value
  maxTime?: string // upper bound, same format as value
}
