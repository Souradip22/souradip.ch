import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

type CardProperties = {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const Card: FC<CardProperties> = ({ title, children, className }) => (
  <div>
    <h2 className="inline-block font-bold tracking-tight my-4 text-white border-b-4 border-primary-400">
      {title}
    </h2>
    <div
      className={cn(
        "border rounded-xl overflow-hidden shadow-sm",
        "bg-neutral-950 border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  </div>
);
