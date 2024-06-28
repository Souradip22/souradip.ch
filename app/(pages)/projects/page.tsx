import React, { FC } from "react";
import projects from "@/data/projects.json";
import Image from "next/image";
import { Metadata } from "next";
import { BlurImage } from "@/components/BlurImage";
import { siteUrl } from "@/lib/consts";
import { LinkWrapper } from "@/components/LinkWrapper";
import { PageHeader } from "@/components/PageHeader";

const title = "🧑🏻‍💻 Side Projects";
const description =
  "I've worked on a variety of projects, ranging from basic to complex. ";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    images: [
      {
        url: new URL("/og-images/og-projects.png", siteUrl).href,
        width: 1920,
        height: 1080,
        alt: "Souradip",
      },
    ],
  },
};
const Project: FC = () => {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {Object.values(projects).map((item, index) => {
          const rowIndex = Math.floor(index / 2);
          const isEvenRow = rowIndex % 2 === 0;
          const colSpanClass =
            index % 2 === 0
              ? isEvenRow
                ? "md:col-span-2"
                : "md:col-span-1"
              : isEvenRow
                ? "md:col-span-1"
                : "md:col-span-2";
          return (
            <LinkWrapper
              key={item.title}
              className={`row-span-1 rounded-xl group hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white justify-between flex flex-col space-y-4  border border-gray-200 border-solid cursor-pointer !no-underline ${colSpanClass}`}
              href={item.demoLink}
            >
              <div className="relative rounded-md w-full h-64 ">
                <BlurImage
                  src={item.imageUrl}
                  className="rounded-md  object-cover  !m-0"
                  fill={true}
                />
              </div>
              <div className="group-hover:translate-x-1 transition duration-200">
                <div className="text-[10px] flex gap-2">
                  {item.tags.map((val, index) => {
                    return (
                      <span
                        key={`${index}-${val}`}
                        className="px-1 !m-0  border-[0.5px] border-primary-400 text-primary-600 rounded"
                      >
                        {val}
                      </span>
                    );
                  })}
                </div>
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                  {item.title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                  {item.description}
                </div>
              </div>
            </LinkWrapper>
          );
        })}
      </div>
      <div className="flex justify-center py-4 !my-4">
        More projects coming soon...
      </div>
    </>
  );
};

export default Project;
