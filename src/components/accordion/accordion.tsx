import type { PropsWithChildren } from 'react'

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type {
  AccordionContent as AccordionContentProps,
  AccordionItem as AccordionItemProps,
  AccordionProps,
  AccordionTrigger as AccordionTriggerProps,
} from './accordion.types'

const accordion = tv({
  slots: {
    root: 'accordion-root flex w-full flex-col',
    item: 'accordion-item',
    header: 'accordion-header flex',
    trigger:
      'accordion-trigger group/accordion-trigger relative flex flex-1 cursor-pointer items-start justify-between rounded-lg border border-transparent py-2.5 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    triggerIconDown:
      'accordion-trigger-icon pointer-events-none ml-auto size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden',
    triggerIconUp:
      'accordion-trigger-icon pointer-events-none ml-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline',
    panel:
      'accordion-panel overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down',
    contentInner:
      'accordion-content-inner h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
  },
  variants: {
    bordered: {
      true: {
        root: 'rounded-lg border',
        item: 'border-b px-3 last:border-b-0',
      },
      false: {
        item: 'not-last:border-b',
      },
    },
  },
  defaultVariants: {
    bordered: false,
  },
})

function AccordionRoot({
  type,
  bordered,
  children,
  ...props
}: PropsWithChildren<AccordionProps>) {
  const { root } = accordion({ bordered })

  const multiple = type === 'multiple'

  const handleValueChange = (newValue: unknown[]) => {
    if (type === 'single') {
      ;(props as { onChange?: (v: string) => void }).onChange?.(
        (newValue as string[])[0],
      )
    } else {
      ;(props as { onChange?: (v: string[]) => void }).onChange?.(
        newValue as string[],
      )
    }
  }

  const value =
    type === 'single'
      ? props.value !== undefined
        ? props.value
          ? [props.value]
          : []
        : undefined
      : props.value

  const defaultValue =
    type === 'single'
      ? props.defaultValue !== undefined
        ? props.defaultValue
          ? [props.defaultValue]
          : []
        : undefined
      : props.defaultValue

  return (
    <AccordionPrimitive.Root
      data-testid="accordion-root"
      className={root()}
      multiple={multiple}
      value={value as string[]}
      defaultValue={defaultValue as string[]}
      onValueChange={handleValueChange}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}

function AccordionItem({
  value,
  disabled,
  children,
}: PropsWithChildren<AccordionItemProps>) {
  const { item } = accordion()

  return (
    <AccordionPrimitive.Item
      data-testid="accordion-item"
      className={item()}
      value={value}
      disabled={disabled}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger({
  children,
}: PropsWithChildren<AccordionTriggerProps>) {
  const { header, trigger, triggerIconDown, triggerIconUp } = accordion()

  return (
    <AccordionPrimitive.Header className={header()}>
      <AccordionPrimitive.Trigger
        data-testid="accordion-trigger"
        className={trigger()}
      >
        {children}
        <ChevronDown className={triggerIconDown()} />
        <ChevronUp className={triggerIconUp()} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  children,
}: PropsWithChildren<AccordionContentProps>) {
  const { panel, contentInner } = accordion()

  return (
    <AccordionPrimitive.Panel
      data-testid="accordion-panel"
      className={panel()}
    >
      <div data-testid="accordion-content-inner" className={contentInner()}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
})

export { Accordion }
