/**
 * Layout.Header
 *
 * Top navigation bar with three-section slot layout (left, center, right).
 *
 * Behavior:
 * - Slot-based: detects React Fragments to distribute children into Left/Center/Right
 * - Sticky prop makes header fixed at top with z-index layering
 * - Bordered adds bottom border
 * - Size: sm (40px), md (56px), lg (64px)
 *
 * Implementation:
 * - Renders <header> with flex layout, three section divs
 * - Fragment detection to split children into slots
 * - <Layout.Header sticky bordered size="md"><>Left</><>Center</><>Right</></Layout.Header>
 *
 * Dependencies: none
 */

export type LayoutHeaderSize = 'sm' | 'md' | 'lg'

export type LayoutHeaderProps = {
  bordered?: boolean // adds bottom border
  sticky?: boolean // makes header sticky at top
  size?: LayoutHeaderSize // controls header height
}
