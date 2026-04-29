import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { format } from 'date-fns'
import { CalendarIcon, Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Popover } from '@/components/popover'
import { TimeInput } from '@/components/time-input'

import type { DateTimeInputProps } from './date-time-input.types'

const FULL_TIME_RE = /^\d{2}:\d{2}(:\d{2})?$/

function applyTime(date: Date, hhmmss: string): Date {
  const parts = hhmmss.split(':')
  const h = Number(parts[0]) || 0
  const m = Number(parts[1]) || 0
  const s = parts[2] ? Number(parts[2]) || 0 : 0
  const next = new Date(date)
  next.setHours(h, m, s, 0)
  return next
}

function DateTimeInput({
  value,
  defaultValue,
  defaultTime,
  withSeconds = false,
  valueFormat,
  disabled,
  onChange,
  placeholder,
  size,
  minDate,
  maxDate,
  minTime,
  maxTime,
  ...props
}: DateTimeInputProps) {
  const resolvedDefaultTime =
    defaultTime ?? (withSeconds ? '00:00:00' : '00:00')
  const resolvedFormat =
    valueFormat ?? (withSeconds ? 'dd/MM/yyyy HH:mm:ss' : 'dd/MM/yyyy HH:mm')
  const resolvedPlaceholder =
    placeholder ?? (withSeconds ? 'dd/mm/yyyy hh:mm:ss' : 'dd/mm/yyyy hh:mm')

  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<Date | null | undefined>(
    defaultValue,
  )

  const isControlled = value !== undefined
  const committedValue: Date | null =
    (isControlled ? value : internalValue) ?? null

  const [timeString, setTimeString] = useState<string>(() =>
    committedValue
      ? format(committedValue, withSeconds ? 'HH:mm:ss' : 'HH:mm')
      : '',
  )

  const timeWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (committedValue) {
      setTimeString(format(committedValue, withSeconds ? 'HH:mm:ss' : 'HH:mm'))
    } else {
      setTimeString('')
    }
  }, [
    committedValue,
    withSeconds,
  ])

  const commit = (next: Date | null) => {
    if (!isControlled) {
      setInternalValue(next)
    }
    onChange?.(next)
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      commit(null)
      return
    }
    const candidate = timeString || resolvedDefaultTime
    const useTime = FULL_TIME_RE.test(candidate)
      ? candidate
      : resolvedDefaultTime
    commit(applyTime(date, useTime))
    requestAnimationFrame(() => {
      const firstSegment = timeWrapperRef.current?.querySelector('input')
      firstSegment?.focus()
    })
  }

  const handleTimeChange = (next: string | null) => {
    setTimeString(next ?? '')
    if (next === null) {
      return
    }
    if (!committedValue) {
      return
    }
    commit(applyTime(committedValue, next))
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    commit(null)
    setTimeString('')
  }

  const handleTimeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setOpen(false)
    }
  }

  const displayValue = committedValue
    ? format(committedValue, resolvedFormat)
    : ''

  return (
    <Popover
      align="start"
      content={
        <div className="flex flex-col gap-3">
          <Calendar
            maxDate={maxDate}
            minDate={minDate}
            mode="single"
            onDateChange={handleDateChange}
            selected={committedValue}
            size={size}
          />
          <div
            className="flex items-stretch gap-2 border-border border-t pt-3"
            ref={timeWrapperRef}
          >
            <TimeInput
              className="flex-1"
              maxTime={maxTime}
              minTime={minTime}
              onChange={handleTimeChange}
              onKeyDown={handleTimeKeyDown}
              size={size}
              value={timeString || null}
              withSeconds={withSeconds}
            />
            <ButtonPrimitive
              aria-label="Confirm"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => setOpen(false)}
              type="button"
            >
              <Check className="size-4" />
            </ButtonPrimitive>
          </div>
        </div>
      }
      onOpenChange={setOpen}
      open={open}
      side="bottom"
    >
      <Input
        {...props}
        className="date-time-input-root"
        disabled={disabled}
        leftSection={<CalendarIcon className="size-4" />}
        onClick={() => !disabled && setOpen(true)}
        placeholder={resolvedPlaceholder}
        readOnly
        rightSection={
          <button
            className={`cursor-pointer text-muted-foreground hover:text-foreground ${committedValue && !disabled ? 'visible' : 'invisible'}`}
            onClick={handleClear}
            tabIndex={committedValue && !disabled ? 0 : -1}
            type="button"
          >
            <X className="size-4" />
          </button>
        }
        size={size}
        value={displayValue}
      />
    </Popover>
  )
}

export { DateTimeInput }
