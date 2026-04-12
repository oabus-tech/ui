import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import type { TableColumns } from './table.types'
import { Table } from './table'

type User = {
  age: number
  email: string
  id: string
  name: string
  role: string
}

const users: User[] = [
  { age: 28, email: 'alice@example.com', id: '1', name: 'Alice', role: 'Admin' },
  { age: 34, email: 'bob@example.com', id: '2', name: 'Bob', role: 'Editor' },
  { age: 22, email: 'carol@example.com', id: '3', name: 'Carol', role: 'Viewer' },
  { age: 45, email: 'dave@example.com', id: '4', name: 'Dave', role: 'Admin' },
  { age: 31, email: 'eve@example.com', id: '5', name: 'Eve', role: 'Editor' },
]

const columns: TableColumns<User> = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
]

const meta = {
  component: Table<User>,
  title: 'Data Display/Table',
} satisfies Meta<typeof Table<User>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: users,
  },
}

export const WithSelection = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    return (
      <Table<User>
        columns={columns}
        itemKey="id"
        items={users}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
        selection="multiple"
      />
    )
  },
}

export const WithSorting = {
  render: () => {
    const [sort, setSort] = useState<string | undefined>()

    const sortableColumns: TableColumns<User> = [
      { key: 'name', label: 'Name', sorter: true },
      { key: 'email', label: 'Email' },
      { align: 'center', key: 'age', label: 'Age', sorter: true },
      { key: 'role', label: 'Role' },
    ]

    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Current sort: {sort ?? 'none'}
        </p>
        <Table<User>
          columns={sortableColumns}
          itemKey="id"
          items={users}
          onSortChange={setSort}
          sort={sort}
        />
      </div>
    )
  },
}

export const WithPagination = {
  render: () => {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(2)
    const total = users.length
    const paginatedItems = users.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage,
    )

    return (
      <Table<User>
        columns={columns}
        itemKey="id"
        items={paginatedItems}
        pagination={{
          mode: 'offset',
          onPageChange: setPage,
          onRowsPerPageChange: (rpp) => {
            setRowsPerPage(rpp)
            setPage(1)
          },
          page,
          rowsPerPage,
          total,
        }}
      />
    )
  },
}

export const Empty = {
  args: {
    columns,
    emptySection: (
      <div className="flex flex-col items-center gap-2 py-8">
        <p className="font-medium text-lg">No users found</p>
        <p className="text-muted-foreground text-sm">
          Try adjusting your search or filters.
        </p>
      </div>
    ),
    itemKey: 'id',
    items: [],
  },
}

export const Loading: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: users,
    loading: true,
  },
}
