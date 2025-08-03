"use client";
import type { FC } from "react";
import { BlurImage } from "./BlurImage";

type HeaderProperties = {
  readonly title: string;
  readonly description: string;
  showImage?: boolean;
};

export const Header: FC<HeaderProperties> = ({
  title,
  description,
  showImage = false,
}) => (
  <header className="space-y-2">
    {showImage && (
      <div className=" relative flex-shrink-1 pb-4 md:order-last order-first ">
        <div className="group rounded-lg w-20 relative  transition-all ease-out duration-300 shadow-[0_0_3px_rgb(132,204,22),_0_0_10px_rgb(77,124,15)] hover:shadow-[0_0_5px_rgb(34,197,92),_0_0_20px_rgb(21,128,61)] text-gray-200">
          <div
            style={{ top: "30px", opacity: 0.2, width: "50%", left: "-30px" }}
            className="absolute h-[2px] bg-primary-400"
          ></div>

          <div
            style={{ left: "10px", opacity: 0.2, height: "50%", top: "-30px" }}
            className="absolute  w-[2px] bg-primary-400"
          ></div>

          <div
            style={{
              bottom: "30px",
              right: "-30px",
              opacity: 0.2,
              width: "50%",
            }}
            className="absolute h-[2px] bg-primary-400"
          ></div>

          <div
            style={{
              right: "30px",
              bottom: "-30px",
              opacity: 0.2,
              height: "50%",
            }}
            className="absolute  w-[2px] bg-primary-400"
          ></div>
          <div className="relative overflow-hidden rounded-md h-20 w-20">
            <BlurImage
              src="/images/main-img.png"
              className="bg-gray-100 object-contain mt-0"
              layout="fill"
            />
          </div>
        </div>
      </div>
    )}
    <h1 className="text-3xl m-0">{title}</h1>
    <p className="m-0 text-lg">{description}</p>
  </header>
);
