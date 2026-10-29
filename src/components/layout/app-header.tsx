import {
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";

const segmentLabels: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  users: "Users",
  products: "Products",
  settings: "Settings",
  support: "Help & Support",
};

function segmentLabel(segment: string) {
  return (
    segmentLabels[segment] ??
    segment.charAt(0).toUpperCase() + segment.slice(1)
  );
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AppHeaderProps = {
  onMenuClick: () => void;
};

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const crumbs = [
    { label: "Dashboard", href: "/" },
    ...(pathname === "/"
      ? []
      : pathname
          .split("/")
          .filter(Boolean)
          .map((segment) => ({
            label: segmentLabel(segment),
            href: `/${segment}`,
          }))),
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        <nav aria-label="Breadcrumb" className="hidden min-w-0 lg:block">
          <ol className="flex h-9 items-center gap-1.5 px-3 text-sm">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;

              return (
                <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  )}

                  {isLast ? (
                    <span
                      aria-current="page"
                      className="truncate font-medium text-foreground"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.href}
                      className="truncate text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {crumb.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="truncate text-sm text-muted-foreground lg:hidden">
          {crumbs[crumbs.length - 1].label}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={
            isDark ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {isDark ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <div className="mx-1 hidden h-8 w-px bg-border sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="gap-2 px-2"
                aria-label="Open account menu"
              />
            }
          >
            <Avatar className="size-8">
              <AvatarFallback>RY</AvatarFallback>
            </Avatar>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium">Rayhan</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>

            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserRound />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => navigate("/login")}
            >
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}