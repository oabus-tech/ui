import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Switch } from './switch'

const meta = {
  component: Switch,
  title: 'Components/Switch',
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Modo escuro',
  },
}

export const WithDescription: Story = {
  args: {
    description: 'Ativa o tema escuro na interface.',
    label: 'Modo escuro',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Notificações',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Recurso indisponível',
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Recurso indisponível',
  },
}

export const Bordered: Story = {
  args: {
    bordered: true,
    description: 'Receba alertas em tempo real.',
    label: 'Notificações push',
  },
}

export const SizeSm: Story = {
  args: {
    label: 'Pequeno',
    size: 'sm',
  },
}

export const SizeLg: Story = {
  args: {
    label: 'Grande',
    size: 'lg',
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        checked={checked}
        description={checked ? 'Ativado' : 'Desativado'}
        label="Sincronização"
        onCheckedChange={setChecked}
      />
    )
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch
        label="Pequeno"
        size="sm"
      />
      <Switch
        label="Médio"
        size="md"
      />
      <Switch
        label="Grande"
        size="lg"
      />
    </div>
  ),
}
