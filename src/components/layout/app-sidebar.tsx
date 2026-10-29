import {
  LayoutDashboard,
  Settings,
  Users,
  Package,
  ChartNoAxesCombined,
  LifeBuoy,
  Command,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Analytics", href: "/analytics", icon: ChartNoAxesCombined },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Users", href: "/users", icon: Users },
      { label: "Products", href: "/products", icon: Package },
    ],
  },
];

type AppSidebarProps = {
  currentPath?: string;
  onNavigate?: () => void;
};

export function AppSidebar({
  currentPath = "/",
  onNavigate,
}: AppSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex size-8 items-center justify-center rounded-none bg-primary text-primary-foreground">
          <Command className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            Starter Kit
          </p>
          <p className="text-[11px] leading-tight text-muted-foreground">
            React Dashboard
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-4">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-1 px-2.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {group.title}
            </p>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = currentPath === item.href;
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-none px-2.5 py-2 text-[13px] transition-colors",
                      active
                        ? "bg-sidebar-accent font-medium text-sidebar-text shadow-[inset_2px_0_0_var(--sidebar-primary)]"
                        : "text-sidebar-text hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-sidebar-border p-2">
        <a
          href="/settings"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-none px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <Settings className="size-3.5 shrink-0" />
          Settings
        </a>

        <a
          href="/support"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-none px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <LifeBuoy className="size-3.5 shrink-0" />
          Help & Support
        </a>
      </div>
    </aside>
  );
}
