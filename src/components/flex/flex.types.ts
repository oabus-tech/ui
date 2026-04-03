// Dependencies: none (pure CSS utility component)

export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse'

export type FlexJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse'

export type FlexMinHeight = 'sm' | 'md' | 'lg' | 'screen'

export type FlexProps = {
  direction?: FlexDirection // flex-direction
  justify?: FlexJustify // justify-content
  align?: FlexAlign // align-items
  gap?: FlexGap // gap between items
  wrap?: FlexWrap // flex-wrap behavior
  inline?: boolean // uses inline-flex instead of flex
  minHeight?: FlexMinHeight // minimum height preset
  block?: boolean // makes the flex container full-width
}
