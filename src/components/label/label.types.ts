// Dependencies: @radix-ui/react-label (or @base-ui equivalent)

export type LabelProps = {
  htmlFor?: string // associates label with an input by id
  required?: boolean // shows required indicator (e.g. asterisk)
  optional?: boolean // shows optional indicator text
  disabled?: boolean // applies disabled styling
  tooltip?: React.ReactNode // tooltip content shown next to label
}

export type WithLabelProps<T> = T & {
  label?:
    | string
    | (LabelProps & {
        content?: string
      })
}
