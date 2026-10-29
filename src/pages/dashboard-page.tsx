import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Users,
  ShoppingBag,
  Activity,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    description: "from last month",
    positive: true,
    icon: CreditCard,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+12.5%",
    description: "from last month",
    positive: true,
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: "+8.2%",
    description: "from last month",
    positive: true,
    icon: ShoppingBag,
  },
  {
    title: "Bounce Rate",
    value: "24.8%",
    change: "-4.3%",
    description: "from last month",
    positive: true,
    icon: Activity,
  },
];

const transactions = [
  {
    name: "Olivia Martin",
    email: "olivia@example.com",
    status: "Completed",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson@example.com",
    status: "Pending",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    status: "Completed",
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "william@example.com",
    status: "Processing",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia@example.com",
    status: "Completed",
    amount: "+$499.00",
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your workspace today.
          </p>
        </div>

        <Button>Download report</Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="gap-4">
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>

                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </p>

                <div className="flex flex-wrap items-center gap-1 text-xs">
                  {stat.positive ? (
                    <ArrowUpRight className="size-3.5 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="size-3.5 text-destructive" />
                  )}

                  <span
                    className={
                      stat.positive
                        ? "font-medium text-emerald-600"
                        : "font-medium text-destructive"
                    }
                  >
                    {stat.change}
                  </span>

                  <span className="text-muted-foreground">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                A summary of your latest transactions.
              </p>
            </div>

            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="size-5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-left text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 text-right font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.email}
                      className="border-b last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">{transaction.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {transaction.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium " +
                            (transaction.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : transaction.status === "Pending"
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                : "bg-blue-500/10 text-blue-700 dark:text-blue-400")
                          }
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right font-medium">
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your workspace at a glance.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly target</span>
                <span className="font-medium">72%</span>
              </div>

              <div
                role="progressbar"
                aria-label="Monthly target"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={72}
                className="h-2 overflow-hidden rounded-full bg-muted"
              >
                <div className="h-full w-[72%] rounded-full bg-primary" />
              </div>

              <p className="text-xs text-muted-foreground">
                $7,200 of $10,000 target achieved
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm font-medium">Everything looks good!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your workspace is ready. Connect your API to start displaying
                live data.
              </p>
            </div>

            <Button variant="outline" className="w-full">
              View analytics
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}