import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  Map as MapIcon,
  PieChart,
  Plus,
  Send,
  Settings2,
  SquareTerminal,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import { Sidebar, useSidebar } from './sidebar'

const meta = {
  component: Sidebar,
  title: 'Layout/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function PageContent({ title = 'Page Content' }: { title?: string }) {
  const { state } = useSidebar()
  return (
    <Sidebar.Inset>
      <header className="flex h-12 items-center gap-2 border-b px-4">
        <Sidebar.Trigger />
        <span className="font-medium text-sm">
          Sidebar is {state}
        </span>
      </header>
      <div className="flex-1 p-6">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="mt-2 text-muted-foreground text-sm">
          This is the main content area. Use the trigger button or Ctrl+B to
          toggle the sidebar.
        </p>
      </div>
    </Sidebar.Inset>
  )
}

function SampleSidebarContent() {
  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-sm">OABus</span>
            <span className="truncate text-muted-foreground text-xs">Workspace</span>
          </div>
        </div>
      </Sidebar.Header>
      <Sidebar.Separator />
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>Platform</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button
                  isActive
                  tooltip="Dashboard"
                >
                  <SquareTerminal />
                  <span>Dashboard</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Models">
                  <Bot />
                  <span>Models</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Documentation">
                  <BookOpen />
                  <span>Documentation</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Settings">
                  <Settings2 />
                  <span>Settings</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.Group.Label>Projects</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Design Engineering">
                  <Frame />
                  <span>Design Engineering</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Sales & Marketing">
                  <PieChart />
                  <span>Sales &amp; Marketing</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Travel">
                  <MapIcon />
                  <span>Travel</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.Menu.Item>
            <Sidebar.Menu.Button tooltip="Support">
              <LifeBuoy />
              <span>Support</span>
            </Sidebar.Menu.Button>
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item>
            <Sidebar.Menu.Button tooltip="Feedback">
              <Send />
              <span>Feedback</span>
            </Sidebar.Menu.Button>
          </Sidebar.Menu.Item>
        </Sidebar.Menu>
      </Sidebar.Footer>
      <Sidebar.Rail />
    </>
  )
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <SampleSidebarContent />
      </Sidebar>
      <PageContent />
    </Sidebar.Provider>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-2 px-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Command className="size-4" />
            </div>
            <span className="font-semibold text-sm">Multi-Group</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Group.Label>Navigation</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button isActive>
                    <SquareTerminal />
                    <span>Home</span>
                  </Sidebar.Menu.Button>
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button>
                    <BookOpen />
                    <span>Docs</span>
                  </Sidebar.Menu.Button>
                  <Sidebar.Menu.Sub>
                    <Sidebar.Menu.Sub.Item>
                      <Sidebar.Menu.Sub.Button isActive>
                        <span>Getting Started</span>
                      </Sidebar.Menu.Sub.Button>
                    </Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Item>
                      <Sidebar.Menu.Sub.Button>
                        <span>API Reference</span>
                      </Sidebar.Menu.Sub.Button>
                    </Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Item>
                      <Sidebar.Menu.Sub.Button>
                        <span>Examples</span>
                      </Sidebar.Menu.Sub.Button>
                    </Sidebar.Menu.Sub.Item>
                  </Sidebar.Menu.Sub>
                </Sidebar.Menu.Item>
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.Group.Label>Analytics</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button>
                    <PieChart />
                    <span>Reports</span>
                  </Sidebar.Menu.Button>
                  <Sidebar.Menu.Badge>12</Sidebar.Menu.Badge>
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button>
                    <Frame />
                    <span>Dashboards</span>
                  </Sidebar.Menu.Button>
                  <Sidebar.Menu.Badge>3</Sidebar.Menu.Badge>
                </Sidebar.Menu.Item>
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.Group.Label>Settings</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button>
                    <Settings2 />
                    <span>Preferences</span>
                  </Sidebar.Menu.Button>
                </Sidebar.Menu.Item>
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.Menu.Item>
              <Sidebar.Menu.Button>
                <LifeBuoy />
                <span>Help</span>
              </Sidebar.Menu.Button>
            </Sidebar.Menu.Item>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <PageContent title="Groups & Sub-menus" />
    </Sidebar.Provider>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <Sidebar.Provider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SampleSidebarContent />
      </Sidebar>
      <PageContent title="Collapsed (Icon Mode)" />
    </Sidebar.Provider>
  ),
}

export const Floating: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar variant="floating">
        <SampleSidebarContent />
      </Sidebar>
      <PageContent title="Floating Variant" />
    </Sidebar.Provider>
  ),
}

export const Inset: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar variant="inset">
        <SampleSidebarContent />
      </Sidebar>
      <PageContent title="Inset Variant" />
    </Sidebar.Provider>
  ),
}

