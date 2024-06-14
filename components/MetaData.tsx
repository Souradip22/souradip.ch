"use client";
import Head from "next/head";
// import useWindowLocation from "@/hooks/useWindowLocation";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  description: string;
  previewImage?: string;
  keywords?: string;
  suffix?: string;
};

const getFaviconPath = (_: boolean = true): string => {
  return `/favicon.ico`;
};

export default function MetaData({
  title,
  description,
  previewImage,
  keywords,
  suffix,
}: Props) {
  // const { currentURL } = useWindowLocation();
  const [faviconHref, setFaviconHref] = useState("/favicon.ico");

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    setFaviconHref(getFaviconPath(matcher.matches));
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1"
      />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={description || "Souradip Chandra"} />
      <title>{title + (suffix ? ` - ${suffix}` : "")}</title>
      <link rel="shortcut icon" href={faviconHref} sizes="any" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="author" content="Souradip Chandra"></meta>
      <meta name="robots" content="index,follow" />
      <meta name="keywords" content={`${keywords || ""} Souradip`} />

      {/* Og */}
      <meta property="og:title" content={`${title || ""}`} />
      <meta
        property="og:description"
        content={description || "Souradip Chandra"}
      />
      <meta property="og:site_name" content="Souradip Chandra" />
      {/* <meta property="og:url" content={currentURL} key="ogurl" /> */}
      <meta property="og:image" content={previewImage || ""} />
    </Head>
  );
}
