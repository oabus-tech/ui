import { useState } from 'react'

import { DropdownMenu } from '@/components/dropdown-menu'
import { MaskInput } from '@/components/mask-input'

import type { DocumentInputProps, DocumentType } from './document-input.types'
import { Button } from '../button'

const LEFT_SECTION_WIDTH = 60

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
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button
          variant="ghost"
            data-testid="document-input-trigger"
            disabled={disabled}
            type="button"
          >
            {LABELS[internalType]}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          sideOffset={4}
          width={100}
        >
          {(
            [
              'cpf',
              'cnpj',
            ] as const
          ).map((type) => (
            <DropdownMenu.CheckboxItem
              checked={internalType === type}
              key={type}
              onCheckedChange={() => handleTypeChange(type)}
            >
              {LABELS[type]}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    ) : undefined

  return (
    <MaskInput
      {...props}
      defaultValue={defaultValue?.number ?? undefined}
      disabled={disabled}
      leftSection={leftSection}
      leftSectionWidth={variant === 'any' ? LEFT_SECTION_WIDTH : undefined}
      mask={mask}
      onChange={handleChange}
      placeholder={props.placeholder ?? PLACEHOLDERS[activeType]}
      size={size}
      value={value?.number ?? undefined}
    />
  )
}

export { DocumentInput }
