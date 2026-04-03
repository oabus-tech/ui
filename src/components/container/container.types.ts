// Dependencies: none (pure CSS utility component)

export type ContainerMaxWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'full'

export type ContainerTextAlign = 'left' | 'center' | 'right'

export type ContainerProps = {
  centered?: boolean // centers the container horizontally with auto margins
  maxWidth?: ContainerMaxWidth // max-width breakpoint preset
  textAlign?: ContainerTextAlign // text alignment
}
