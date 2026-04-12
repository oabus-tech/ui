import { useState } from 'react'

import { NumberField } from '@base-ui/react/number-field'
import { Popover } from '@base-ui/react/popover'
import { Minus, Plus } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

import type { NumberInputProps, NumberInputRangeValue } from './number-input.types'

const numberInput = tv({
  slots: {
    root: 'number-input-root relative flex w-full items-center',
    group: 'number-input-group flex w-full',
    field: [
      'number-input-field min-w-0 flex-1 rounded-lg border border-input bg-transparent',
      'px-2.5 py-1 text-base outline-none transition-colors md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
    ],
    stepper: [
      'number-input-stepper flex items-center rounded-lg border border-input',
      'overflow-hidden transition-colors',
      'has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
    ],
    stepperField: [
      'number-input-stepper-field min-w-0 w-24 border-none bg-transparent',
      'px-2.5 py-1 text-center text-base outline-none md:text-sm',
      'placeholder:text-muted-foreground',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    ],
    stepperBtn: [
      'number-input-stepper-btn flex h-full items-center border-input px-2',
      'pointer-events-auto bg-transparent text-muted-foreground transition-colors',
      'hover:bg-muted hover:text-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    rangeTrigger: [
      'number-input-range-trigger flex h-10 w-full cursor-pointer items-center justify-between',
      'rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      'data-placeholder:text-muted-foreground',
    ],
    rangePopup: [
      'number-input-range-popup z-50 w-64 origin-(--transform-origin) rounded-lg',
      'bg-popover p-3 shadow-md ring-1 ring-foreground/10',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    rangeFields: 'number-input-range-fields flex items-center gap-2',
    rangeLabel: 'number-input-range-label text-xs text-muted-foreground',
    rangeActions: 'number-input-range-actions mt-3 flex justify-end gap-2',
  },
  variants: {
    size: {
      sm: { field: 'h-9', stepper: 'h-9', rangeTrigger: 'h-9' },
      md: { field: 'h-10', stepper: 'h-10', rangeTrigger: 'h-10' },
      lg: { field: 'h-11', stepper: 'h-11', rangeTrigger: 'h-11' },
    },
  },
  defaultVariants: { size: 'md' },
})

function NumberInput(props: NumberInputProps) {
  const {
    root,
    group,
    field,
    stepper,
    stepperField,
    stepperBtn,
    rangeTrigger,
    rangePopup,
    rangeFields,
    rangeLabel,
    rangeActions,
  } = numberInput({ size: (props as { size?: 'sm' | 'md' | 'lg' }).size })

  if (props.mode === 'range') {
    return (
      <RangeNumberInput
        {...props}
        styles={{ rangeTrigger, rangePopup, rangeFields, rangeLabel, rangeActions }}
      />
    )
  }

  const { step, value, defaultValue, onChange, disabled, placeholder } = props as {
    step?: number
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    disabled?: boolean
    placeholder?: string
  }

  return (
    <div data-testid="number-input-root" className={root()}>
      <NumberField.Root
        value={value}
        defaultValue={defaultValue}
        step={step ?? 1}
        disabled={disabled}
        onValueChange={(val) => onChange?.(val ?? 0)}
        className={group()}
      >
        <NumberField.Group data-testid="number-input-group" className={stepper()}>
          <NumberField.Decrement
            data-testid="number-input-decrement"
            className={stepperBtn({ className: 'border-r' })}
          >
            <Minus size={14} />
          </NumberField.Decrement>
          <NumberField.Input
            data-testid="number-input-field"
            placeholder={placeholder}
            className={stepperField()}
          />
          <NumberField.Increment
            data-testid="number-input-increment"
            className={stepperBtn({ className: 'border-l' })}
          >
            <Plus size={14} />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </div>
  )
}

function RangeNumberInput({
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
  step,
  styles,
}: {
  value?: NumberInputRangeValue
  defaultValue?: NumberInputRangeValue
  onChange?: (value: NumberInputRangeValue) => void
  disabled?: boolean
  placeholder?: string
  step?: number
  styles: {
    rangeTrigger: () => string
    rangePopup: () => string
    rangeFields: () => string
    rangeLabel: () => string
    rangeActions: () => string
  }
}) {
  const isControlled = value !== undefined
  const [draft, setDraft] = useState<NumberInputRangeValue>(
    isControlled ? (value ?? {}) : (defaultValue ?? {}),
  )
  const [open, setOpen] = useState(false)

  const current = isControlled ? (value ?? {}) : draft

  const displayValue =
    current.from !== undefined || current.to !== undefined
      ? `${current.from ?? '–'} – ${current.to ?? '–'}`
      : ''

  const handleApply = () => {
    if (!isControlled) setDraft(draft)
    onChange?.(draft)
    setOpen(false)
  }

  const handleCancel = () => {
    setDraft(current)
    setOpen(false)
  }

  const handleOpen = (next: boolean) => {
    if (next) setDraft(current)
    setOpen(next)
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpen}>
      <Popover.Trigger
        data-testid="number-input-range-trigger"
        disabled={disabled}
        data-placeholder={!displayValue || undefined}
        className={styles.rangeTrigger()}
      >
        {displayValue || placeholder || 'Select range'}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="isolate z-50" sideOffset={4}>
          <Popover.Popup data-testid="number-input-range-popup" className={styles.rangePopup()}>
            <div className={styles.rangeFields()}>
              <div className="flex flex-1 flex-col gap-1">
                <span className={styles.rangeLabel()}>From</span>
                <NumberField.Root
                  value={draft.from}  
                  step={step ?? 1}
                  onValueChange={(val) => setDraft((d) => ({ ...d, from: val ?? undefined }))}
                >
                  <NumberField.Group className="flex rounded-lg border border-input overflow-hidden h-9">
                    <NumberField.Decrement className="flex items-center px-2 hover:bg-muted text-muted-foreground border-r border-input">
                      <Minus size={12} />
                    </NumberField.Decrement>
                    <NumberField.Input
                      data-testid="number-input-range-from"
                      className="min-w-0 flex-1 bg-transparent px-2 text-center text-sm outline-none"
                    />
                    <NumberField.Increment className="flex items-center px-2 hover:bg-muted text-muted-foreground border-l border-input">
                      <Plus size={12} />
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
              </div>
              <span className="mt-5 text-sm text-muted-foreground">–</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className={styles.rangeLabel()}>To</span>
                <NumberField.Root
                  value={draft.to}
                  step={step ?? 1}
                  onValueChange={(val) => setDraft((d) => ({ ...d, to: val ?? undefined }))}
                >
                  <NumberField.Group className="flex rounded-lg border border-input overflow-hidden h-9">
                    <NumberField.Decrement className="flex items-center px-2 hover:bg-muted text-muted-foreground border-r border-input">
                      <Minus size={12} />
                    </NumberField.Decrement>
                    <NumberField.Input
                      data-testid="number-input-range-to"
                      className="min-w-0 flex-1 bg-transparent px-2 text-center text-sm outline-none"
                    />
                    <NumberField.Increment className="flex items-center px-2 hover:bg-muted text-muted-foreground border-l border-input">
                      <Plus size={12} />
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
              </div>
            </div>
            <div className={styles.rangeActions()}>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export { NumberInput }
