import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

import { Badge } from '@/components/badge'

import type { TagsInputProps } from './tags-input.types'
import { Button } from '../button'

const tagsInput = tv({
  slots: {
    field:
      'tags-input-field min-w-20 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground',
    removeBtn:
      'tags-input-remove ml-0.5 rounded-full opacity-60 hover:opacity-100',
    root: [
      'tags-input-root flex min-h-10 flex-wrap items-center gap-1.5',
      'rounded-lg border border-input px-2.5 py-1.5',
      'transition-colors',
      'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      'has-disabled:pointer-events-none has-disabled:opacity-50',
    ],
  },
})

function TagsInput({
  value: controlledValue,
  defaultValue = [],
  maxTags,
  allowDuplicates = false,
  onChange,
  placeholder,
  disabled,
  size: _size,
  ...props
}: TagsInputProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const isControlled = controlledValue !== undefined
  const tags = isControlled ? controlledValue : internalValue
  const inputRef = useRef<HTMLInputElement>(null)
  const { root, field, removeBtn } = tagsInput()

  const updateTags = (next: string[]) => {
    if (!isControlled) {
      setInternalValue(next)
    }
    onChange?.(next)
  }

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag) {
      return
    }
    if (!allowDuplicates && tags.includes(tag)) {
      return
    }
    if (maxTags !== undefined && tags.length >= maxTags) {
      return
    }
    updateTags([
      ...tags,
      tag,
    ])
  }

  const removeTag = (index: number) => {
    updateTags(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(e.currentTarget.value)
      e.currentTarget.value = ''
    } else if (
      e.key === 'Backspace' &&
      e.currentTarget.value === '' &&
      tags.length > 0
    ) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <div
      className={root()}
      data-testid="tags-input-root"
      onClick={() => {
        inputRef.current?.focus()
      }}
    >
      {tags.map((tag, i) => (
        <Badge
          key={`${tag}-${i}`}
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation()
            removeTag(i)
          }}
        >
          <span className="flex items-center gap-1">
            {tag}
            <X size={12} />
          </span>
        </Badge>
      ))}
      <input
        {...props}
        className={field()}
        data-testid="tags-input-field"
        disabled={disabled}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : undefined}
        ref={inputRef}
      />
    </div>
  )
}

export { TagsInput }
