import { CalloutMessageType, CalloutProps, CalloutTypes } from "@/lib/types";
import React from "react";
import { Info, CircleX, Lightbulb, CircleCheck, BookOpen } from "lucide-react";

const themes: CalloutTypes = {
  info: {
    classes:
      "bg-blue-100 text-blue-800 dark:text-blue-300 dark:bg-blue-200 dark:bg-opacity-20",
    icon: <Info className="w-5 h-5 " />,
  },
  idea: {
    classes:
      "bg-gray-100 text-gray-800 dark:text-gray-300 dark:bg-gray-200 dark:bg-opacity-20",
    icon: <Lightbulb className="w-5 h-5 " />,
  },
  error: {
    classes:
      "bg-red-200 text-red-900 dark:text-red-200 dark:bg-red-600 dark:bg-opacity-30",
    icon: <CircleX className="w-5 h-5 " />,
  },
  default: {
    classes:
      "bg-orange-100 text-orange-800 dark:text-orange-300 dark:bg-orange-200 dark:bg-opacity-20",
    icon: <BookOpen className="w-5 h-5 " />,
  },
  green: {
    classes:
      "bg-green-100 text-green-800 dark:text-green-300 dark:bg-green-200 dark:bg-opacity-20",
    icon: <CircleCheck className="w-5 h-5 " />,
  },
};

export default function Callout({
  children,
  type = "default",
  icon,
}: CalloutProps) {
  const theme = themes[type] || themes.default;

  return (
    <div className={`${theme.classes} flex rounded-lg mt-6 overflow-auto`}>
      <span className="pt-8 pl-3 pr-3 text-xl select-none">
        {icon || theme.icon}
      </span>
      <div className="py-2 pr-4 pl-2">{children}</div>
    </div>
  );
}
