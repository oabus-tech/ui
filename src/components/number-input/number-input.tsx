import { NumberField } from '@base-ui/react/number-field'
import { Popover } from '@base-ui/react/popover'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

import type {
  NumberInputProps,
  NumberInputRangeValue,
} from './number-input.types'

const numberInput = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    field: [
      'number-input-field min-w-0 flex-1 rounded-lg border border-input bg-transparent',
      'px-2.5 py-1 text-base outline-none transition-colors md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
    ],
    group: 'number-input-group flex w-full',
    rangeActions: 'number-input-range-actions mt-3 flex justify-end gap-2',
    rangeFields: 'number-input-range-fields flex items-center gap-2',
    rangeLabel: 'number-input-range-label text-muted-foreground text-xs',
    rangePopup: [
      'number-input-range-popup z-50 w-64 origin-(--transform-origin) rounded-lg',
      'bg-popover p-3 shadow-md ring-1 ring-foreground/10',
      'data-open:fade-in-0 data-open:zoom-in-95 duration-100 data-open:animate-in',
      'data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out',
    ],
    rangeTrigger: [
      'number-input-range-trigger flex h-10 w-full cursor-pointer items-center justify-between',
      'rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      'data-placeholder:text-muted-foreground',
    ],
    root: 'number-input-root relative flex w-full items-center',
    stepper: [
      'number-input-stepper flex items-center rounded-lg border border-input',
      'overflow-hidden transition-colors',
      'has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
    ],
    stepperBtn: [
      'number-input-stepper-btn flex h-full items-center border-input px-2',
      'pointer-events-auto bg-transparent text-muted-foreground transition-colors',
      'hover:bg-muted hover:text-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    stepperField: [
      'number-input-stepper-field w-24 min-w-0 border-none bg-transparent',
      'px-2.5 py-1 text-center text-base outline-none md:text-sm',
      'placeholder:text-muted-foreground',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    ],
  },
  variants: {
    size: {
      lg: {
        field: 'h-11',
        rangeTrigger: 'h-11',
        stepper: 'h-11',
      },
      md: {
        field: 'h-10',
        rangeTrigger: 'h-10',
        stepper: 'h-10',
      },
      sm: {
        field: 'h-9',
        rangeTrigger: 'h-9',
        stepper: 'h-9',
      },
    },
  },
})

function NumberInput(props: NumberInputProps) {
  const {
    root,
    group,
    stepper,
    stepperField,
    stepperBtn,
    rangeTrigger,
    rangePopup,
    rangeFields,
    rangeLabel,
    rangeActions,
  } = numberInput({
    size: (
      props as {
        size?: 'sm' | 'md' | 'lg'
      }
    ).size,
  })

  if (props.mode === 'range') {
    return (
      <RangeNumberInput
        {...props}
        styles={{
          rangeActions,
          rangeFields,
          rangeLabel,
          rangePopup,
          rangeTrigger,
        }}
      />
    )
  }

  const { step, value, defaultValue, onChange, disabled, placeholder } =
    props as {
      step?: number
      value?: number
      defaultValue?: number
      onChange?: (value: number) => void
      disabled?: boolean
      placeholder?: string
    }

  return (
    <div
      className={root()}
      data-testid="number-input-root"
    >
      <NumberField.Root
        className={group()}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={(val) => onChange?.(val ?? 0)}
        step={step ?? 1}
        value={value}
      >
        <NumberField.Group
          className={stepper()}
          data-testid="number-input-group"
        >
          <NumberField.Decrement
            className={stepperBtn({
              className: 'border-r',
            })}
            data-testid="number-input-decrement"
          >
            <Minus size={14} />
          </NumberField.Decrement>
          <NumberField.Input
            className={stepperField()}
            data-testid="number-input-field"
            placeholder={placeholder}
          />
          <NumberField.Increment
            className={stepperBtn({
              className: 'border-l',
            })}
            data-testid="number-input-increment"
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
    if (!isControlled) {
      setDraft(draft)
    }
    onChange?.(draft)
    setOpen(false)
  }

  const handleCancel = () => {
    setDraft(current)
    setOpen(false)
  }

  const handleOpen = (next: boolean) => {
    if (next) {
      setDraft(current)
    }
    setOpen(next)
  }

  return (
    <Popover.Root
      onOpenChange={handleOpen}
      open={open}
    >
      <Popover.Trigger
        className={styles.rangeTrigger()}
        data-placeholder={!displayValue || undefined}
        data-testid="number-input-range-trigger"
        disabled={disabled}
      >
        {displayValue || placeholder || 'Select range'}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          className="isolate z-50"
          sideOffset={4}
        >
          <Popover.Popup
            className={styles.rangePopup()}
            data-testid="number-input-range-popup"
          >
            <div className={styles.rangeFields()}>
              <div className="flex flex-1 flex-col gap-1">
                <span className={styles.rangeLabel()}>From</span>
                <NumberField.Root
                  onValueChange={(val) =>
                    setDraft((d) => ({
                      ...d,
                      from: val ?? undefined,
                    }))
                  }
                  step={step ?? 1}
                  value={draft.from}
                >
                  <NumberField.Group className="flex h-9 overflow-hidden rounded-lg border border-input">
                    <NumberField.Decrement className="flex items-center border-input border-r px-2 text-muted-foreground hover:bg-muted">
                      <Minus size={12} />
                    </NumberField.Decrement>
                    <NumberField.Input
                      className="min-w-0 flex-1 bg-transparent px-2 text-center text-sm outline-none"
                      data-testid="number-input-range-from"
                    />
                    <NumberField.Increment className="flex items-center border-input border-l px-2 text-muted-foreground hover:bg-muted">
                      <Plus size={12} />
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
              </div>
              <span className="mt-5 text-muted-foreground text-sm">–</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className={styles.rangeLabel()}>To</span>
                <NumberField.Root
                  onValueChange={(val) =>
                    setDraft((d) => ({
                      ...d,
                      to: val ?? undefined,
                    }))
                  }
                  step={step ?? 1}
                  value={draft.to}
                >
                  <NumberField.Group className="flex h-9 overflow-hidden rounded-lg border border-input">
                    <NumberField.Decrement className="flex items-center border-input border-r px-2 text-muted-foreground hover:bg-muted">
                      <Minus size={12} />
                    </NumberField.Decrement>
                    <NumberField.Input
                      className="min-w-0 flex-1 bg-transparent px-2 text-center text-sm outline-none"
                      data-testid="number-input-range-to"
                    />
                    <NumberField.Increment className="flex items-center border-input border-l px-2 text-muted-foreground hover:bg-muted">
                      <Plus size={12} />
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
              </div>
            </div>
            <div className={styles.rangeActions()}>
              <Button
                onClick={handleCancel}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                size="sm"
              >
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
