// Dependencies: @radix-ui/react-slider (or @base-ui equivalent)

export type SliderOrientation = 'horizontal' | 'vertical'

export type SliderSize = 'sm' | 'md' | 'lg'

type BaseSliderProps = {
  orientation: SliderOrientation // track direction (required)
  size?: SliderSize // visual size of track and thumb
}

type SliderSingleProps = {
  mode: 'single' // single thumb
  value?: number // controlled value
  defaultValue?: number // uncontrolled initial value
  onValueChange?: (value: number) => void // fires on drag/change
}

type SliderRangeProps = {
  mode: 'range' // two thumbs for range selection
  value?: [
    number,
    number,
  ] // controlled [min, max] values
  defaultValue?: [
    number,
    number,
  ] // uncontrolled initial range
  onValueChange?: (
    value: [
      number,
      number,
    ],
  ) => void // fires on drag/change
}

export type SliderProps = BaseSliderProps &
  (SliderSingleProps | SliderRangeProps)
