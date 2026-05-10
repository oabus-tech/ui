export type TruncatedTextComponent = 'code' | 'span'

export type TruncatedTextPosition = 'end' | 'middle' | 'start'

export type TruncatedTextProps = {
  component?: TruncatedTextComponent
  end?: number
  position?: TruncatedTextPosition
  start?: number
  value: number | string
}
