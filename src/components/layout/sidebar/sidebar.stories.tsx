import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BarChart2,
  Bell,
  BookOpen,
  ChevronDown,
  CreditCard,
  Home,
  LifeBuoy,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";

import { Sidebar } from "./sidebar";

const meta = {
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  title: "Layout/Sidebar",
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Shared nav data ──────────────────────────────────────────────────────────

const navMain = [
  {
    active: true,
    href: "#",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "#",
    icon: BarChart2,
    label: "Analytics",
  },
  {
    badge: "3",
    href: "#",
    icon: Bell,
    label: "Notifications",
  },
];

const navSettings = [
  {
    children: [
      {
        href: "#",
        label: "General",
      },
      {
        href: "#",
        label: "Security",
      },
      {
        href: "#",
        label: "Appearance",
      },
    ],
    icon: Settings,
    label: "Settings",
  },
  {
    children: [
      {
        href: "#",
        label: "Members",
      },
      {
        href: "#",
        label: "Roles",
      },
      {
        href: "#",
        label: "Invites",
      },
    ],
    icon: Users,
    label: "Team",
  },
];

const navSecondary = [
  {
    href: "#",
    icon: BookOpen,
    label: "Docs",
  },
  {
    href: "#",
    icon: LifeBuoy,
    label: "Support",
  },
];

// ─── Story: Full sidebar (collapsed + submenus) ───────────────────────────────

/**
 * Full sidebar demo:
 * - Toggle between expanded and icon-collapsed mode using the trigger or ⌘B
 * - In icon mode, collapsible groups appear as popovers anchored to the icon
 * - Tooltips on plain buttons reveal labels in icon mode
 * - Sub-menus are always accessible via the collapsible pattern
 */
export const Default: Story = {
  render: () => {
    const [settingsOpen, setSettingsOpen] = useState(true);
    const [teamOpen, setTeamOpen] = useState(false);

    return (
      <Sidebar.Provider defaultOpen>
        {/* ── Sidebar ── */}
        <Sidebar collapsible="icon" side="left" variant="sidebar">
          {/* Header */}
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
              <ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
            </div>
            <Sidebar.Separator />
          </Sidebar.Header>

          {/* Content */}
          <Sidebar.Content>
            {/* Primary nav */}
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

            {/* Collapsible groups */}
            <Sidebar.Group>
              <Sidebar.Group.Label>Management</Sidebar.Group.Label>
              <Sidebar.Group.Content>
                <Sidebar.Menu>
                  {navSettings.map((item) => {
                    const isOpen =
                      item.label === "Settings" ? settingsOpen : teamOpen;
                    const setOpen =
                      item.label === "Settings" ? setSettingsOpen : setTeamOpen;

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
                                    <span>{child.label}</span>
                                  </Sidebar.Menu.Sub.Button>
                                </Sidebar.Menu.Sub.Item>
                              ))}
                            </Sidebar.Menu.Sub>
                          </Sidebar.Menu.Collapsible.Content>
                        </Sidebar.Menu.Collapsible>
                      </Sidebar.Menu.Item>
                    );
                  })}
                </Sidebar.Menu>
              </Sidebar.Group.Content>
            </Sidebar.Group>

            {/* Loading skeleton example */}
            <Sidebar.Group>
              <Sidebar.Group.Label>Loading state</Sidebar.Group.Label>
              <Sidebar.Group.Content>
                <Sidebar.Menu>
                  {Array.from({
                    length: 3,
                  }).map((_, i) => (
                    <Sidebar.Menu.Item key={i}>
                      <Sidebar.Menu.Skeleton showIcon />
                    </Sidebar.Menu.Item>
                  ))}
                </Sidebar.Menu>
              </Sidebar.Group.Content>
            </Sidebar.Group>

            {/* Secondary nav pushed to bottom */}
            <div className="mt-auto">
              <Sidebar.Separator />
              <Sidebar.Group>
                <Sidebar.Group.Content>
                  <Sidebar.Menu>
                    {navSecondary.map((item) => (
                      <Sidebar.Menu.Item key={item.label}>
                        <Sidebar.Menu.Button tooltip={item.label}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Sidebar.Menu.Button>
                      </Sidebar.Menu.Item>
                    ))}
                  </Sidebar.Menu>
                </Sidebar.Group.Content>
              </Sidebar.Group>
            </div>
          </Sidebar.Content>

          {/* Footer */}
          <Sidebar.Footer>
            <Sidebar.Menu>
              <Sidebar.Menu.Item>
                <Sidebar.Menu.Button tooltip="Account options">
                  <Avatar size="sm">RJ</Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Roberto Jr</span>
                    <span className="truncate text-muted-foreground text-xs">
                      rbjunior000@gmail.com
                    </span>
                  </div>
                  <CreditCard className="ml-auto" />
                </Sidebar.Menu.Button>
              </Sidebar.Menu.Item>
            </Sidebar.Menu>
          </Sidebar.Footer>

          <Sidebar.Rail />
        </Sidebar>

        {/* ── Main content ── */}
        <Sidebar.Inset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <Sidebar.Trigger />
            <span className="font-medium text-sm">Dashboard</span>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <Bell />
                <span>Notifications</span>
              </Button>
              <Button size="sm" variant="outline">
                <LogOut />
                <span>Sign out</span>
              </Button>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {Array.from({
                length: 3,
              }).map((_, i) => (
                <div className="aspect-video rounded-xl bg-muted/50" key={i} />
              ))}
            </div>
            <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </main>
        </Sidebar.Inset>
      </Sidebar.Provider>
    );
  },
};