export const RightSide: Story = {
  render: () => (
    <Sidebar.Provider>
      <PageContent title="Right Side" />
      <Sidebar side="right">
        <SampleSidebarContent />
      </Sidebar>
    </Sidebar.Provider>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Sidebar.Provider
        onOpenChange={setOpen}
        open={open}
      >
        <Sidebar collapsible="icon">
          <SampleSidebarContent />
        </Sidebar>
        <Sidebar.Inset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <Sidebar.Trigger />
            <span className="font-medium text-sm">
              Controlled: {open ? 'expanded' : 'collapsed'}
            </span>
          </header>
          <div className="flex-1 p-6">
            <p className="text-muted-foreground text-sm">
              The sidebar state is controlled externally via useState.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-sm"
                onClick={() => setOpen(true)}
                type="button"
              >
                Expand
              </button>
              <button
                className="rounded-md border px-3 py-1.5 text-sm"
                onClick={() => setOpen(false)}
                type="button"
              >
                Collapse
              </button>
            </div>
          </div>
        </Sidebar.Inset>
      </Sidebar.Provider>
    )
  },
}

export const WithMenuActions: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-2 px-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-semibold text-sm">Actions Demo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Group.Label>Projects</Sidebar.Group.Label>
            <Sidebar.Group.Action>
              <Plus className="size-4" />
            </Sidebar.Group.Action>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                {['Project Alpha', 'Project Beta', 'Project Gamma'].map(
                  (name) => (
                    <Sidebar.Menu.Item key={name}>
                      <Sidebar.Menu.Button>
                        <Frame />
                        <span>{name}</span>
                      </Sidebar.Menu.Button>
                      <Sidebar.Menu.Action showOnHover>
                        <Trash2 className="size-4" />
                      </Sidebar.Menu.Action>
                    </Sidebar.Menu.Item>
                  ),
                )}
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <PageContent title="Menu Actions" />
    </Sidebar.Provider>
  ),
}

export const WithSkeleton: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-2 px-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <AudioWaveform className="size-4" />
            </div>
            <span className="font-semibold text-sm">Loading...</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Group.Label>Navigation</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Sidebar.Menu.Item key={i}>
                    <Sidebar.Menu.Skeleton showIcon />
                  </Sidebar.Menu.Item>
                ))}
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.Group.Label>Projects</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Sidebar.Menu.Item key={i}>
                    <Sidebar.Menu.Skeleton />
                  </Sidebar.Menu.Item>
                ))}
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <PageContent title="Skeleton Loading" />
    </Sidebar.Provider>
  ),
}

export const OutlineVariant: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-2 px-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="size-4" />
            </div>
            <span className="font-semibold text-sm">Outline Buttons</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Group.Label>Menu</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button
                    isActive
                    variant="outline"
                  >
                    <SquareTerminal />
                    <span>Dashboard</span>
                  </Sidebar.Menu.Button>
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button variant="outline">
                    <Settings2 />
                    <span>Settings</span>
                  </Sidebar.Menu.Button>
                </Sidebar.Menu.Item>
                <Sidebar.Menu.Item>
                  <Sidebar.Menu.Button variant="outline">
                    <BookOpen />
                    <span>Documentation</span>
                  </Sidebar.Menu.Button>
                </Sidebar.Menu.Item>
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <PageContent title="Outline Button Variant" />
    </Sidebar.Provider>
  ),
}

export const SmallButtons: Story = {
  render: () => (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-2 px-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="size-4" />
            </div>
            <span className="font-semibold text-sm">Small Size</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Group.Label>Compact Menu</Sidebar.Group.Label>
            <Sidebar.Group.Content>
              <Sidebar.Menu>
                {[
                  { icon: SquareTerminal, label: 'Dashboard' },
                  { icon: Bot, label: 'Models' },
                  { icon: BookOpen, label: 'Docs' },
                  { icon: Settings2, label: 'Settings' },
                  { icon: Frame, label: 'Projects' },
                  { icon: PieChart, label: 'Analytics' },
                ].map(({ icon: Icon, label }) => (
                  <Sidebar.Menu.Item key={label}>
                    <Sidebar.Menu.Button size="sm">
                      <Icon />
                      <span>{label}</span>
                    </Sidebar.Menu.Button>
                  </Sidebar.Menu.Item>
                ))}
              </Sidebar.Menu>
            </Sidebar.Group.Content>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <PageContent title="Small Button Size" />
    </Sidebar.Provider>
  ),
}

// ---------------------------------------------------------------------------
// Element stories (isolated sub-components)
// ---------------------------------------------------------------------------

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar.Provider>
      <Sidebar collapsible="none">
        <div className="w-64">{children}</div>
      </Sidebar>
    </Sidebar.Provider>
  )
}

export const ElementMenuButton = {
  name: 'Element: Menu.Button',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>Button Variants</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <SquareTerminal />
                  <span>Default</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button isActive>
                  <Bot />
                  <span>Active</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button variant="outline">
                  <BookOpen />
                  <span>Outline</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button
                  isActive
                  variant="outline"
                >
                  <Settings2 />
                  <span>Outline Active</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
    </SidebarWrapper>
  ),
}

