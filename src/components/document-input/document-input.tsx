import { useState } from 'react'

import { Menu } from '@base-ui/react/menu'
import { ChevronDown } from 'lucide-react'
import { tv } from 'tailwind-variants'

import { MaskInput } from '@/components/mask-input'

import type { DocumentInputProps, DocumentType } from './document-input.types'

const documentInput = tv({
  slots: {
    trigger: [
      'document-input-trigger flex h-full items-center gap-1 rounded-l-lg border-r border-input',
      'bg-transparent px-2 text-sm font-medium outline-none transition-colors select-none',
      'pointer-events-auto hover:bg-muted focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    popup: [
      'document-input-popup z-50 min-w-[120px] origin-(--transform-origin) overflow-hidden',
      'rounded-lg bg-popover p-1 shadow-md ring-1 ring-foreground/10',
      'duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
    ],
    item: [
      'document-input-item relative flex cursor-default items-center rounded-md px-2 py-1',
      'text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
    ],
  },
})

const MASKS: Record<Exclude<DocumentType, 'any'>, string> = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
}

const LABELS: Record<Exclude<DocumentType, 'any'>, string> = {
  cpf: 'CPF',
  cnpj: 'CNPJ',
}

const PLACEHOLDERS: Record<Exclude<DocumentType, 'any'>, string> = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
}

function DocumentInput({
  variant,
  value,
  defaultValue,
  onChange,
  disabled,
  size,
  ...props
}: DocumentInputProps) {
  const { trigger, popup, item } = documentInput()

  const [internalType, setInternalType] = useState<Exclude<DocumentType, 'any'>>(
    variant === 'any'
      ? ((value?.type ?? defaultValue?.type ?? 'cpf') as Exclude<DocumentType, 'any'>)
      : variant,
  )

  const activeType = variant === 'any' ? internalType : variant
  const mask = MASKS[activeType]

  const handleChange = (number: string | null) => {
    if (!number) { onChange?.(null); return }
    onChange?.({ type: activeType, number })
  }

  const handleTypeChange = (type: Exclude<DocumentType, 'any'>) => {
    setInternalType(type)
    onChange?.(null)
  }

  const leftSection =
    variant === 'any' ? (
      <Menu.Root>
        <Menu.Trigger
          data-testid="document-input-trigger"
          disabled={disabled}
          className={trigger()}
        >
          {LABELS[internalType]}
          <ChevronDown size={12} />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="isolate z-50">
            <Menu.Popup data-testid="document-input-popup" className={popup()}>
              {(['cpf', 'cnpj'] as const).map((type) => (
                <Menu.Item
                  key={type}
                  data-testid="document-input-item"
                  className={item()}
                  onClick={() => handleTypeChange(type)}
                >
                  {LABELS[type]}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    ) : undefined

  return (
    <MaskInput
      {...props}
      mask={mask}
      value={value?.number ?? undefined}
      defaultValue={defaultValue?.number ?? undefined}
      placeholder={props.placeholder ?? PLACEHOLDERS[activeType]}
      disabled={disabled}
      size={size}
      leftSection={leftSection}
      onChange={handleChange}
    />
  )
}

export { DocumentInput }
