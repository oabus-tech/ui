import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { tv } from 'tailwind-variants'

import type { SliderProps } from './slider.types'

const styles = tv({
  defaultVariants: {
    size: 'md',
  },
  slots: {
    control:
      'relative flex w-full touch-none select-none items-center data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-disabled:opacity-50',
    indicator:
      'select-none bg-primary data-horizontal:h-full data-vertical:w-full',
    root: 'data-vertical:h-full data-horizontal:w-full',
    thumb:
      'relative block shrink-0 select-none rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:outline-hidden focus-visible:ring-3 active:ring-3 disabled:pointer-events-none disabled:opacity-50',
    track:
      'relative grow select-none overflow-hidden rounded-full bg-muted data-vertical:h-full data-horizontal:w-full',
  },
  variants: {
    size: {
      lg: {
        thumb: 'size-5',
        track: 'data-horizontal:h-3 data-vertical:w-3',
      },
      md: {
        thumb: 'size-4',
        track: 'data-horizontal:h-2 data-vertical:w-2',
      },
      sm: {
        thumb: 'size-3',
        track: 'data-horizontal:h-1 data-vertical:w-1',
      },
    },
  },
})

function Slider(props: SliderProps) {
  const { defaultValue, mode, onValueChange, orientation, size, value } = props
  const s = styles({
    size,
  })

  const thumbCount = mode === 'range' ? 2 : 1

  if (mode === 'single') {
    return (
      <SliderPrimitive.Root
        className={s.root()}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        orientation={orientation}
        thumbAlignment="edge"
        value={value}
      >
        <SliderPrimitive.Control className={s.control()}>
          <SliderPrimitive.Track className={s.track()}>
            <SliderPrimitive.Indicator className={s.indicator()} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className={s.thumb()} />
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    )
  }

  return (
    <SliderPrimitive.Root
      className={s.root()}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      thumbAlignment="edge"
      value={value}
    >
      <SliderPrimitive.Control className={s.control()}>
        <SliderPrimitive.Track className={s.track()}>
          <SliderPrimitive.Indicator className={s.indicator()} />
        </SliderPrimitive.Track>
        {Array.from(
          {
            length: thumbCount,
          },
          (_, i) => (
            <SliderPrimitive.Thumb
              className={s.thumb()}
              // biome-ignore lint/suspicious/noArrayIndexKey: thumbs são posicionais
              key={i}
            />
          ),
        )}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
