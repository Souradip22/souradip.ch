import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const CommonListStyle: FC<{
  readonly title: string;
  readonly date: string;
  readonly link: string;
  readonly iconUrl?: string;
}> = ({ title, date, link, iconUrl }) => (
  <Link
    className="flex flex-col md:flex-row py-4 md:py-[8px] no-underline text-inherit group transition-colors border-dashed border-b   w-full border-gray-700 hover:border-primary-500 text-gray-400 sm:truncate text-sm"
    key={link}
    href={link}
  >
    <p className="m-0 group-hover:text-primary-500 transition-colors sm:truncate flex-1">
      {iconUrl && (
        <Image
          src={iconUrl}
          className="w-5 h-5 mr-2 inline-block m-0 p-[2px] bg-gray-200 rounded"
          alt={title}
          width={20}
          height={20}
        />
      )}
      <span></span>
      {title}
    </p>
    <p className="md:ml-auto m-0 group-hover:text-primary-400 transition-colors text-xs md:text-sm whitespace-nowrap">
      {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(date)
      )}
    </p>
  </Link>
);
export default CommonListStyle;
