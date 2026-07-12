import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'

import { Table } from './table'
import type { TableColumns } from './table.types'

type User = {
  age: number
  email: string
  id: string
  name: string
  role: string
  status: 'active' | 'inactive'
}

const users: User[] = [
  {
    age: 28,
    email: 'alice@example.com',
    id: '1',
    name: 'Alice Johnson',
    role: 'Admin',
    status: 'active',
  },
  {
    age: 34,
    email: 'bob@example.com',
    id: '2',
    name: 'Bob Smith',
    role: 'Editor',
    status: 'active',
  },
  {
    age: 22,
    email: 'carol@example.com',
    id: '3',
    name: 'Carol White',
    role: 'Viewer',
    status: 'inactive',
  },
  {
    age: 45,
    email: 'dave@example.com',
    id: '4',
    name: 'Dave Brown',
    role: 'Admin',
    status: 'active',
  },
  {
    age: 31,
    email: 'eve@example.com',
    id: '5',
    name: 'Eve Davis',
    role: 'Editor',
    status: 'inactive',
  },
  {
    age: 27,
    email: 'frank@example.com',
    id: '6',
    name: 'Frank Miller',
    role: 'Viewer',
    status: 'active',
  },
  {
    age: 39,
    email: 'grace@example.com',
    id: '7',
    name: 'Grace Lee',
    role: 'Admin',
    status: 'active',
  },
  {
    age: 26,
    email: 'henry@example.com',
    id: '8',
    name: 'Henry Wilson',
    role: 'Editor',
    status: 'inactive',
  },
]

const longContentUser: User = {
  age: 28,
  email:
    'alice.johnson.with.a.deliberately.long.address@operations.oabus.example.com',
  id: 'long-content',
  name: 'Alice Johnson with a deliberately long unbroken identifier 1234567890',
  role: 'Administrator',
  status: 'active',
}

const overflowValue =
  'oabus:table:content:with:no:natural:breaking:point:0123456789abcdefghijklmnopqrstuvwxyz'

type OverflowPolicyExample = {
  clip: string
  id: string
  sentinel: string
  truncate: string
  wrap: string
}

const columns: TableColumns<User> = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'role',
    label: 'Role',
  },
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
    items: users.slice(0, 5),
  },
}

export const WithSelection = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Selected: {selectedKeys.length ? selectedKeys.join(', ') : 'none'}
        </p>
        <Table<User>
          columns={columns}
          itemKey="id"
          items={users.slice(0, 5)}
          onSelectionChange={setSelectedKeys}
          selectedKeys={selectedKeys}
          selection="multiple"
        />
      </div>
    )
  },
}

export const WithSorting = {
  render: () => {
    const [sort, setSort] = useState<string | undefined>()

    const sortableColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Name',
        sorter: true,
      },
      {
        key: 'email',
        label: 'Email',
      },
      {
        align: 'center',
        key: 'age',
        label: 'Age',
        sorter: true,
      },
      {
        key: 'role',
        label: 'Role',
      },
    ]

    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Current sort: {sort ?? 'none'}
        </p>
        <Table<User>
          columns={sortableColumns}
          itemKey="id"
          items={users.slice(0, 5)}
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
    const [rowsPerPage, setRowsPerPage] = useState(3)
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

export const WithCustomCells = {
  render: () => {
    const customColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'email',
        label: 'Email',
      },
      {
        key: 'status',
        label: 'Status',
        selector: (row) => (
          <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
            {row.status}
          </Badge>
        ),
      },
      {
        align: 'center',
        key: 'age',
        label: 'Age',
        selector: (row) => <span className="font-mono">{row.age}</span>,
      },
      {
        key: 'role',
        label: 'Role',
      },
    ]

    return (
      <Table<User>
        columns={customColumns}
        itemKey="id"
        items={users}
      />
    )
  },
}

export const WithRowClick = {
  render: () => {
    const [clicked, setClicked] = useState<string | null>(null)

    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Clicked: {clicked ?? 'none'}
        </p>
        <Table<User>
          columns={columns}
          itemKey="id"
          items={users.slice(0, 5)}
          onRowClick={(row) => setClicked(row.name)}
        />
      </div>
    )
  },
}

export const WithColumnWidths = {
  render: () => {
    const widthColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Name',
        width: 200,
      },
      {
        key: 'email',
        label: 'Email',
      },
      {
        align: 'center',
        key: 'age',
        label: 'Age',
        width: 80,
      },
      {
        align: 'right',
        key: 'role',
        label: 'Role',
        width: 120,
      },
    ]

    return (
      <Table<User>
        columns={widthColumns}
        itemKey="id"
        items={users.slice(0, 5)}
      />
    )
  },
}

export const WithHiddenColumns = {
  render: () => {
    const hiddenColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'email',
        label: 'Email',
      },
      {
        hide: true,
        key: 'age',
        label: 'Age',
      },
      {
        key: 'role',
        label: 'Role',
      },
      {
        hide: true,
        key: 'status',
        label: 'Status',
      },
    ]

    return (
      <Table<User>
        columns={hiddenColumns}
        itemKey="id"
        items={users.slice(0, 5)}
      />
    )
  },
}

