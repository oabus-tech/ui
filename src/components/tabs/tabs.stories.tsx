import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart2Icon, SettingsIcon, UserIcon, icons } from 'lucide-react'
import { useState } from 'react'

import { Tabs } from './tabs'

icons.

const meta = {
  component: Tabs,
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'account',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="account">Conta</Tabs.Trigger>
        <Tabs.Trigger value="password">Senha</Tabs.Trigger>
        <Tabs.Trigger value="settings">Configurações</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <p className="text-muted-foreground text-sm">
          Gerencie as informações da sua conta.
        </p>
      </Tabs.Content>
      <Tabs.Content value="password">
        <p className="text-muted-foreground text-sm">Altere sua senha aqui.</p>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <p className="text-muted-foreground text-sm">
          Ajuste suas preferências.
        </p>
      </Tabs.Content>
    </Tabs>
  ),
}

export const Justified: Story = {
  args: {
    defaultValue: 'account',
  },
  render: (args) => (
    <div className="w-96">
      <Tabs {...args}>
        <Tabs.List justified>
          <Tabs.Trigger value="account">Conta</Tabs.Trigger>
          <Tabs.Trigger value="password">Senha</Tabs.Trigger>
          <Tabs.Trigger value="settings">Configurações</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <p className="text-muted-foreground text-sm">
            Gerencie as informações da sua conta.
          </p>
        </Tabs.Content>
        <Tabs.Content value="password">
          <p className="text-muted-foreground text-sm">
            Altere sua senha aqui.
          </p>
        </Tabs.Content>
        <Tabs.Content value="settings">
          <p className="text-muted-foreground text-sm">
            Ajuste suas preferências.
          </p>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    defaultValue: 'profile',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger
          icon={<UserIcon  />}
          value="profile"
        >
          Perfil
        </Tabs.Trigger>
        <Tabs.Trigger
          icon={<BarChart2Icon />}
          value="analytics"
        >
          Analytics
        </Tabs.Trigger>
        <Tabs.Trigger
          icon={<SettingsIcon />}
          value="settings"
        >
          Configurações
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="profile">
        <p className="text-muted-foreground text-sm">Informações do perfil.</p>
      </Tabs.Content>
      <Tabs.Content value="analytics">
        <p className="text-muted-foreground text-sm">Dados e métricas.</p>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <p className="text-muted-foreground text-sm">Preferências da conta.</p>
      </Tabs.Content>
    </Tabs>
  ),
}

export const Vertical: Story = {
  args: {
    defaultValue: 'account',
    orientation: 'vertical',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="account">Conta</Tabs.Trigger>
        <Tabs.Trigger value="password">Senha</Tabs.Trigger>
        <Tabs.Trigger value="settings">Configurações</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <p className="text-muted-foreground text-sm">
          Gerencie as informações da sua conta.
        </p>
      </Tabs.Content>
      <Tabs.Content value="password">
        <p className="text-muted-foreground text-sm">Altere sua senha aqui.</p>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <p className="text-muted-foreground text-sm">
          Ajuste suas preferências.
        </p>
      </Tabs.Content>
    </Tabs>
  ),
}

export const Controlled: Story = {
  args: {
    defaultValue: 'account',
  },
  render: () => {
    const [tab, setTab] = useState('account')
    return (
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-xs">
          Tab ativo: <code>{tab}</code>
        </p>
        <Tabs
          onChange={setTab}
          value={tab}
        >
          <Tabs.List>
            <Tabs.Trigger value="account">Conta</Tabs.Trigger>
            <Tabs.Trigger value="password">Senha</Tabs.Trigger>
            <Tabs.Trigger value="settings">Configurações</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account">
            <p className="text-muted-foreground text-sm">
              Gerencie as informações da sua conta.
            </p>
          </Tabs.Content>
          <Tabs.Content value="password">
            <p className="text-muted-foreground text-sm">
              Altere sua senha aqui.
            </p>
          </Tabs.Content>
          <Tabs.Content value="settings">
            <p className="text-muted-foreground text-sm">
              Ajuste suas preferências.
            </p>
          </Tabs.Content>
        </Tabs>
      </div>
    )
  },
}
