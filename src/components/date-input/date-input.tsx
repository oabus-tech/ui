import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Popover } from '@/components/popover'

import type { DateInputProps } from './date-input.types'

function DateInput({
  value,
  defaultValue,
  disabled,
  onChange,
  placeholder = 'dd/mm/yyyy',
  size,
  ...props
}: DateInputProps) {
  const [open, setOpen] = useState(false)
  const [internalDate, setInternalDate] = useState<Date | null | undefined>(
    defaultValue,
  )

  const isControlled = value !== undefined
  const selectedDate = isControlled ? value : internalDate

  const handleSelect = (date: Date | null) => {
    if (!isControlled) {
      setInternalDate(date)
    }
    onChange?.(date)
    setOpen(false)
  }

  const displayValue = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''

  return (
    <Popover
      align="start"
      content={
        <Calendar
          mode="single"
          onDateChange={handleSelect}
          selected={selectedDate}
          size={size}
        />
      }
      onOpenChange={setOpen}
      open={open}
      side="bottom"
    >
      <Input
        {...props}
        className="date-input-root"
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

export { DateInput }