export const Complete = {
  render: () => {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const [sort, setSort] = useState<string | undefined>()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const sorted = [
      ...users,
    ].sort((a, b) => {
      if (!sort) {
        return 0
      }
      const desc = sort.startsWith('-')
      const key = (desc ? sort.slice(1) : sort) as keyof User
      const av = a[key]
      const bv = b[key]
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return desc ? -cmp : cmp
    })

    const total = sorted.length
    const paginatedItems = sorted.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage,
    )

    const completeColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Name',
        sorter: true,
      },
      {
        key: 'email',
        label: 'Email',
      },
      {
        align: 'center',
        key: 'age',
        label: 'Age',
        sorter: true,
        width: 80,
      },
      {
        key: 'status',
        label: 'Status',
        selector: (row) => (
          <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
            {row.status}
          </Badge>
        ),
        sorter: true,
      },
      {
        key: 'role',
        label: 'Role',
        sorter: true,
      },
    ]

    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Selected: {selectedKeys.length} | Sort: {sort ?? 'none'}
        </p>
        <Table<User>
          columns={completeColumns}
          itemKey="id"
          items={paginatedItems}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSort}
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
          selectedKeys={selectedKeys}
          selection="multiple"
          sort={sort}
        />
      </div>
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
    items: users.slice(0, 5),
    loading: true,
  },
}

export const LongScalarAndSortableHeader = {
  render: () => {
    const [sort, setSort] = useState<string | undefined>()
    const proofColumns: TableColumns<User> = [
      {
        key: 'name',
        label:
          'A deliberately long sortable header that must preserve its icon',
        sorter: true,
        width: 180,
      },
      {
        key: 'role',
        label: 'Sentinel',
        selector: () => (
          <span className="rounded bg-emerald-600 px-2 py-1 font-semibold text-white text-xs">
            VISIBLE
          </span>
        ),
        width: 120,
      },
    ]

    return (
      <div className="flex w-[360px] flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          The long scalar and header truncate. Sort: {sort ?? 'none'}
        </p>
        <Table<User>
          columns={proofColumns}
          itemKey="id"
          items={[
            longContentUser,
          ]}
          onSortChange={setSort}
          sort={sort}
        />
      </div>
    )
  },
}

export const ExplicitOverflowPolicies = {
  render: () => {
    const policyColumns: TableColumns<OverflowPolicyExample> = [
      {
        key: 'truncate',
        label: 'Truncate',
        overflow: 'truncate',
        width: 160,
      },
      {
        key: 'wrap',
        label: 'Wrap',
        overflow: 'wrap',
        width: 160,
      },
      {
        key: 'clip',
        label: 'Clip',
        overflow: 'clip',
        width: 160,
      },
      {
        key: 'sentinel',
        label: 'Sentinel',
        selector: () => (
          <span className="rounded bg-emerald-600 px-2 py-1 font-semibold text-white text-xs">
            VISIBLE
          </span>
        ),
        width: 120,
      },
    ]

    return (
      <div className="flex w-[640px] flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          The same value uses ellipsis, wrapping, and clipping without covering
          the sentinel.
        </p>
        <Table<OverflowPolicyExample>
          columns={policyColumns}
          itemKey="id"
          items={[
            {
              clip: overflowValue,
              id: 'overflow-policies',
              sentinel: 'VISIBLE',
              truncate: overflowValue,
              wrap: overflowValue,
            },
          ]}
        />
      </div>
    )
  },
}

export const MixedWidthsWithSelection = {
  render: () => {
    const mixedColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Fixed 140px',
        width: 140,
      },
      {
        key: 'email',
        label: 'Automatic column absorbs the remaining space',
      },
      {
        key: 'role',
        label: 'Fixed 90px',
        width: 90,
      },
    ]

    return (
      <div className="flex w-[560px] flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Selection stays 40px while the automatic column receives free space.
        </p>
        <Table<User>
          columns={mixedColumns}
          defaultSelectedKeys={[
            longContentUser.id,
          ]}
          itemKey="id"
          items={[
            longContentUser,
          ]}
          selection="multiple"
        />
      </div>
    )
  },
}

export const CompositeCellPreservesFocus = {
  render: () => {
    const compositeColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Composite cell without an explicit overflow policy',
        selector: () => (
          <Button
            size="sm"
            variant="outline"
          >
            Focus me with Tab
          </Button>
        ),
        width: 260,
      },
      {
        key: 'role',
        label: 'Sentinel',
        selector: () => (
          <span className="rounded bg-emerald-600 px-2 py-1 font-semibold text-white text-xs">
            VISIBLE
          </span>
        ),
        width: 120,
      },
    ]

    return (
      <div className="flex w-[440px] flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Tab to the button: its external focus ring remains visible.
        </p>
        <Table<User>
          columns={compositeColumns}
          itemKey="id"
          items={[
            longContentUser,
          ]}
        />
      </div>
    )
  },
}

export const WithMinimumWidthScrolling = {
  render: () => {
    const scrollingColumns: TableColumns<User> = [
      {
        key: 'name',
        label: 'Name',
        width: 240,
      },
      {
        key: 'email',
        label: 'Email',
        width: 240,
      },
      {
        key: 'role',
        label: 'Role',
        width: 240,
      },
    ]

    return (
      <div className="flex w-[360px] flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Scroll horizontally: the 720px table is inside a 360px container.
        </p>
        <Table<User>
          columns={scrollingColumns}
          itemKey="id"
          items={[
            longContentUser,
          ]}
          minWidth={720}
        />
      </div>
    )
  },
}
