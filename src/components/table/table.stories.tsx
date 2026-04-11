import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Badge } from '@/components/badge'

import { Table } from './table'
import type { TableColumns } from './table.types'

type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const users: User[] = [
  {
    email: 'ana@email.com',
    id: '1',
    name: 'Ana Silva',
    role: 'Admin',
    status: 'active',
  },
  {
    email: 'carlos@email.com',
    id: '2',
    name: 'Carlos Mendes',
    role: 'Editor',
    status: 'active',
  },
  {
    email: 'beatriz@email.com',
    id: '3',
    name: 'Beatriz Souza',
    role: 'Viewer',
    status: 'inactive',
  },
  {
    email: 'diego@email.com',
    id: '4',
    name: 'Diego Rocha',
    role: 'Editor',
    status: 'active',
  },
  {
    email: 'elena@email.com',
    id: '5',
    name: 'Elena Costa',
    role: 'Viewer',
    status: 'inactive',
  },
]

const columns: TableColumns<User> = [
  {
    key: 'name',
    label: 'Nome',
    sorter: true,
  },
  {
    key: 'email',
    label: 'E-mail',
  },
  {
    align: 'center' as const,
    key: 'role',
    label: 'Perfil',
  },
  {
    align: 'center' as const,
    key: 'status',
    label: 'Status',
    selector: (row: User) => (
      <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
        {row.status === 'active' ? 'Ativo' : 'Inativo'}
      </Badge>
    ),
  },
]

const meta = {
  component: Table,
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: users,
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

export const Empty: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: [],
  },
}

export const WithCustomEmpty: Story = {
  args: {
    columns,
    emptySection: (
      <span className="text-muted-foreground">
        Nenhum usuário cadastrado ainda.
      </span>
    ),
    itemKey: 'id',
    items: [],
  },
}

export const WithSort: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: users,
  },
  render: () => {
    const [sort, setSort] = useState<string | undefined>(undefined)
    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-xs">
          Sort atual: <code>{sort ?? '—'}</code>
        </p>
        <Table
          columns={columns}
          itemKey="id"
          items={users}
          onSortChange={setSort}
          sort={sort}
        />
      </div>
    )
  },
}

export const WithSelection: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: users,
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-xs">
          Selecionados: {selected.length === 0 ? '—' : selected.join(', ')}
        </p>
        <Table
          columns={columns}
          itemKey="id"
          items={users}
          onSelectionChange={setSelected}
          selectedKeys={selected}
          selection="multiple"
        />
      </div>
    )
  },
}

export const WithRowClick: Story = {
  args: {
    columns,
    itemKey: 'id',
    items: users,
  },
  render: () => {
    const [clicked, setClicked] = useState<User | null>(null)
    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-xs">
          Clicado: {clicked ? clicked.name : '—'}
        </p>
        <Table
          columns={columns}
          itemKey="id"
          items={users}
          onRowClick={setClicked}
        />
      </div>
    )
  },
}

export const WithHiddenColumn: Story = {
  args: {
    columns: [
      ...columns,
      {
        hide: true,
        key: 'id',
        label: 'ID',
      },
    ],
    itemKey: 'id',
    items: users,
  },
}

export const WithFixedWidth: Story = {
  args: {
    columns: [
      {
        key: 'name',
        label: 'Nome',
        width: 200,
      },
      {
        key: 'email',
        label: 'E-mail',
        width: 240,
      },
      {
        align: 'center' as const,
        key: 'role',
        label: 'Perfil',
        width: 100,
      },
    ],
    itemKey: 'id',
    items: users,
  },
}
