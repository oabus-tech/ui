import { IMaskInput } from 'react-imask'

import { Loader } from '@/components/loader'

import { inputShared } from '../input/input.shared'
import type { MaskInputProps } from './mask-input.types'

function MaskInput({
  mask,
  size,
  value,
  defaultValue,
  leftSection,
  rightSection,
  loading,
  rootClassName,
  className,
  onChange,
  ...props
}: MaskInputProps) {
  const effectiveRight = loading ? <Loader size="sm" /> : rightSection
  const hasLeft = Boolean(leftSection)
  const hasRight = Boolean(effectiveRight)

  const { root, field, section } = inputShared({ size, hasLeft, hasRight })

  const maskOptions = Array.isArray(mask)
    ? mask.map((m) => ({ mask: m }))
    : mask

  return (
    <div data-testid="mask-input-root" className={root({ className: rootClassName })}>
      {hasLeft && (
        <span data-testid="mask-input-section-left" className={section({ className: 'left-2.5' })}>
          {leftSection}
        </span>
      )}
      <IMaskInput
        {...(props as object)}
        data-testid="mask-input-field"
        mask={maskOptions as string}
        value={value ?? ''}
        defaultValue={defaultValue ?? undefined}
        onAccept={(val: string) => onChange?.(val === '' ? null : val)}
        className={field({ className })}
      />
      {hasRight && (
        <span data-testid="mask-input-section-right" className={section({ className: 'right-2.5' })}>
          {effectiveRight}
        </span>
      )}
    </div>
  )
}

export { MaskInput }
