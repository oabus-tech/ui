import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Minus,
} from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/skeleton'

import type { TableColumnAlign, TableProps } from './table.types'

const LOADING_ROWS = 5
const SKELETON_KEYS = Array.from({ length: LOADING_ROWS }, (_, i) => `skeleton-${i}`)

const ALIGN_CLASS: Record<TableColumnAlign, string> = {
  center: 'text-center',
  left: '',
  right: 'text-right',
}

const checkboxStyles = tv({
  slots: {
    icon: 'block size-3',
    indicator:
      'flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 data-[checked]:border-primary data-[indeterminate]:border-primary data-[checked]:bg-primary data-[indeterminate]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:text-primary-foreground',
  },
})

const styles = tv({
  slots: {
    bodyCell: 'whitespace-nowrap p-2 align-middle',
    bodyRow: 'border-b transition-colors hover:bg-muted/50',
    checkCell: 'w-8 px-2 align-middle',
    emptyCell: 'py-8 text-center text-muted-foreground text-sm',
    headerCell:
      'h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground text-sm',
    paginationWrapper: 'mt-2',
    root: 'w-full',
    sortButton:
      'group/sort inline-flex cursor-pointer select-none items-center gap-1 outline-none focus-visible:underline',
    sortIcon: 'size-3.5 text-muted-foreground',
    table: 'w-full caption-bottom text-sm',
    tableWrapper: 'relative w-full overflow-x-auto',
  },
  variants: {
    clickable: {
      true: {
        bodyRow: 'cursor-pointer',
      },
    },
    selected: {
      true: {
        bodyRow: 'bg-muted hover:bg-muted',
      },
    },
  },
})

function Table<T extends Record<string, unknown>>(props: TableProps<T>) {
  const {
    columns,
    defaultSelectedKeys,
    emptySection,
    hidePagination,
    itemKey,
    items = [],
    loading,
    onRowClick,
    onSelectionChange,
    onSortChange,
    pagination,
    selectedKeys: controlledKeys,
    selection,
    sort,
  } = props

  const s = styles()
  const cs = checkboxStyles()

  const [internalSelected, setInternalSelected] = useState<string[]>(
    defaultSelectedKeys ?? [],
  )

  const isControlled = controlledKeys !== undefined
  const selectedKeys =
    controlledKeys !== undefined ? controlledKeys : internalSelected

  const visibleColumns = columns.filter((col) => !col.hide)
  const hasSelection = selection === 'multiple'
  const hasRowClick = Boolean(onRowClick)

  function getKey(item: T): string {
    return String(item[itemKey])
  }

  function handleSelectionChange(keys: string[]) {
    if (!isControlled) {
      setInternalSelected(keys)
    }
    onSelectionChange?.(keys)
  }

  const allKeys = items.map(getKey)
  const isAllSelected =
    allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k))
  const isSomeSelected =
    !isAllSelected && allKeys.some((k) => selectedKeys.includes(k))

  function handleSelectAll() {
    if (isAllSelected || isSomeSelected) {
      handleSelectionChange([])
    } else {
      handleSelectionChange(allKeys)
    }
  }

  function handleSelectRow(key: string) {
    if (selectedKeys.includes(key)) {
      handleSelectionChange(selectedKeys.filter((k) => k !== key))
    } else {
      handleSelectionChange([
        ...selectedKeys,
        key,
      ])
    }
  }

  function handleSortClick(key: string) {
    if (sort === key) {
      onSortChange?.(`-${key}`)
    } else if (sort === `-${key}`) {
      onSortChange?.(undefined)
    } else {
      onSortChange?.(key)
    }
  }

  function getSortState(key: string): 'asc' | 'desc' | 'none' {
    if (sort === key) {
      return 'asc'
    }
    if (sort === `-${key}`) {
      return 'desc'
    }
    return 'none'
  }

  const colSpan = visibleColumns.length + (hasSelection ? 1 : 0)

  return (
    <div className={s.root()}>
      <div className={s.tableWrapper()}>
        <table className={s.table()}>
          <thead>
            <tr>
              {hasSelection && (
                <th className={s.checkCell()}>
                  <BaseCheckbox.Root
                    checked={isAllSelected}
                    className={cs.indicator()}
                    indeterminate={isSomeSelected}
                    onCheckedChange={() => handleSelectAll()}
                  >
                    <BaseCheckbox.Indicator>
                      {isSomeSelected ? (
                        <Minus className={cs.icon()} />
                      ) : (
                        <Check className={cs.icon()} />
                      )}
                    </BaseCheckbox.Indicator>
                  </BaseCheckbox.Root>
                </th>
              )}
              {visibleColumns.map((col) => (
                <th
                  className={s.headerCell({
                    class: ALIGN_CLASS[col.align ?? 'left'],
                  })}
                  key={col.key}
                  style={
                    col.width
                      ? {
                          width: col.width,
                        }
                      : undefined
                  }
                >
                  {col.sorter ? (
                    <button
                      className={s.sortButton()}
                      onClick={() => handleSortClick(col.key)}
                      type="button"
                    >
                      {col.label}
                      {getSortState(col.key) === 'asc' ? (
                        <ChevronUp className={s.sortIcon()} />
                      ) : getSortState(col.key) === 'desc' ? (
                        <ChevronDown className={s.sortIcon()} />
                      ) : (
                        <ChevronsUpDown className={s.sortIcon()} />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              SKELETON_KEYS.map((skKey) => (
                <tr
                  className={s.bodyRow()}
                  key={skKey}
                >
                  {hasSelection && (
                    <td className={s.checkCell()}>
                      <Skeleton className="size-4" />
                    </td>
                  )}
                  {visibleColumns.map((col) => (
                    <td
                      className={s.bodyCell()}
                      key={col.key}
                    >
                      <Skeleton className="h-4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td
                  className={s.emptyCell()}
                  colSpan={colSpan}
                >
                  {emptySection ?? 'Nenhum resultado encontrado.'}
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const key = getKey(item)
                const isSelected = selectedKeys.includes(key)
                return (
                  <tr
                    className={s.bodyRow({
                      clickable: hasRowClick,
                      selected: isSelected,
                    })}
                    key={key}
                    onClick={hasRowClick ? () => onRowClick?.(item) : undefined}
                  >
                    {hasSelection && (
                      <td className={s.checkCell()}>
                        <BaseCheckbox.Root
                          checked={isSelected}
                          className={cs.indicator()}
                          onCheckedChange={() => handleSelectRow(key)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <BaseCheckbox.Indicator>
                            <Check className={cs.icon()} />
                          </BaseCheckbox.Indicator>
                        </BaseCheckbox.Root>
                      </td>
                    )}
                    {visibleColumns.map((col) => (
                      <td
                        className={s.bodyCell({
                          class: ALIGN_CLASS[col.align ?? 'left'],
                        })}
                        key={col.key}
                      >
                        {col.selector
                          ? col.selector(item, index)
                          : String(
                              (item as Record<string, unknown>)[col.key] ?? '',
                            )}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && !hidePagination && (
        <div className={s.paginationWrapper()}>
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  )
}

export { Table }