export const ElementMenuButtonSizes = {
  name: 'Element: Menu.Button Sizes',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>Size: sm</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button size="sm">
                  <SquareTerminal />
                  <span>Small item</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.Group.Label>Size: default</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button size="default">
                  <Bot />
                  <span>Default item</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.Group.Label>Size: lg</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button size="lg">
                  <BookOpen />
                  <span>Large item</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
    </SidebarWrapper>
  ),
}

export const ElementSubMenu = {
  name: 'Element: Sub Menu',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>Nested Navigation</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button isActive>
                  <BookOpen />
                  <span>Documentation</span>
                  <ChevronRight className="ml-auto size-4" />
                </Sidebar.Menu.Button>
                <Sidebar.Menu.Sub>
                  <Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Button isActive>
                      <span>Introduction</span>
                    </Sidebar.Menu.Sub.Button>
                  </Sidebar.Menu.Sub.Item>
                  <Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Button>
                      <span>Installation</span>
                    </Sidebar.Menu.Sub.Button>
                  </Sidebar.Menu.Sub.Item>
                  <Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Button>
                      <span>Configuration</span>
                    </Sidebar.Menu.Sub.Button>
                  </Sidebar.Menu.Sub.Item>
                  <Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Button>
                      <span>Deployment</span>
                    </Sidebar.Menu.Sub.Button>
                  </Sidebar.Menu.Sub.Item>
                </Sidebar.Menu.Sub>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <Settings2 />
                  <span>API Reference</span>
                  <ChevronRight className="ml-auto size-4" />
                </Sidebar.Menu.Button>
                <Sidebar.Menu.Sub>
                  <Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Button>
                      <span>Authentication</span>
                    </Sidebar.Menu.Sub.Button>
                  </Sidebar.Menu.Sub.Item>
                  <Sidebar.Menu.Sub.Item>
                    <Sidebar.Menu.Sub.Button>
                      <span>Endpoints</span>
                    </Sidebar.Menu.Sub.Button>
                  </Sidebar.Menu.Sub.Item>
                </Sidebar.Menu.Sub>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
    </SidebarWrapper>
  ),
}

export const ElementMenuBadge = {
  name: 'Element: Menu.Badge',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>With Badges</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <Send />
                  <span>Inbox</span>
                </Sidebar.Menu.Button>
                <Sidebar.Menu.Badge>24</Sidebar.Menu.Badge>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <LifeBuoy />
                  <span>Support</span>
                </Sidebar.Menu.Button>
                <Sidebar.Menu.Badge>3</Sidebar.Menu.Badge>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <Bot />
                  <span>Models</span>
                </Sidebar.Menu.Button>
                <Sidebar.Menu.Badge>New</Sidebar.Menu.Badge>
              </Sidebar.Menu.Item>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <Settings2 />
                  <span>Settings</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
    </SidebarWrapper>
  ),
}

export const ElementMenuAction = {
  name: 'Element: Menu.Action',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>With Actions</Sidebar.Group.Label>
          <Sidebar.Group.Action>
            <Plus className="size-4" />
          </Sidebar.Group.Action>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              {['Alpha', 'Beta', 'Gamma', 'Delta'].map((name) => (
                <Sidebar.Menu.Item key={name}>
                  <Sidebar.Menu.Button>
                    <Frame />
                    <span>Project {name}</span>
                  </Sidebar.Menu.Button>
                  <Sidebar.Menu.Action showOnHover>
                    <Trash2 className="size-4" />
                  </Sidebar.Menu.Action>
                </Sidebar.Menu.Item>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
    </SidebarWrapper>
  ),
}

export const ElementHeaderFooter = {
  name: 'Element: Header & Footer',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Header>
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">App Name</span>
            <span className="text-muted-foreground text-xs">v1.0.0</span>
          </div>
        </div>
      </Sidebar.Header>
      <Sidebar.Separator />
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button>
                  <SquareTerminal />
                  <span>Content area</span>
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Separator />
      <Sidebar.Footer>
        <div className="flex items-center gap-2 px-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <span className="font-medium text-xs">JD</span>
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium text-sm">John Doe</span>
            <span className="truncate text-muted-foreground text-xs">
              john@example.com
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
        </div>
      </Sidebar.Footer>
    </SidebarWrapper>
  ),
}

export const ElementSkeleton = {
  name: 'Element: Skeleton',
  render: () => (
    <SidebarWrapper>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Group.Label>With Icon</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              {Array.from({ length: 4 }).map((_, i) => (
                <Sidebar.Menu.Item key={i}>
                  <Sidebar.Menu.Skeleton showIcon />
                </Sidebar.Menu.Item>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
        <Sidebar.Separator />
        <Sidebar.Group>
          <Sidebar.Group.Label>Without Icon</Sidebar.Group.Label>
          <Sidebar.Group.Content>
            <Sidebar.Menu>
              {Array.from({ length: 3 }).map((_, i) => (
                <Sidebar.Menu.Item key={i}>
                  <Sidebar.Menu.Skeleton />
                </Sidebar.Menu.Item>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group.Content>
        </Sidebar.Group>
      </Sidebar.Content>
    </SidebarWrapper>
  ),
}
