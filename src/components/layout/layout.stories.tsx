import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BadgeCheck,
  BarChart2,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Home,
  LogOut,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '@/components/avatar'
import { DropdownMenu } from '@/components/dropdown-menu'

import { Layout } from './layout'
import { Sidebar } from './sidebar'

const meta = {
  parameters: {
    centeredLayout: false,
    layout: 'fullscreen',
  },
  title: 'Layout/Layout',
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Shared nav data ──────────────────────────────────────────────────────────

const navMain = [
  {
    active: true,
    href: '#',
    icon: Home,
    label: 'Dashboard',
  },
  {
    href: '#',
    icon: BarChart2,
    label: 'Analytics',
  },
  {
    badge: '3',
    href: '#',
    icon: Bell,
    label: 'Notifications',
  },
]

const navSettings = [
  {
    children: [
      {
        href: '#',
        label: 'General',
      },
      {
        href: '#',
        label: 'Security',
      },
      {
        href: '#',
        label: 'Appearance',
      },
    ],
    icon: Settings,
    label: 'Settings',
  },
  {
    children: [
      {
        href: '#',
        label: 'Members',
      },
      {
        href: '#',
        label: 'Roles',
      },
    ],
    icon: Users,
    label: 'Team',
  },
]

export const Default: Story = {
  name: 'Default',
  render: () => {
    const [settingsOpen, setSettingsOpen] = useState(true)
    const [teamOpen, setTeamOpen] = useState(false)

    return (
      <Sidebar.Provider defaultOpen>
        <Sidebar
          collapsible="icon"
          side="left"
          variant="sidebar"
        >
          <Sidebar.Header>
            <div className="flex items-center gap-2 px-1 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
                OA
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">OABus</span>
                <span className="truncate text-muted-foreground text-xs">
                  Enterprise
                </span>
              </div>
            </div>
            <Sidebar.Separator />
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.Group.Label>Navigation</Sidebar.Group.Label>
              <Sidebar.Group.Content>
                <Sidebar.Menu>
                  {navMain.map((item) => (
                    <Sidebar.Menu.Item key={item.label}>
                      <Sidebar.Menu.Button
                        isActive={item.active}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Sidebar.Menu.Badge>{item.badge}</Sidebar.Menu.Badge>
                        )}
                      </Sidebar.Menu.Button>
                    </Sidebar.Menu.Item>
                  ))}
                </Sidebar.Menu>
              </Sidebar.Group.Content>
            </Sidebar.Group>

            <Sidebar.Separator />

            <Sidebar.Group>
              <Sidebar.Group.Label>Management</Sidebar.Group.Label>
              <Sidebar.Group.Content>
                <Sidebar.Menu>
                  {navSettings.map((item) => {
                    const isOpen =
                      item.label === 'Settings' ? settingsOpen : teamOpen
                    const setOpen =
                      item.label === 'Settings' ? setSettingsOpen : setTeamOpen
                    return (
                      <Sidebar.Menu.Item key={item.label}>
                        <Sidebar.Menu.Collapsible
                          label={item.label}
                          onOpenChange={setOpen}
                          open={isOpen}
                        >
                          <Sidebar.Menu.Collapsible.Trigger
                            tooltip={item.label}
                          >
                            <item.icon />
                            <span>{item.label}</span>
                          </Sidebar.Menu.Collapsible.Trigger>
                          <Sidebar.Menu.Collapsible.Content>
                            <Sidebar.Menu.Sub>
                              {item.children.map((child) => (
                                <Sidebar.Menu.Sub.Item key={child.label}>
                                  <Sidebar.Menu.Sub.Button href={child.href}>
                                    {child.label}
                                  </Sidebar.Menu.Sub.Button>
                                </Sidebar.Menu.Sub.Item>
                              ))}
                            </Sidebar.Menu.Sub>
                          </Sidebar.Menu.Collapsible.Content>
                        </Sidebar.Menu.Collapsible>
                      </Sidebar.Menu.Item>
                    )
                  })}
                </Sidebar.Menu>
              </Sidebar.Group.Content>
            </Sidebar.Group>
          </Sidebar.Content>

          <Sidebar.Footer>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <DropdownMenu>
                  <DropdownMenu.Trigger asChild>
                    <Sidebar.Menu.Button
                      size="lg"
                      tooltip="Account options"
                    >
                      <Avatar size="sm">RJ</Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          Roberto Jr
                        </span>
                        <span className="truncate text-muted-foreground text-xs">
                          rbjunior000@gmail.com
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </Sidebar.Menu.Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    align="end"
                    side="right"
                    sideOffset={4}
                  >
                    <div className="flex items-center gap-2 px-1.5 py-1.5 text-sm">
                      <Avatar size="sm">RJ</Avatar>
                      <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate font-semibold">
                          Roberto Jr
                        </span>
                        <span className="truncate text-muted-foreground text-xs">
                          rbjunior000@gmail.com
                        </span>
                      </div>
                    </div>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Group>
                      <DropdownMenu.Item>
                        <Sparkles />
                        Upgrade to Pro
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Group>
                      <DropdownMenu.Item>
                        <BadgeCheck />
                        Account
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <CreditCard />
                        Billing
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <Bell />
                        Notifications
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item variant="destructive">
                      <LogOut />
                      Sign out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Footer>
        </Sidebar>

        {/* Sidebar.Inset is already flex-col — Layout sub-components stack correctly inside it */}
        <Sidebar.Inset>
          <Layout.Header
            bordered
            sticky
          >
            <Sidebar.Trigger />
            <span className="ml-2 font-semibold text-sm">OABus</span>
            <div className="ml-auto flex items-center gap-2">
              <Avatar size="sm">RJ</Avatar>
            </div>
          </Layout.Header>

          <Layout.Main>
            <Layout.Content
              maxWidth="lg"
              padding="md"
            >
              <h1 className="mb-2 font-semibold text-2xl">Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Header and footer live inside{' '}
                <code className="text-xs">Sidebar.Inset</code> so they are never
                covered by the sidebar. Toggle with{' '}
                <kbd className="rounded border px-1 text-xs">⌘B</kbd> or the
                trigger.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  'Revenue',
                  'Users',
                  'Sessions',
                ].map((label) => (
                  <div
                    className="rounded-lg border p-4"
                    key={label}
                  >
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="mt-1 font-semibold text-2xl">—</p>
                  </div>
                ))}
              </div>
            </Layout.Content>
          </Layout.Main>

          <Layout.Footer
            bordered
            sticky
          >
            <span className="text-muted-foreground text-xs">© 2026 OABus</span>
          </Layout.Footer>
        </Sidebar.Inset>
      </Sidebar.Provider>
    )
  },
}
