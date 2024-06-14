"use client";
import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { FormInput } from "@/lib/types";
import { toast } from "sonner";

import { Send, LoaderCircle } from "lucide-react";

const notifyError = (msg?: any) =>
  toast.error(
    msg
      ? msg
      : "I apologize, but there was an issue while trying to send the message.\n\nPlease try again later or contact me directly for assistance.",
    {
      position: "bottom-center",
      duration: 2000,
      style: {
        fontSize: "14px",
      },
    }
  );

export default function ContactForm() {
  const sendButtonRef = useRef<HTMLButtonElement>(null!);
  const formRef = useRef<HTMLFormElement>(null!);
  const [validationLoading, setValidationLoading] = useState(false);

  function sendEmail(e: React.SyntheticEvent) {
    e.preventDefault();
    setValidationLoading(true);
    const target = e.target as typeof e.target & {
      name: { value: string };
      user_email: { value: string };
      message: { value: string };
    };

    const emailData = {
      to_name: "Souradip Chandra",
      name: target.name.value.trim(),
      email: target.user_email.value.trim(),
      message: target.message.value.trim(),
    };

    if (!validateForm(emailData)) {
      setValidationLoading(false);
      return notifyError("Oops! It seems you haven't completed the form.");
    }

    sendButtonRef.current.setAttribute("disabled", "true");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID!,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID!,
        emailData!,
        process.env.NEXT_PUBLIC_YOUR_USER_ID
      )
      .then(() => {
        setValidationLoading(false);
        formRef.current.reset();
        toast.success("Your message has been sent successfully.", {
          position: "bottom-center",
          duration: 2000,
          style: {
            fontSize: "14px",
          },
        });
        sendButtonRef.current.removeAttribute("disabled");
      })
      .catch((_) => {
        setValidationLoading(false);
        notifyError();
        sendButtonRef.current.removeAttribute("disabled");
      });
  }

  function validateForm(data: FormInput): boolean {
    for (const key in data) {
      if (data[key as keyof FormInput] === "") return false;
    }
    return true;
  }

  return (
    <>
      <form ref={formRef} onSubmit={sendEmail} id="hireMeForm">
        <div className="relative z-0 w-full mt-[20px] mb-4 group not-prose">
          <input
            type="text"
            name="name"
            className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-2 border-primary-400 appearance-none dark:text-white dark:border-gray-700 dark:focus:border-primary-400 focus:outline-none focus:ring-0 focus:border-primary-400 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Name *
          </label>
        </div>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="email"
            name="user_email"
            className="block autofill:text-primary-900 py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-2 border-primary-400 appearance-none dark:text-white dark:border-gray-700 dark:focus:border-primary-400 focus:outline-none focus:ring-0 focus:border-primary-400 peer"
            placeholder=" "
            id="user_email"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Email *
          </label>
        </div>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="message"
            className="block autofill:bg-primary-500 py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-2 border-primary-400 appearance-none dark:text-white dark:border-gray-700 dark:focus:border-primary-400 focus:outline-none focus:ring-0 focus:border-primary-400 peer"
            placeholder=" "
            id="message"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Message *
          </label>
        </div>

        <div className="mt-3">
          <button
            ref={sendButtonRef}
            className="border border-primary-400 text-sm p-2 rounded text-primary-400"
          >
            {validationLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <div className="flex items-center">
                  <Send className="inline-block mr-2 w-4 h-4" />
                  <p className="sm:inline-flex !my-0">Send</p>
                </div>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
