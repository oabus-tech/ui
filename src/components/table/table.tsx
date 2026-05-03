import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

import { Checkbox } from '@/components/checkbox'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Pagination } from '@/components/pagination'

import type { TableProps } from './table.types'

const styles = tv({
  slots: {
    body: '[&_tr:last-child]:border-0',
    cell: 'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0',
    container: 'relative w-full overflow-x-auto rounded-md border',
    emptyCell: 'p-8 text-center text-muted-foreground',
    head: 'h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0',
    header: '[&_tr]:border-b',
    root: 'table-root flex flex-col gap-4',
    row: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    sortButton: 'inline-flex cursor-pointer select-none items-center gap-1',
    table: 'w-full caption-bottom text-sm',
  },
})

const {
  body,
  cell,
  container,
  emptyCell,
  head,
  header,
  root,
  row,
  sortButton,
  table,
} = styles()

function Table<T>({
  columns,
  defaultSelectedKeys = [],
  emptySection,
  hidePagination,
  itemKey,
  items,
  loading,
  onRowClick,
  onSelectionChange,
  onSortChange,
  pagination,
  selectedKeys: controlledSelectedKeys,
  selection = 'none',
  sort,
}: TableProps<T>) {
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState<string[]>(defaultSelectedKeys)

  const isControlled = controlledSelectedKeys !== undefined
  const selectedKeys = isControlled
    ? controlledSelectedKeys
    : internalSelectedKeys

  const visibleColumns = columns.filter((col) => !col.hide)
  const totalColumns =
    visibleColumns.length + (selection === 'multiple' ? 1 : 0)

  const isEmpty = !items || items.length === 0

  const handleSelectionChange = (next: string[]) => {
    if (!isControlled) {
      setInternalSelectedKeys(next)
    }
    onSelectionChange?.(next)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked && items) {
      const allKeys = items.map((item) => String(item[itemKey]))
      handleSelectionChange(allKeys)
    } else {
      handleSelectionChange([])
    }
  }

  const handleSelectRow = (key: string, checked: boolean) => {
    const next = checked
      ? [
          ...selectedKeys,
          key,
        ]
      : selectedKeys.filter((k) => k !== key)
    handleSelectionChange(next)
  }

  const handleSort = (columnKey: string) => {
    if (!onSortChange) {
      return
    }

    if (sort === columnKey) {
      onSortChange(`-${columnKey}`)
    } else if (sort === `-${columnKey}`) {
      onSortChange(undefined)
    } else {
      onSortChange(columnKey)
    }
  }

  const getSortIcon = (columnKey: string) => {
    if (sort === columnKey) {
      return <ArrowUp className="size-3.5" />
    }
    if (sort === `-${columnKey}`) {
      return <ArrowDown className="size-3.5" />
    }
    return <ArrowUpDown className="size-3.5" />
  }

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') {
      return 'text-center'
    }
    if (align === 'right') {
      return 'text-right'
    }
    return 'text-left'
  }

  const allSelected = Boolean(
    items && items.length > 0 && selectedKeys.length === items.length,
  )

  return (
    <div className={root()}>
      <div className={container()}>
        <table className={table()}>
          <thead className={header()}>
            <tr className={row()}>
              {selection === 'multiple' && (
                <th
                  className={head({
                    className: 'w-10',
                  })}
                >
                  <Checkbox
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {visibleColumns.map((col) => (
                <th
                  className={head({
                    className: getAlignClass(col.align),
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
                      className={sortButton()}
                      onClick={() => handleSort(col.key)}
                      type="button"
                    >
                      {col.label}
                      {getSortIcon(col.key)}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={body()}>
            {isEmpty ? (
              <tr>
                <td
                  className={emptyCell()}
                  colSpan={totalColumns}
                >
                  {emptySection ?? 'No data'}
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const key = String(item[itemKey])
                const isSelected = selectedKeys.includes(key)

                return (
                  <tr
                    className={row({
                      className: onRowClick ? 'cursor-pointer' : undefined,
                    })}
                    data-state={isSelected ? 'selected' : undefined}
                    key={key}
                    onClick={() => onRowClick?.(item)}
                  >
                    {selection === 'multiple' && (
                      <td
                        className={cell({
                          className: 'w-10',
                        })}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={(checked) => handleSelectRow(key, checked)}
                        />
                      </td>
                    )}
                    {visibleColumns.map((col) => (
                      <td
                        className={cell({
                          className: getAlignClass(col.align),
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
                        {col.selector
                          ? col.selector(item, index)
                          : (item[col.key as keyof T] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        <LoadingOverlay visible={loading} />
      </div>
      {pagination && !hidePagination && <Pagination {...pagination} />}
    </div>
  )
}

export { Table }
