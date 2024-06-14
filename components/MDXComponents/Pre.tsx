"use client";
import { ReactNode, useRef, useState } from "react";
import { toast } from "sonner";

const notifyCopied = (msg?: any) =>
  toast.success(
    msg
      ? msg
      : "I apologize, but there was an issue while trying to copying.\n\nPlease try again later or contact me directly for assistance.",
    {
      position: "bottom-center",
      duration: 1000,
      style: {
        fontSize: "14px",
      },
    }
  );

const Pre = ({ children }: { children?: ReactNode }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (textInput.current !== null) {
      setCopied(true);
      notifyCopied("Copied Successfully 🥳");
      navigator.clipboard.writeText(textInput.current.textContent!);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="relative" ref={textInput}>
      <button
        aria-label="Copy code"
        type="button"
        className={`!z-40 absolute right-[15px] top-[15px] h-8 w-8 rounded border-none p-1  border-gray-200/60  ${
          copied ? "border-primary-500" : ""
        }`}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="rgb(34, 197, 94)"
          fill="none"
          className={
            copied
              ? "text-primary-500 "
              : "text-darkSecondary dark:text-gray-200/60"
          }
        >
          {copied ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </>
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </>
          )}
        </svg>
      </button>
      <pre>{children}</pre>
    </div>
  );
};

export default Pre;
