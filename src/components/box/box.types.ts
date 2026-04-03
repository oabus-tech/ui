// Dependencies: none (pure CSS utility component)

export type BoxPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BoxBg = 'background' | 'muted' | 'card'

export type BoxRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type BoxWidth = 'auto' | 'full'

export type BoxMinHeight = 'sm' | 'md' | 'lg' | 'screen'

export type BoxPosition = 'static' | 'relative' | 'absolute'

export type BoxOverflow = 'hidden' | 'visible' | 'auto'

export type BoxTextAlign = 'left' | 'center' | 'right'

export type BoxProps = {
  bg?: BoxBg // background color using theme tokens
  grow?: boolean // flex-grow: 1
  minHeight?: BoxMinHeight // minimum height preset
  overflow?: BoxOverflow // CSS overflow behavior
  padding?: BoxPadding // uniform padding
  paddingX?: BoxPadding // horizontal padding override
  paddingY?: BoxPadding // vertical padding override
  position?: BoxPosition // CSS position property
  rounded?: BoxRounded // border-radius preset
  textAlign?: BoxTextAlign // text alignment
  width?: BoxWidth // width preset
}
