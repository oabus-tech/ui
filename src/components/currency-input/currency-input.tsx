import { useState } from 'react'
import { IMaskInput } from 'react-imask'

import { DropdownMenu } from '@/components/dropdown-menu'
import {
  DEFAULT_SECTION_WIDTH,
  inputShared,
} from '@/components/input/input.shared'

import type { Currency, CurrencyInputProps } from './currency-input.types'

const RIGHT_SECTION_WIDTH = 52

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
  const { root, field, section } = inputShared({ size })

  return (
    <div
      className={root()}
      data-testid="currency-input-root"
    >
      <span
        className={section({
          className: 'left-0 justify-center',
        })}
        data-testid="currency-input-section-left"
        style={{ width: DEFAULT_SECTION_WIDTH }}
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
        style={{
          paddingLeft: DEFAULT_SECTION_WIDTH,
          ...(hasRight ? { paddingRight: RIGHT_SECTION_WIDTH } : {}),
        }}
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
            className: 'pointer-events-auto right-0 justify-center',
          })}
          data-testid="currency-input-section-right"
          style={{ width: RIGHT_SECTION_WIDTH }}
        >
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <button
                className="text-sm font-medium outline-none hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
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
                <DropdownMenu.CheckboxItem
                  key={c}
                  checked={internalCurrency === c}
                  onCheckedChange={() => setInternalCurrency(c)}
                >
                  {CURRENCY_CONFIGS[c].label}
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>
        </span>
      )}
    </div>
  )
}

export { CurrencyInput }
