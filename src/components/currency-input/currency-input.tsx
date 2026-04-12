import { useState } from 'react'

import { IMaskInput } from 'react-imask'
import { tv } from 'tailwind-variants'

import { DropdownMenu } from '@/components/dropdown-menu'
import { inputShared } from '@/components/input/input.shared'

import type { Currency, CurrencyInputProps, CurrencyVariant } from './currency-input.types'

const currencyInput = tv({
  extend: inputShared,
  slots: {
    root: 'currency-input-root',
    field: 'currency-input-field',
    section: 'currency-input-section',
    variantTrigger: [
      'currency-input-variant-trigger flex items-center gap-1 text-sm font-medium',
      'pointer-events-auto outline-none',
      'hover:text-foreground focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
  },
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

function CurrencyInput({
  variant = 'brl',
  value,
  defaultValue,
  onChange,
  disabled,
  size,
  placeholder,
}: CurrencyInputProps) {
  const [internalCurrency, setInternalCurrency] = useState<Currency>(
    variant === 'any' ? 'brl' : (variant as Currency),
  )

  const activeCurrency = variant === 'any' ? internalCurrency : (variant as Currency)
  const config = CURRENCY_CONFIGS[activeCurrency]

  const hasRight = variant === 'any'
  const { root, field, section, variantTrigger } = currencyInput({ size, hasLeft: true, hasRight })

  return (
    <div data-testid="currency-input-root" className={root()}>
      <span data-testid="currency-input-section-left" className={section({ className: 'left-2.5' })}>
        {config.symbol}
      </span>
      <IMaskInput
        data-testid="currency-input-field"
        mask={Number as unknown as string}
        scale={2}
        normalizeZeros
        padFractionalZeros
        thousandsSeparator={config.thousandsSeparator}
        radix={config.radix}
        value={value !== null && value !== undefined ? value.toFixed(2).replace('.', config.radix) : ''}
        defaultValue={
          defaultValue !== null && defaultValue !== undefined
            ? defaultValue.toFixed(2).replace('.', config.radix)
            : undefined
        }
        onAccept={(val: string) => onChange?.(parseCurrencyValue(val, config))}
        disabled={disabled}
        placeholder={placeholder}
        className={field()}
      />
      {variant === 'any' && (
        <span data-testid="currency-input-section-right" className={section({ className: 'right-2.5' })}>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <button
                data-testid="currency-input-variant-trigger"
                disabled={disabled}
                className={variantTrigger()}
              >
                {config.label}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content width={100} sideOffset={4}>
              {(['brl', 'usd', 'eur'] as Currency[]).map((c) => (
                <DropdownMenu.Item key={c} onClick={() => setInternalCurrency(c)}>
                  {CURRENCY_CONFIGS[c].label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>
        </span>
      )}
    </div>
  )
}

export { CurrencyInput }
