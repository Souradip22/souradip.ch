import Image from "next/image";
import { LinkWrapper } from "@/components/LinkWrapper";
import resources from "@/data/resources.json";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import type { FC } from "react";

const title = "Resources";
const description =
  "Here are some helpful websites and tools that I've used for years and have greatly aided my application development.  🛠️";

export const metadata: Metadata = {
  title,
  description,
};

const Tool: FC<{
  readonly data: {
    readonly href: string;
    readonly name: string;
    readonly description: string;
    readonly favourite?: boolean;
  };
}> = ({ data }) => {
  const { hostname } = new URL(data.href);

  return (
    <LinkWrapper
      href={data.href}
      key={data.href}
      className={cn(
        "no-underline items-center flex gap-4 p-4 rounded-lg transition-colors",
        "hover:bg-neutral-100",
        "dark:hover:bg-neutral-800"
      )}
    >
      <Image
        src={`https://logo.clearbit.com/${hostname.replace("www.", "")}`}
        alt={hostname}
        width={32}
        height={32}
        className="rounded-md"
        quality={100}
      />
      <div>
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-sm font-medium",
              "text-neutral-900",
              "dark:text-neutral-100"
            )}
          >
            {data.name}
          </p>
          {data.favourite ? (
            <span
              className={cn(
                "text-xs px-2 rounded-full font-medium",
                "bg-neutral-100 text-neutral-700",
                "dark:bg-primary-700 dark:text-neutral-300"
              )}
            >
              Favourite
            </span>
          ) : undefined}
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {data.description}
        </p>
      </div>
    </LinkWrapper>
  );
};

const Resource: FC = () => (
  <>
    <Header title={title} description={description} />
    <div className="mt-8 grid gap-4 not-prose">
      {Object.values(resources).map(({ items, type }) => (
        <Card
          key={type}
          title={type}
          className="p-2 grid sm:grid-cols-2 gap-x-2"
        >
          {items.map((item) => (
            <Tool data={item} key={item.name} />
          ))}
        </Card>
      ))}
    </div>
  </>
);

export default Resource;
