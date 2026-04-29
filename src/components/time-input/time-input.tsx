import { Clock } from 'lucide-react'
import { IMaskInput } from 'react-imask'

import { Loader } from '@/components/loader'

import { DEFAULT_SECTION_WIDTH, inputShared } from '../input/input.shared'
import type { TimeInputProps } from './time-input.types'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function parseToSeconds(value: string, withSeconds: boolean): number | null {
  const pattern = withSeconds
    ? /^(\d{2}):(\d{2}):(\d{2})$/
    : /^(\d{2}):(\d{2})$/
  const match = pattern.exec(value)
  if (!match) {
    return null
  }
  const h = Number(match[1])
  const m = Number(match[2])
  const s = withSeconds ? Number(match[3]) : 0
  if (h > 23 || m > 59 || s > 59) {
    return null
  }
  return h * 3600 + m * 60 + s
}

function formatFromSeconds(total: number, withSeconds: boolean): string {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return withSeconds ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`
}

function clamp(
  value: string,
  withSeconds: boolean,
  minTime?: string,
  maxTime?: string,
): string {
  const seconds = parseToSeconds(value, withSeconds)
  if (seconds == null) {
    return value
  }
  let result = seconds
  if (minTime) {
    const minSec = parseToSeconds(minTime, withSeconds)
    if (minSec != null && result < minSec) {
      result = minSec
    }
  }
  if (maxTime) {
    const maxSec = parseToSeconds(maxTime, withSeconds)
    if (maxSec != null && result > maxSec) {
      result = maxSec
    }
  }
  return formatFromSeconds(result, withSeconds)
}

function TimeInput({
  size,
  value,
  defaultValue,
  leftSection,
  leftSectionWidth = DEFAULT_SECTION_WIDTH,
  rightSection,
  rightSectionWidth = DEFAULT_SECTION_WIDTH,
  loading,
  rootClassName,
  className,
  onChange,
  withSeconds = false,
  minTime,
  maxTime,
  placeholder,
  ...props
}: TimeInputProps) {
  const mask = withSeconds ? '00:00:00' : '00:00'
  const fallbackPlaceholder = withSeconds ? 'HH:MM:SS' : 'HH:MM'

  const effectiveLeft = leftSection ? <Clock size={14} /> : null
  const effectiveRight = loading ? <Loader size="sm" /> : rightSection
  const hasLeft = Boolean(effectiveLeft)
  const hasRight = Boolean(effectiveRight)

  const { root, field, section } = inputShared({
    size,
  })

  function handleAccept(val: string) {
    if (val === '') {
      onChange?.(null)
      return
    }
    const next = clamp(val, withSeconds, minTime, maxTime)
    onChange?.(next)
  }

  return (
    <div
      className={root({
        className: rootClassName,
      })}
      data-testid="time-input-root"
    >
      {hasLeft && (
        <span
          className={section({
            className: 'pointer-events-auto left-0 justify-center',
          })}
          data-testid="time-input-section-left"
          style={{
            width: leftSectionWidth,
          }}
        >
          {effectiveLeft}
        </span>
      )}
      <IMaskInput
        {...(props as object)}
        className={field({
          className,
        })}
        data-testid="time-input-field"
        defaultValue={defaultValue ?? undefined}
        mask={mask}
        onAccept={handleAccept}
        placeholder={placeholder ?? fallbackPlaceholder}
        style={{
          ...(hasLeft
            ? {
                paddingLeft: leftSectionWidth,
              }
            : {}),
          ...(hasRight
            ? {
                paddingRight: rightSectionWidth,
              }
            : {}),
        }}
        value={value ?? ''}
      />
      {hasRight && (
        <span
          className={section({
            className: 'right-0 justify-center',
          })}
          data-testid="time-input-section-right"
          style={{
            width: rightSectionWidth,
          }}
        >
          {effectiveRight}
        </span>
      )}
    </div>
  )
}

export { TimeInput }
