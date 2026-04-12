import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { tv } from 'tailwind-variants'

import { DropdownMenu } from '@/components/dropdown-menu'
import { inputShared } from '@/components/input/input.shared'

import type { Currency, CurrencyInputProps } from './currency-input.types'

const currencyInput = tv({
  extend: inputShared,
  slots: {
    field: 'currency-input-field',
    root: 'currency-input-root',
    section: 'currency-input-section',
    variantTrigger: [
      'currency-input-variant-trigger flex items-center gap-1 font-medium text-sm',
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
  brl: {
    label: 'BRL',
    radix: ',',
    symbol: 'R$',
    thousandsSeparator: '.',
  },
  eur: {
    label: 'EUR',
    radix: ',',
    symbol: '€',
    thousandsSeparator: '.',
  },
  usd: {
    label: 'USD',
    radix: '.',
    symbol: '$',
    thousandsSeparator: ',',
  },
}

function parseCurrencyValue(
  val: string,
  config: CurrencyConfig,
): number | null {
  if (!val) {
    return null
  }
  const cleaned = val
    .split(config.thousandsSeparator)
    .join('')
    .replace(config.radix, '.')
  const num = parseFloat(cleaned)
  return Number.isNaN(num) ? null : num
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

  const activeCurrency =
    variant === 'any' ? internalCurrency : (variant as Currency)
  const config = CURRENCY_CONFIGS[activeCurrency]

  const hasRight = variant === 'any'
  const { root, field, section, variantTrigger } = currencyInput({
    hasLeft: true,
    hasRight,
    size,
  })

  return (
    <div
      className={root()}
      data-testid="currency-input-root"
    >
      <span
        className={section({
          className: 'left-2.5',
        })}
        data-testid="currency-input-section-left"
      >
        {config.symbol}
      </span>
      <IMaskInput
        className={field()}
        data-testid="currency-input-field"
        defaultValue={
          defaultValue !== null && defaultValue !== undefined
            ? defaultValue.toFixed(2).replace('.', config.radix)
            : undefined
        }
        disabled={disabled}
        mask={Number as unknown as string}
        normalizeZeros
        onAccept={(val: string) => onChange?.(parseCurrencyValue(val, config))}
        padFractionalZeros
        placeholder={placeholder}
        radix={config.radix}
        scale={2}
        thousandsSeparator={config.thousandsSeparator}
        value={
          value !== null && value !== undefined
            ? value.toFixed(2).replace('.', config.radix)
            : ''
        }
      />
      {variant === 'any' && (
        <span
          className={section({
            className: 'right-2.5',
          })}
          data-testid="currency-input-section-right"
        >
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <button
                className={variantTrigger()}
                data-testid="currency-input-variant-trigger"
                disabled={disabled}
                type="button"
              >
                {config.label}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={4}
              width={100}
            >
              {(
                [
                  'brl',
                  'usd',
                  'eur',
                ] as Currency[]
              ).map((c) => (
                <DropdownMenu.Item
                  key={c}
                  onClick={() => setInternalCurrency(c)}
                >
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
