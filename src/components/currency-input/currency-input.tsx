import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { IMaskInput } from 'react-imask'
import { tv } from 'tailwind-variants'

import { DropdownMenu } from '@/components/dropdown-menu'
import { inputShared } from '@/components/input/input.shared'

import { buttonShared } from '../button/button.shared'
import type { InputSize } from '../input/input.types'
import type { Currency, CurrencyInputProps } from './currency-input.types'
import { Button } from '@base-ui/react'

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

const rootStyles = tv({
  base: 'flex',
})

const triggerStyles = tv({
  base: buttonShared({
    className: 'gap-1 rounded-s-lg rounded-e-none border-r-0 px-3 focus:z-10',
    variant: 'outline',
  }),
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    } as Record<InputSize, string>,
  },
})

const symbolStyles = tv({
  base: 'inline-flex shrink-0 items-center justify-center rounded-s-lg rounded-e-none border border-border border-r-0 bg-background px-3 font-medium text-muted-foreground text-sm',
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    } as Record<InputSize, string>,
  },
})

const inputFieldStyles = tv({
  base: [
    'rounded-s-none rounded-e-lg',
    'border border-input bg-transparent transition-colors',
    'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
    'disabled:pointer-events-none disabled:bg-input/50 disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
    'dark:bg-input/30 dark:disabled:bg-input/80',
    'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  ],
})

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

  const { field } = inputShared({
    size,
  })

  return (
    <div
      className={rootStyles()}
      data-testid="currency-input-root"
    >
      {variant === 'any' ? (
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button
              className={triggerStyles({
                size,
              })}
              data-testid="currency-input-variant-trigger"
              disabled={disabled}
              type="button"
            >
              {config.label}
              <ChevronsUpDown className="size-4 opacity-50" />
            </Button>
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
                checked={internalCurrency === c}
                key={c}
                onCheckedChange={() => setInternalCurrency(c)}
              >
                {CURRENCY_CONFIGS[c].label}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>
      ) : (
        <span
          className={symbolStyles({
            className: disabled ? 'opacity-50' : undefined,
            size,
          })}
          data-testid="currency-input-section-left"
        >
          {config.symbol}
        </span>
      )}
      <IMaskInput
        className={field({
          className: inputFieldStyles(),
        })}
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
    </div>
  )
}

export { CurrencyInput }
