import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Role = "ADMIN" | "CEO" | "HR";

type DirectoryUser = {
  email: string;
  role: Role;
  status: boolean;
};

const users: DirectoryUser[] = [
  {
    email: "olivia@example.com",
    role: "ADMIN",
    status: true,
  },
  {
    email: "jackson@example.com",
    role: "HR",
    status: true,
  },
  {
    email: "isabella@example.com",
    role: "ADMIN",
    status: true,
  },
  {
    email: "william@example.com",
    role: "CEO",
    status: false,
  },
  {
    email: "sofia@example.com",
    role: "HR",
    status: true,
  },
];

const headerCell =
  "px-4 py-3 text-left text-xs font-medium tracking-wide text-muted-foreground";

const bodyCell = "border-b border-border px-4 py-3 last:border-0";

function StatusToggle({
  active,
  onChange,
  label,
}: {
  active: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active ? "bg-primary" : "bg-input",
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-1 ring-foreground/10 transition-transform",
          active ? "translate-x-4" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export function UsersPage() {
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(users.map((user) => [user.email, user.status])),
  );

  const value = query.trim().toLowerCase();
  const filteredUsers = users.filter(
    (user) => !value || user.email.toLowerCase().includes(value),
  );

  function toggleStatus(email: string) {
    setStatuses((prev) => ({ ...prev, [email]: !prev[email] }));
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage login accounts, roles, and access status.
        </p>
      </section>

      <Card className="gap-0">
      <CardHeader className="border-b pb-4">
        <CardTitle>User directory</CardTitle>
        <CardDescription>
          Search and manage login accounts in your organization
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col gap-3 p-5 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by email..."
              aria-label="Search by email"
              className="h-8 w-full rounded-lg border border-border bg-background pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>

          <Button variant="outline">
            <Filter data-icon="inline-start" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th scope="col" className={cn(headerCell, "w-14")}>
                  No.
                </th>
                <th scope="col" className={headerCell}>
                  User
                </th>
                <th scope="col" className={headerCell}>
                  Role
                </th>
                <th scope="col" className={headerCell}>
                  Status
                </th>
                <th scope="col" className={cn(headerCell, "text-right")}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.email} className="transition-colors hover:bg-muted/30">
                  <td className={cn(bodyCell, "tabular-nums text-muted-foreground")}>
                    {index + 1}
                  </td>

                  <td className={cn(bodyCell, "font-medium")}>{user.email}</td>

                  <td className={bodyCell}>
                    <span className="inline-flex rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-foreground">
                      {user.role}
                    </span>
                  </td>

                  <td className={bodyCell}>
                    <StatusToggle
                      active={statuses[user.email] ?? false}
                      onChange={() => toggleStatus(user.email)}
                      label={
                        (statuses[user.email] ? "Deactivate" : "Activate") +
                        " " +
                        user.email
                      }
                    />
                  </td>

                  <td className={cn(bodyCell, "text-right")}>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`View ${user.email}`}
                      >
                        <Eye className="size-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${user.email}`}
                      >
                        <Pencil className="size-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${user.email}`}
                      >
                        <Trash2 className="size-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="border-b border-border px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    No users found matching &ldquo;{value}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 text-xs text-muted-foreground">
          <p>
            Showing {filteredUsers.length === 0 ? 0 : 1}-{filteredUsers.length} of{" "}
            {users.length} users
          </p>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled aria-label="Previous page">
              <ChevronLeft data-icon="inline-start" />
              Previous
            </Button>

            <Button variant="default" size="sm" aria-current="page" aria-label="Page 1">
              1
            </Button>

            <Button variant="outline" size="sm" disabled aria-label="Next page">
              Next
              <ChevronRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </CardContent>
      </Card>
    </div>
  );
}
