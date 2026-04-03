/**
 * Tabs
 *
 * Tab navigation with trigger buttons and associated content panels.
 * Supports horizontal and vertical orientations.
 *
 * Behavior:
 * - Clicking a trigger activates its associated content panel
 * - Active trigger shows bg-background (elevated pill effect) on muted list background
 * - Justified variant stretches triggers to equal width
 * - Orientation: horizontal (default) or vertical
 * - Trigger supports an icon before the label
 * - Focus ring on keyboard navigation
 *
 * Implementation:
 * - Use Radix UI Tabs primitive for accessibility (keyboard nav, ARIA roles)
 * - List renders as muted background container with rounded corners
 * - Smooth background transitions on active trigger
 * - <Tabs value={tab} onChange={setTab}>
 *     <Tabs.List justified>
 *       <Tabs.Trigger value="a" icon={<Icon />}>Tab A</Tabs.Trigger>
 *       <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
 *     </Tabs.List>
 *     <Tabs.Content value="a">Panel A</Tabs.Content>
 *     <Tabs.Content value="b">Panel B</Tabs.Content>
 *   </Tabs>
 *
 * Dependencies: @radix-ui/react-tabs
 */

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
