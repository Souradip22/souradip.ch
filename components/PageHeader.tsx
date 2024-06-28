"use client";
import { Activity, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { FC } from "react";

type PageHeaderProperties = {
  readonly title: string;
  readonly description: string;
  extraContent?: any;
};

export const PageHeader: FC<PageHeaderProperties> = ({
  title,
  description,
  extraContent = null,
}) => (
  <header className="flex flex-col items-center space-y-2 not-prose pt-5">
    <span className="flex gap-4 items-center justify-center">
      <ChevronsRight size={18} />
      <h1 className="text-3xl font-bold text-neutral-200 text-center">
        {" "}
        {title}{" "}
      </h1>
      <ChevronsLeft size={18} />
    </span>
    <p className="m-0 text-md font-semibold text-center">{description}</p>
    {extraContent && extraContent}
  </header>
);
