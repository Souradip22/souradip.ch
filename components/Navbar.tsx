"use client";

import { usePathname } from "next/navigation";
import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LayersIcon,
  MessagesSquareIcon,
  NewspaperIcon,
  NotebookPenIcon,
} from "lucide-react";
import { LinkWrapper } from "./LinkWrapper";
import type { FC } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

const pages = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Projects", path: "/projects", icon: BriefcaseBusinessIcon },
  { name: "Blog", path: "/blog", icon: NotebookPenIcon },
  { name: "Snippets", path: "/snippets", icon: NewspaperIcon },
  { name: "Resources", path: "/resources", icon: LayersIcon },
  { name: "Contact", path: "/contact", icon: MessagesSquareIcon },
];

export const Navbar: FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? path === pathname : pathname.startsWith(path);

  return (
    <nav
      className={cn(
        "rounded-full flex items-center fixed top-6 left-1/2 -translate-x-1/2 backdrop-blur-sm backdrop-filter bg-opacity-50 shadow-lg  border-[2px] text-sm",
        "bg-white/80 border-neutral-800",
        "dark:bg-neutral-950/80 dark:border-neutral-800"
      )}
    >
      {pages.map((link) => (
        <LinkWrapper
          key={link.path}
          href={link.path}
          label={link.name}
          className={cn(
            "relative py-1 sm:py-2 px-3 sm:px-5",
            isActive(link.path)
              ? "font-medium text-primary-500 border-[2px] border-neutral-800  rounded-full m-1 "
              : "text-neutral-500 dark:text-neutral-400"
          )}
        >
          <span className="block sm:hidden">
            <link.icon className="w-5 h-5" />
          </span>
          <span className="hidden sm:block">{link.name}</span>
        </LinkWrapper>
      ))}
    </nav>
  );
};
