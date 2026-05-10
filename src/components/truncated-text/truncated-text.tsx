import { Tooltip } from '@/components/tooltip'

import type {
  TruncatedTextPosition,
  TruncatedTextProps,
} from './truncated-text.types'

function truncateText(
  text: string,
  position: TruncatedTextPosition,
  start: number,
  end: number,
) {
  const visibleLength =
    position === 'middle' ? start + end : position === 'end' ? start : end

  if (visibleLength === 0 || text.length <= visibleLength + 3) {
    return text
  }

  if (position === 'end') {
    const prefix = start > 0 ? text.slice(0, start) : ''

    return `${prefix}...`
  }

  if (position === 'start') {
    const suffix = end > 0 ? text.slice(-end) : ''

    return `...${suffix}`
  }

  const prefix = start > 0 ? text.slice(0, start) : ''
  const suffix = end > 0 ? text.slice(-end) : ''

  return `${prefix}...${suffix}`
}

export function TruncatedText({
  component: Component = 'span',
  end = 6,
  position = 'middle',
  start = 8,
  value,
}: TruncatedTextProps) {
  const text = String(value)
  const safeEnd = Math.max(end, 0)
  const safeStart = Math.max(start, 0)

  return (
    <Tooltip content={text}>
      <Component>{truncateText(text, position, safeStart, safeEnd)}</Component>
    </Tooltip>
  )
}
