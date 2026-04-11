import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import type {
  AccordionContent as AccordionContentType,
  AccordionItem as AccordionItemType,
  AccordionProps,
  AccordionTrigger as AccordionTriggerType,
} from './accordion.types'

const styles = tv({
  slots: {
    contentInner:
      'h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
    contentRoot: 'overflow-hidden text-sm',
    item: 'not-last:border-b px-2',
    root: 'flex w-full flex-col',
    triggerHeader: 'flex',
    triggerIcon:
      'ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180',
    triggerRoot:
      'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  },
  variants: {
    bordered: {
      true: {
        root: 'rounded-lg border',
      },
    },
  },
})

function AccordionRoot(props: PropsWithChildren<AccordionProps>) {
  const { bordered, children, type, ...rest } = props
  const s = styles({
    bordered,
  })

  if (type === 'single') {
    const { collapsible, defaultValue, onChange, value, ...rootRest } =
      rest as Extract<
        AccordionProps,
        {
          type: 'single'
        }
      >

    return (
      <AccordionPrimitive.Root
        className={s.root()}
        defaultValue={
          defaultValue
            ? [
                defaultValue,
              ]
            : undefined
        }
        onValueChange={(val) => onChange?.(val[0] ?? '')}
        value={
          value !== undefined
            ? [
                value,
              ]
            : undefined
        }
        {...rootRest}
      >
        {children}
      </AccordionPrimitive.Root>
    )
  }

  const { defaultValue, onChange, value, ...rootRest } = rest as Extract<
    AccordionProps,
    {
      type: 'multiple'
    }
  >

  return (
    <AccordionPrimitive.Root
      className={s.root()}
      defaultValue={defaultValue}
      multiple
      onValueChange={onChange}
      value={value}
      {...rootRest}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}

function AccordionItem(props: PropsWithChildren<AccordionItemType>) {
  const { children, disabled, value } = props
  const s = styles()

  return (
    <AccordionPrimitive.Item
      className={s.item()}
      disabled={disabled}
      value={value}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger(props: PropsWithChildren<AccordionTriggerType>) {
  const { children } = props
  const s = styles()

  return (
    <AccordionPrimitive.Header className={s.triggerHeader()}>
      <AccordionPrimitive.Trigger className={s.triggerRoot()}>
        {children}
        <ChevronDownIcon className={s.triggerIcon()} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent(props: PropsWithChildren<AccordionContentType>) {
  const { children } = props
  const s = styles()

  return (
    <AccordionPrimitive.Panel className={s.contentRoot()}>
      <div className={s.contentInner()}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
})

export { Accordion }
