import { Menu } from '@base-ui/react/menu'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

import { MaskInput } from '@/components/mask-input'

import type { DocumentInputProps, DocumentType } from './document-input.types'

const documentInput = tv({
  slots: {
    item: [
      'document-input-item relative flex cursor-default items-center rounded-md px-2 py-1',
      'select-none text-sm outline-none focus:bg-accent focus:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
    ],
    popup: [
      'document-input-popup z-50 min-w-[120px] origin-(--transform-origin) overflow-hidden',
      'rounded-lg bg-popover p-1 shadow-md ring-1 ring-foreground/10',
      'data-open:fade-in-0 data-open:zoom-in-95 duration-100 data-open:animate-in',
      'data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out',
    ],
    trigger: [
      'document-input-trigger flex h-full items-center gap-1 rounded-l-lg border-input border-r',
      'select-none bg-transparent px-2 font-medium text-sm outline-none transition-colors',
      'pointer-events-auto hover:bg-muted focus-visible:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
  },
})

const MASKS: Record<Exclude<DocumentType, 'any'>, string> = {
  cnpj: '00.000.000/0000-00',
  cpf: '000.000.000-00',
}

const LABELS: Record<Exclude<DocumentType, 'any'>, string> = {
  cnpj: 'CNPJ',
  cpf: 'CPF',
}

const PLACEHOLDERS: Record<Exclude<DocumentType, 'any'>, string> = {
  cnpj: '00.000.000/0000-00',
  cpf: '000.000.000-00',
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

  const [internalType, setInternalType] = useState<
    Exclude<DocumentType, 'any'>
  >(
    variant === 'any'
      ? ((value?.type ?? defaultValue?.type ?? 'cpf') as Exclude<
          DocumentType,
          'any'
        >)
      : variant,
  )

  const activeType = variant === 'any' ? internalType : variant
  const mask = MASKS[activeType]

  const handleChange = (number: string | null) => {
    if (!number) {
      onChange?.(null)
      return
    }
    onChange?.({
      number,
      type: activeType,
    })
  }

  const handleTypeChange = (type: Exclude<DocumentType, 'any'>) => {
    setInternalType(type)
    onChange?.(null)
  }

  const leftSection =
    variant === 'any' ? (
      <Menu.Root>
        <Menu.Trigger
          className={trigger()}
          data-testid="document-input-trigger"
          disabled={disabled}
        >
          {LABELS[internalType]}
          <ChevronDown size={12} />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="isolate z-50">
            <Menu.Popup
              className={popup()}
              data-testid="document-input-popup"
            >
              {(
                [
                  'cpf',
                  'cnpj',
                ] as const
              ).map((type) => (
                <Menu.Item
                  className={item()}
                  data-testid="document-input-item"
                  key={type}
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
      defaultValue={defaultValue?.number ?? undefined}
      disabled={disabled}
      leftSection={leftSection}
      mask={mask}
      onChange={handleChange}
      placeholder={props.placeholder ?? PLACEHOLDERS[activeType]}
      size={size}
      value={value?.number ?? undefined}
    />
  )
}

export { DocumentInput }
