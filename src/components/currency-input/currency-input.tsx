import { useState } from 'react'

import { Menu } from '@base-ui/react/menu'
import { Popover } from '@base-ui/react/popover'
import { IMaskInput } from 'react-imask'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/button'

import type {
  Currency,
  CurrencyInputProps,
  CurrencyInputRangeValue,
  CurrencyVariant,
} from './currency-input.types'

const currencyInput = tv({
  slots: {
    root: 'currency-input-root relative flex w-full items-center',
    field: [
      'currency-input-field w-full min-w-0 rounded-lg border border-input bg-transparent',
      'text-base md:text-sm transition-colors outline-none',
      'placeholder:text-muted-foreground',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
    ],
    section:
      'currency-input-section pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center text-muted-foreground',
    variantTrigger: [
      'currency-input-variant-trigger flex items-center gap-1 text-sm font-medium',
      'pointer-events-auto outline-none',
      'hover:text-foreground focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    popup: [
      'currency-input-popup z-50 min-w-[100px] origin-(--transform-origin) overflow-hidden',
      'rounded-lg bg-popover p-1 shadow-md ring-1 ring-foreground/10',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    menuItem: [
      'currency-input-menu-item relative flex cursor-default items-center rounded-md px-2 py-1',
      'text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground',
    ],
    rangeTrigger: [
      'currency-input-range-trigger flex h-10 w-full cursor-pointer items-center justify-between',
      'rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    ],
    rangePopup: [
      'currency-input-range-popup z-50 w-72 origin-(--transform-origin) rounded-lg',
      'bg-popover p-3 shadow-md ring-1 ring-foreground/10',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
  },
  variants: {
    size: {
      sm: { field: 'h-9 py-1', section: 'text-xs' },
      md: { field: 'h-10 py-1', section: 'text-sm' },
      lg: { field: 'h-11 py-1', section: 'text-sm' },
    },
    hasLeft: { true: { field: 'pl-10' } },
    hasRight: { true: { field: 'pr-16' } },
  },
  defaultVariants: { size: 'md' },
})

type CurrencyConfig = {
  symbol: string
  thousandsSeparator: string
  radix: string
  label: string
}

const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  brl: { symbol: 'R$', thousandsSeparator: '.', radix: ',', label: 'BRL' },
  usd: { symbol: '$', thousandsSeparator: ',', radix: '.', label: 'USD' },
  eur: { symbol: '€', thousandsSeparator: '.', radix: ',', label: 'EUR' },
}

function parseCurrencyValue(val: string, config: CurrencyConfig): number | null {
  if (!val) return null
  const cleaned = val
    .split(config.thousandsSeparator)
    .join('')
    .replace(config.radix, '.')
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

function CurrencyInputField({
  value,
  onChange,
  disabled,
  placeholder,
  config,
  size,
}: {
  value?: number | null
  onChange?: (value: number | null) => void
  disabled?: boolean
  placeholder?: string
  config: CurrencyConfig
  size?: 'sm' | 'md' | 'lg'
}) {
  const { root, field, section } = currencyInput({ size, hasLeft: true })
  return (
    <div className={root()}>
      <span className={section({ className: 'left-2.5' })}>{config.symbol}</span>
      <IMaskInput
        data-testid="currency-input-field"
        mask={Number as unknown as string}
        scale={2}
        normalizeZeros
        padFractionalZeros
        thousandsSeparator={config.thousandsSeparator}
        radix={config.radix}
        value={value !== null && value !== undefined ? String(value) : ''}
        onAccept={(val: string) => onChange?.(parseCurrencyValue(val, config))}
        disabled={disabled}
        placeholder={placeholder}
        className={field()}
      />
    </div>
  )
}

function CurrencyInput(props: CurrencyInputProps) {
  const { popup, menuItem, variantTrigger, rangeTrigger, rangePopup } = currencyInput()

  const variant: CurrencyVariant = (props as { variant?: CurrencyVariant }).variant ?? 'brl'

  const [internalCurrency, setInternalCurrency] = useState<Currency>(
    variant === 'any' ? 'brl' : (variant as Currency),
  )

  const activeCurrency = variant === 'any' ? internalCurrency : (variant as Currency)
  const config = CURRENCY_CONFIGS[activeCurrency]

  const currencySelector = variant === 'any' ? (
    <Menu.Root>
      <Menu.Trigger
        data-testid="currency-input-variant-trigger"
        disabled={(props as { disabled?: boolean }).disabled}
        className={variantTrigger()}
      >
        {config.label}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="isolate z-50">
          <Menu.Popup data-testid="currency-input-popup" className={popup()}>
            {(['brl', 'usd', 'eur'] as Currency[]).map((c) => (
              <Menu.Item
                key={c}
                data-testid="currency-input-menu-item"
                className={menuItem()}
                onClick={() => setInternalCurrency(c)}
              >
                {CURRENCY_CONFIGS[c].label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  ) : null

  if ((props as { mode?: string }).mode === 'range') {
    const rangeProps = props as {
      value?: CurrencyInputRangeValue
      defaultValue?: CurrencyInputRangeValue
      onChange?: (v: CurrencyInputRangeValue) => void
      disabled?: boolean
      placeholder?: string
      size?: 'sm' | 'md' | 'lg'
    }

    return (
      <CurrencyRangeInput
        value={rangeProps.value}
        defaultValue={rangeProps.defaultValue}
        onChange={rangeProps.onChange}
        disabled={rangeProps.disabled}
        placeholder={rangeProps.placeholder}
        config={config}
        currencySelector={currencySelector}
        styles={{ rangeTrigger, rangePopup }}
      />
    )
  }

  const singleProps = props as {
    value?: number | null
    defaultValue?: number | null
    onChange?: (value: number | null) => void
    disabled?: boolean
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
  }

  const { root, field, section } = currencyInput({
    size: singleProps.size,
    hasLeft: true,
    hasRight: variant === 'any',
  })

  return (
    <div data-testid="currency-input-root" className={root()}>
      <span className={section({ className: 'left-2.5' })}>{config.symbol}</span>
      <IMaskInput
        data-testid="currency-input-field"
        mask={Number as unknown as string}
        scale={2}
        normalizeZeros
        padFractionalZeros
        thousandsSeparator={config.thousandsSeparator}
        radix={config.radix}
        value={
          singleProps.value !== null && singleProps.value !== undefined
            ? String(singleProps.value)
            : ''
        }
        onAccept={(val: string) => singleProps.onChange?.(parseCurrencyValue(val, config))}
        disabled={singleProps.disabled}
        placeholder={singleProps.placeholder}
        className={field()}
      />
      {variant === 'any' && (
        <span className={section({ className: 'right-2.5' })}>{currencySelector}</span>
      )}
    </div>
  )
}

function CurrencyRangeInput({
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
  config,
  currencySelector,
  styles,
}: {
  value?: CurrencyInputRangeValue
  defaultValue?: CurrencyInputRangeValue
  onChange?: (v: CurrencyInputRangeValue) => void
  disabled?: boolean
  placeholder?: string
  config: CurrencyConfig
  currencySelector: React.ReactNode
  styles: { rangeTrigger: () => string; rangePopup: () => string }
}) {
  const isControlled = value !== undefined
  const [draft, setDraft] = useState<CurrencyInputRangeValue>(
    isControlled ? (value ?? {}) : (defaultValue ?? {}),
  )
  const [open, setOpen] = useState(false)

  const current = isControlled ? (value ?? {}) : draft

  const formatNum = (n: number | null | undefined) =>
    n !== null && n !== undefined
      ? `${config.symbol} ${n.toFixed(2).replace('.', config.radix)}`
      : '–'

  const displayValue =
    current.from !== undefined || current.to !== undefined
      ? `${formatNum(current.from)} – ${formatNum(current.to)}`
      : ''

  const handleOpen = (next: boolean) => {
    if (next) setDraft(current)
    setOpen(next)
  }

  const handleApply = () => {
    onChange?.(draft)
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpen}>
      <Popover.Trigger
        data-testid="currency-input-range-trigger"
        disabled={disabled}
        className={styles.rangeTrigger()}
      >
        {displayValue || placeholder || `${config.symbol} – – ${config.symbol} –`}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="isolate z-50" sideOffset={4}>
          <Popover.Popup data-testid="currency-input-range-popup" className={styles.rangePopup()}>
            {currencySelector && (
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Currency</span>
                {currencySelector}
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs text-muted-foreground">From</span>
                <CurrencyInputField
                  value={draft.from}
                  config={config}
                  onChange={(v) => setDraft((d) => ({ ...d, from: v }))}
                />
              </div>
              <span className="mt-4 text-sm text-muted-foreground">–</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs text-muted-foreground">To</span>
                <CurrencyInputField
                  value={draft.to}
                  config={config}
                  onChange={(v) => setDraft((d) => ({ ...d, to: v }))}
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
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

export { CurrencyInput }
