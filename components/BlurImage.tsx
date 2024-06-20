"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import type { FC } from "react";

export const BlurImage: FC<any> = ({ src, className, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      alt={""}
      className={clsx(
        "transition duration-500",
        isLoading ? "blur-sm scale-100" : " blur-0 scale-100",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      {...rest}
    />
  );
};
