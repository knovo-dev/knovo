import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function CodeBlock({ className, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-border bg-slate-950 px-4 py-4 text-sm text-slate-100",
        className,
      )}
      {...props}
    />
  );
}
