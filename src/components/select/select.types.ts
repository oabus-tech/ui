// Dependencies: @radix-ui/react-select (or custom popover + listbox), virtual scroll for large lists

export type SelectMode = 'single' | 'multiple'

export type SelectInfiniteProps = {
  loadingMoreText?: string // text shown while loading more
  hasMore?: boolean // whether more items can be loaded
  loadingMore?: boolean // loading state for infinite scroll
  onLoadMore?: () => void // fires when scroll hits bottom
}

export type SelectSize = 'sm' | 'md' | 'lg'

export type BaseSelectProps<T, O> = {
  options: T[] // array of option objects
  optionLabel: keyof T | ((option: T) => string) // how to extract display label
  optionValue: keyof T | ((option: T) => O) // how to extract option value
  optionGroup?: keyof T | ((option: T) => string) // optional grouping key
  renderOption?: (option: T) => React.ReactNode // custom option renderer
  renderValue?: (option: T) => React.ReactNode // custom selected value renderer
  placeholder?: string // placeholder text when nothing selected
  searchable?: boolean // enables search/filter input
  searchPlaceholder?: string // placeholder for search input
  emptySection?: React.ReactNode // content shown when no options match
  leftSection?: React.ReactNode // element on the left of trigger
  rightSection?: React.ReactNode // element on the right of trigger
  infinite?: SelectInfiniteProps // infinite scroll configuration
  disabled?: boolean // prevents interaction
  loading?: boolean // shows loading state
  size?: SelectSize // visual size
}

export type SelectSingleProps<T, I = string, O = I> = BaseSelectProps<T, O> & {
  mode: 'single' // single selection mode
  value?: I | null // controlled selected value
  defaultValue?: I | null // uncontrolled initial value
  onChange?: (value: O | null) => void // fires on selection change
}

export type SelectMultipleProps<T, I = string, O = I> = BaseSelectProps<
  T,
  O
> & {
  mode: 'multiple' // multiple selection mode
  value?: I[] // controlled selected values
  defaultValue?: I[] // uncontrolled initial values
  onChange?: (value: O[]) => void // fires on selection change
}

export type SelectProps<
  T,
  I = string,
  O = I,
  K extends SelectMode = SelectMode,
> = K extends 'single'
  ? SelectSingleProps<T, I, O>
  : K extends 'multiple'
    ? SelectMultipleProps<T, I, O>
    : never
