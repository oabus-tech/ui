// Dependencies: @radix-ui/react-dialog (or @base-ui equivalent)

export type ModalProps = {
  open?: boolean // controlled open state
  onChange?: (open: boolean) => void // fires on open/close
}

export type ModalHeaderProps = {
  closable?: boolean // shows close button in header
  bordered?: boolean // adds bottom border to header
}

export type ModalHeaderTitleProps = {}

export type ModalHeaderDescriptionProps = {}

export type ModalBodyProps = {}

export type ModalFooterProps = {
  bordered?: boolean // adds top border to footer
}
