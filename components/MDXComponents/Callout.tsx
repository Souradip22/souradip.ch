import { CalloutMessageType, CalloutProps, CalloutTypes } from "@/lib/types";
import React from "react";
import { Info, CircleX, Lightbulb, CircleCheck, BookOpen } from "lucide-react";

const themes: CalloutTypes = {
  info: {
    classes: "text-blue-300 bg-blue-200 bg-opacity-20",
    icon: <Info className="w-5 h-5 " />,
  },
  idea: {
    classes: "text-gray-300 bg-gray-200 bg-opacity-20",
    icon: <Lightbulb className="w-5 h-5 " />,
  },
  error: {
    classes: "text-red-200 bg-red-600 bg-opacity-30",
    icon: <CircleX className="w-5 h-5 " />,
  },
  default: {
    classes: "text-orange-300 bg-orange-200 bg-opacity-20",
    icon: <BookOpen className="w-5 h-5 " />,
  },
  green: {
    classes: "text-green-300 bg-green-200 bg-opacity-20",
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
