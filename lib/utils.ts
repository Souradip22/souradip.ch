import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { Activity } from "./types";
import { Props } from "@/components/ActivityGraph/GithubActivityGraph";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const parseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
};
