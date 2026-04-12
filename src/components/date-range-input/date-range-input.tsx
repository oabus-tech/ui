import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Popover } from '@/components/popover'

import type { DateRange, DateRangeInputProps } from './date-range-input.types'

function formatRange(range: DateRange | null | undefined): string {
  if (!range) {
    return ''
  }
  const { from, to } = range
  if (from && to) {
    return `${format(from, 'dd/MM/yyyy')} ~ ${format(to, 'dd/MM/yyyy')}`
  }
  if (from) {
    return format(from, 'dd/MM/yyyy')
  }
  return ''
}

function DateRangeInput({
  value,
  defaultValue,
  disabled,
  onChange,
  placeholder = 'dd/mm/yyyy ~ dd/mm/yyyy',
  size,
  ...props
}: DateRangeInputProps) {
  const [open, setOpen] = useState(false)
  const [internalRange, setInternalRange] = useState<
    DateRange | null | undefined
  >(defaultValue)

  const isControlled = value !== undefined
  const selectedRange = isControlled ? value : internalRange

  const handleSelect = (
    range: { from?: Date; to?: Date } | null,
  ) => {
    if (!isControlled) {
      setInternalRange(range)
    }
    onChange?.(range)
  }

  const displayValue = formatRange(selectedRange)

  return (
    <Popover
      align="start"
      content={
        <Calendar
          mode="range"
          onDateChange={handleSelect}
          selected={selectedRange}
          size={size}
        />
      }
      onOpenChange={setOpen}
      open={open}
      side="bottom"
    >
      <Input
        {...props}
        className="date-range-input-root"
        disabled={disabled}
        leftSection={<CalendarIcon className="size-4" />}
        onClick={() => !disabled && setOpen(true)}
        placeholder={placeholder}
        readOnly
        size={size}
        value={displayValue}
      />
    </Popover>
  )
}

export { DateRangeInput }
