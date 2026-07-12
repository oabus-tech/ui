import type { TableSelection } from './table.types'

const selectionColumnWidth = 40

type TableLayoutColumn = {
  width?: number
}

type TableLayoutSpacer = {
  index: number
  width: number
}

type TableWidthMode = 'pixels' | 'proportional'

type ResolveTableLayoutOptions = {
  columns: ReadonlyArray<TableLayoutColumn>
  layoutWidth?: number
  selection?: TableSelection
}

type TableLayout = {
  columnWidths: Array<number | undefined>
  selectionColumnWidth?: number
  spacer?: TableLayoutSpacer
  totalColumns: number
  totalWidth: number
  widthMode: TableWidthMode
}

const getPositiveWidth = (width: number | undefined) =>
  width !== undefined && Number.isFinite(width) && width > 0 ? width : undefined

export function resolveTableLayout({
  columns,
  layoutWidth,
  selection = 'none',
}: ResolveTableLayoutOptions): TableLayout {
  const columnWidths = columns.map((column) => getPositiveWidth(column.width))
  const hasAutomaticColumns = columnWidths.some((width) => width === undefined)
  const resolvedSelectionColumnWidth =
    selection === 'multiple' ? selectionColumnWidth : undefined
  const specifiedWidth = columnWidths.reduce<number>(
    (total, width) => total + (width ?? 0),
    resolvedSelectionColumnWidth ?? 0,
  )
  const resolvedLayoutWidth = getPositiveWidth(layoutWidth)
  const totalWidth = Math.max(
    specifiedWidth,
    resolvedLayoutWidth ?? specifiedWidth,
  )
  const hasReferenceSpace =
    resolvedLayoutWidth !== undefined && resolvedLayoutWidth > specifiedWidth
  const widthMode =
    hasAutomaticColumns && !hasReferenceSpace ? 'pixels' : 'proportional'
  const spacerWidth = hasAutomaticColumns ? 0 : totalWidth - specifiedWidth
  const spacerIndex =
    spacerWidth > 0 && columns.length > 1 ? columns.length - 1 : undefined
  const spacer =
    spacerIndex === undefined
      ? undefined
      : {
          index: spacerIndex,
          width: spacerWidth,
        }

  return {
    columnWidths,
    selectionColumnWidth: resolvedSelectionColumnWidth,
    spacer,
    totalColumns:
      columns.length +
      (resolvedSelectionColumnWidth === undefined ? 0 : 1) +
      (spacer === undefined ? 0 : 1),
    totalWidth,
    widthMode,
  }
}
