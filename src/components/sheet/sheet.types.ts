// Dependencies: @radix-ui/react-dialog (same base as modal, with slide animation)

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export type SheetProps = {
  open?: boolean // controlled open state
  side?: SheetSide // which side the sheet slides from
  onChange?: (open: boolean) => void // fires on open/close
}

export type SheetHeaderProps = {
  closable?: boolean // shows close button
  bordered?: boolean // adds bottom border
}

export type SheetTitleProps = {}

export type SheetDescriptionProps = {}

export type SheetBodyProps = {}

export type SheetFooterProps = {
  bordered?: boolean // adds top border
}
