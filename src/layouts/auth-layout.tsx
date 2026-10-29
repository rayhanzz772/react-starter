import { Command } from "lucide-react";
import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-2.5"
          aria-label="Back to dashboard"
        >
          <span className="flex size-8 items-center justify-center rounded-none bg-primary text-primary-foreground">
            <Command className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Starter Kit
          </span>
        </Link>

        <Card className="gap-0">
          <CardHeader className="border-b pb-4">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent className="py-5">{children}</CardContent>

          <CardFooter className="border-t py-4 text-sm text-muted-foreground">
            {footer}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
