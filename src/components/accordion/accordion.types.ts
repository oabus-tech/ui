// Dependencies: @radix-ui/react-accordion (or @base-ui equivalent)

export type AccordionType = 'single' | 'multiple'

type BaseAccordionProps = {
  type: AccordionType // controls single vs multiple open behavior
  bordered?: boolean // adds border styling to the accordion container
}

type SingleAccordionProps = {
  type: 'single'
  value?: string // controlled: currently open item value
  defaultValue?: string // uncontrolled: initially open item value
  collapsible?: boolean // whether the open item can be collapsed
  onChange?: (value: string) => void // fires when open item changes
}

type MultipleAccordionProps = {
  type: 'multiple'
  value?: string[] // controlled: list of open item values
  defaultValue?: string[] // uncontrolled: initially open items
  onChange?: (value: string[]) => void // fires when open items change
}

export type AccordionProps =
  | (BaseAccordionProps & SingleAccordionProps)
  | (BaseAccordionProps & MultipleAccordionProps)

export type AccordionItem = {
  value: string // unique identifier for this item
  disabled?: boolean // prevents interaction with this item
}

export type AccordionTrigger = {}

export type AccordionContent = {}
