import { Menu } from '@base-ui/react/menu'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

import { MaskInput } from '@/components/mask-input'

import { COUNTRIES } from './countries'
import type { PhoneInputProps, PhoneValue } from './phone-input.types'

const phoneInput = tv({
  slots: {
    item: [
      'phone-input-item relative flex cursor-default items-center gap-2 rounded-md px-2 py-1',
      'select-none text-sm outline-none focus:bg-accent focus:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
    ],
    popup: [
      'phone-input-popup z-50 max-h-60 min-w-[200px] origin-(--transform-origin) overflow-y-auto',
      'rounded-lg bg-popover p-1 shadow-md ring-1 ring-foreground/10',
      'data-open:fade-in-0 data-open:zoom-in-95 duration-100 data-open:animate-in',
      'data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out',
    ],
    trigger: [
      'phone-input-trigger flex h-full items-center gap-1 rounded-l-lg border-input border-r',
      'select-none bg-transparent px-2 text-sm outline-none transition-colors',
      'pointer-events-auto hover:bg-muted focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
  },
})

function PhoneInput({
  value,
  defaultValue,
  onChange,
  disabled,
  size,
  ...props
}: PhoneInputProps) {
  const { trigger, popup, item } = phoneInput()

  const isControlled = value !== undefined

  const getInitialIso = () => {
    const initial = isControlled ? value : defaultValue
    return initial?.iso ?? 'BR'
  }

  const [internalIso, setInternalIso] = useState<string>(getInitialIso)
  const [internalNumber, setInternalNumber] = useState<string>(
    () => (isControlled ? value?.number : defaultValue?.number) ?? '',
  )

  const activeIso = isControlled ? (value?.iso ?? 'BR') : internalIso
  const activeNumber = isControlled ? (value?.number ?? '') : internalNumber

  const country = COUNTRIES.find((c) => c.code === activeIso) ?? COUNTRIES[0]

  const handleNumberChange = (number: string | null) => {
    const num = number ?? ''
    if (!isControlled) {
      setInternalNumber(num)
    }
    const next: PhoneValue = {
      ddi: country.ddi,
      iso: country.code,
      number: num,
    }
    onChange?.(num ? next : null)
  }

  const handleCountrySelect = (iso: string) => {
    const selected = COUNTRIES.find((c) => c.code === iso) ?? COUNTRIES[0]
    if (!isControlled) {
      setInternalIso(iso)
    }
    const next: PhoneValue = {
      ddi: selected.ddi,
      iso,
      number: activeNumber,
    }
    onChange?.(next)
  }

  const countryTrigger = (
    <Menu.Root>
      <Menu.Trigger
        className={trigger()}
        data-testid="phone-input-trigger"
        disabled={disabled}
      >
        <span>{country.flag}</span>
        <span className="text-muted-foreground text-xs">{country.ddi}</span>
        <ChevronDown
          className="text-muted-foreground"
          size={10}
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="isolate z-50">
          <Menu.Popup
            className={popup()}
            data-testid="phone-input-popup"
          >
            {COUNTRIES.map((c) => (
              <Menu.Item
                className={item()}
                data-testid="phone-input-item"
                key={c.code}
                onClick={() => handleCountrySelect(c.code)}
              >
                <span>{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-muted-foreground text-xs">{c.ddi}</span>
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )

  return (
    <MaskInput
      {...props}
      disabled={disabled}
      leftSection={countryTrigger}
      mask={country.mask}
      onChange={handleNumberChange}
      placeholder={props.placeholder ?? country.mask.replace(/0/g, '_')}
      size={size}
      value={activeNumber}
    />
  )
}

export { PhoneInput }
