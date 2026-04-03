import type { PropsWithChildren } from 'react'

import type {
  AccordionContent as AccordionContentProps,
  AccordionItem as AccordionItemProps,
  AccordionProps,
  AccordionTrigger as AccordionTriggerProps,
} from './accordion.types'

function AccordionRoot(_props: PropsWithChildren<AccordionProps>) {
  return <div></div>
}

function AccordionItem(_props: PropsWithChildren<AccordionItemProps>) {
  return <div></div>
}

function AccordionTrigger(_props: PropsWithChildren<AccordionTriggerProps>) {
  return <div></div>
}

function AccordionContent(_props: PropsWithChildren<AccordionContentProps>) {
  return <div></div>
}

const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
})

export { Accordion }
