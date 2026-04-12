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

  const { root, field, section } = inputShared({
    hasLeft,
    hasRight,
    size,
  })

  const maskOptions = Array.isArray(mask)
    ? mask.map((m) => ({
        mask: m,
      }))
    : mask

  return (
    <div
      className={root({
        className: rootClassName,
      })}
      data-testid="mask-input-root"
    >
      {hasLeft && (
        <span
          className={section({
            className: 'left-2.5',
          })}
          data-testid="mask-input-section-left"
        >
          {leftSection}
        </span>
      )}
      <IMaskInput
        {...(props as object)}
        className={field({
          className,
        })}
        data-testid="mask-input-field"
        defaultValue={defaultValue ?? undefined}
        mask={maskOptions as string}
        onAccept={(val: string) => onChange?.(val === '' ? null : val)}
        value={value ?? ''}
      />
      {hasRight && (
        <span
          className={section({
            className: 'right-2.5',
          })}
          data-testid="mask-input-section-right"
        >
          {effectiveRight}
        </span>
      )}
    </div>
  )
}

export { MaskInput }
