// Dependencies: lucide-react (for close icon)

export type AlertVariant = 'default' | 'destructive'

export type AlertProps = {
  variant?: AlertVariant // visual style variant
  closable?: boolean // shows close button
  onClose?: () => void // fires when close button is clicked
}

export type AlertIconProps = {}

export type AlertTitleProps = {}

export type AlertDescriptionProps = {}

export type AlertActionProps = {}
