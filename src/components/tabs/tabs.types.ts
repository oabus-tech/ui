// Dependencies: @radix-ui/react-tabs (or @base-ui equivalent)

export type TabsOrientation = 'horizontal' | 'vertical'

export type TabsProps = {
  orientation?: TabsOrientation // layout direction for tab list
  value?: string // controlled active tab
  defaultValue?: string // uncontrolled initial tab
  onChange?: (value: string) => void // fires when active tab changes
}

export type TabsListProps = {
  justified?: boolean // stretches tabs to fill available width
}

export type TabsTriggerProps = {
  value: string // tab identifier (required, must match content value)
  icon?: React.ReactNode // icon rendered before tab label
}

export type TabsContentProps = {
  value: string // tab identifier (required, must match trigger value)
}
