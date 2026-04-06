import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { ChevronDown } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type {
  AccordionContent as AccordionContentProps,
  AccordionItem as AccordionItemProps,
  AccordionProps,
  AccordionTrigger as AccordionTriggerProps,
} from './accordion.types'

const styles = tv({
  slots: {
    header: 'flex',
    icon: 'h-4 w-4 shrink-0 transition-transform duration-200 group-aria-expanded:rotate-180',
    item: 'border-b last:border-b-0',
    panel:
      'grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 data-[open]:grid-rows-[1fr]',
    panelInner: 'overflow-hidden pb-4 text-sm',
    root: 'w-full',
    trigger:
      'group flex w-full flex-1 cursor-pointer items-center justify-between py-4 text-left font-medium text-sm transition-all hover:underline disabled:cursor-not-allowed disabled:opacity-50',
  },
  variants: {
    bordered: {
      true: {
        item: 'px-4',
        root: 'rounded-md border',
      },
    },
  },
})

function AccordionRoot(props: PropsWithChildren<AccordionProps>) {
  const { children, bordered, type, value, defaultValue, onChange } = props

  const s = styles({
    bordered,
  })

  const isMultiple = type === 'multiple'

  const rootValue =
    value !== undefined
      ? Array.isArray(value)
        ? value
        : [
            value,
          ]
      : undefined

  const rootDefaultValue =
    defaultValue !== undefined
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [
            defaultValue,
          ]
      : undefined

  const handleValueChange = onChange
    ? (next: string[]) => {
        if (isMultiple) {
          ;(onChange as (v: string[]) => void)(next)
        } else {
          ;(onChange as (v: string) => void)(next[0] ?? '')
        }
      }
    : undefined

  return (
    <BaseAccordion.Root
      className={s.root()}
      defaultValue={rootDefaultValue}
      multiple={isMultiple}
      onValueChange={handleValueChange}
      value={rootValue}
    >
      {children}
    </BaseAccordion.Root>
  )
}

function AccordionItem({
  children,
  value,
  disabled,
}: PropsWithChildren<AccordionItemProps>) {
  const s = styles()

  return (
    <BaseAccordion.Item
      className={s.item()}
      disabled={disabled}
      value={value}
    >
      {children}
    </BaseAccordion.Item>
  )
}

function AccordionTrigger({
  children,
}: PropsWithChildren<AccordionTriggerProps>) {
  const s = styles()

  return (
    <BaseAccordion.Header className={s.header()}>
      <BaseAccordion.Trigger className={s.trigger()}>
        {children}
        <ChevronDown className={s.icon()} />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

function AccordionContent({
  children,
}: PropsWithChildren<AccordionContentProps>) {
  const s = styles()

  return (
    <BaseAccordion.Panel className={s.panel()}>
      <div className={s.panelInner()}>{children}</div>
    </BaseAccordion.Panel>
  )
}

const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
})

export { Accordion }
