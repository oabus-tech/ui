import { useState } from 'react'

import { Menu } from '@base-ui/react/menu'
import { ChevronDown } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { MaskInput } from '@/components/mask-input'

import { COUNTRIES } from './countries'
import type { PhoneInputProps, PhoneValue } from './phone-input.types'

const phoneInput = tv({
  slots: {
    trigger: [
      'phone-input-trigger flex h-full items-center gap-1 rounded-l-lg border-r border-input',
      'bg-transparent px-2 text-sm outline-none transition-colors select-none',
      'pointer-events-auto hover:bg-muted focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    popup: [
      'phone-input-popup z-50 max-h-60 min-w-[200px] origin-(--transform-origin) overflow-y-auto',
      'rounded-lg bg-popover p-1 shadow-md ring-1 ring-foreground/10',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    item: [
      'phone-input-item relative flex cursor-default items-center gap-2 rounded-md px-2 py-1',
      'text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
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
    if (!isControlled) setInternalNumber(num)
    const next: PhoneValue = { iso: country.code, number: num, ddi: country.ddi }
    onChange?.(num ? next : null)
  }

  const handleCountrySelect = (iso: string) => {
    const selected = COUNTRIES.find((c) => c.code === iso) ?? COUNTRIES[0]
    if (!isControlled) setInternalIso(iso)
    const next: PhoneValue = { iso, number: activeNumber, ddi: selected.ddi }
    onChange?.(next)
  }

  const countryTrigger = (
    <Menu.Root>
      <Menu.Trigger
        data-testid="phone-input-trigger"
        disabled={disabled}
        className={trigger()}
      >
        <span>{country.flag}</span>
        <span className="text-xs text-muted-foreground">{country.ddi}</span>
        <ChevronDown size={10} className="text-muted-foreground" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="isolate z-50">
          <Menu.Popup data-testid="phone-input-popup" className={popup()}>
            {COUNTRIES.map((c) => (
              <Menu.Item
                key={c.code}
                data-testid="phone-input-item"
                className={item()}
                onClick={() => handleCountrySelect(c.code)}
              >
                <span>{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.ddi}</span>
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
      mask={country.mask}
      value={activeNumber}
      placeholder={props.placeholder ?? country.mask.replace(/0/g, '_')}
      disabled={disabled}
      size={size}
      leftSection={countryTrigger}
      onChange={handleNumberChange}
    />
  )
}

export { PhoneInput }
