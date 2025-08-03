import Image from "next/image";
import { LinkWrapper } from "@/components/LinkWrapper";
import { Header } from "@/components/Header";
import PageLayout from "@/app/(pages)/layout";
import type { StaticImageData } from "next/image";
import type { Metadata } from "next";
import type { FC, ReactElement } from "react";
import Link from "next/link";
import { SquareArrowOutUpRight, ExternalLink, Bike, Dot } from "lucide-react";
import Timeline from "@/components/Timeline";
import SocialLinks, { socialIconMap } from "@/components/SocialLinks";
import socialLinks from "@/data/social.json";
import IMAGES from "@/data/images.json";
import { SongData } from "@/lib/types";
import { siteUrl } from "@/lib/consts";
import projects from "@/data/projects.json";
import GithubActivityGraph from "@/components/ActivityGraph/GithubActivityGraph";
import LeetcodeActivityGraph from "@/components/ActivityGraph/LeetcodeActivityGraph";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Souradip Chandra",
  openGraph: {
    type: "website",
    images: [
      {
        url: new URL("/og-images/og-home.png", siteUrl).href,
        width: 1920,
        height: 1080,
        alt: "Souradip",
      },
    ],
  },

  description:
    "Senior Software Engineer leads the development of software components, mentors junior developers, and actively contributes to code reviews and system architecture",
};

const getUrlByTitle = (title: string) => {
  const link = socialLinks.find(
    (link) => link.title.toLowerCase() === title.toLowerCase()
  );
  return link ? link.url : null;
};

const Home = async (): Promise<ReactElement> => {
  const song = await fetchCurrentlyPlaying();
  const visitors = await fetchVisitorsCount();

  const leetcodeLink = getUrlByTitle("Leetcode");
  const githubLink = getUrlByTitle("Github");
  return (
    <PageLayout>
      <Header
        title="Souradip Chandra"
        description="Software · Engineering · Technology"
        showImage={true}
      />
      <SocialLinks />
      <svg
        aria-hidden="true"
        width="90"
        viewBox="0 0 432 38"
        fill="#22c55e"
        className="!my-4"
      >
        <path
          d="M402.74 37.5899C390.193 37.5899 374.767 21.3129 374.111 20.6249C367.068 12.4335 359.943 5.14795 349.463 5.14795C337.975 5.14795 324.479 20.406 324.338 20.558L323.17 21.8313C315.729 29.9329 308.701 37.5893 296.186 37.5893C283.639 37.5893 268.213 21.3123 267.557 20.6243C260.514 12.4329 253.389 5.14734 242.909 5.14734C231.421 5.14734 217.925 20.4053 217.784 20.5573L216.683 21.7175C208.186 30.5847 201.48 37.5885 189.636 37.5885C177.085 37.5885 161.656 21.3115 161.007 20.6235C153.96 12.4321 146.831 5.14655 136.359 5.14655C124.871 5.14655 111.375 20.4045 111.234 20.5565L110.054 21.8417C102.62 29.9394 95.5889 37.5837 83.0769 37.5837C70.5259 37.5837 55.0969 21.3067 54.4479 20.6187C47.401 12.4273 40.2719 5.14175 29.7999 5.14175C19.3699 5.14175 9.86587 10.8722 4.98787 20.0987C4.3824 21.2549 2.94488 21.6964 1.78478 21.087C0.628579 20.4698 0.187069 19.0401 0.800389 17.8839C6.50349 7.10691 17.6124 0.403931 29.7964 0.403931C42.2694 0.403931 50.5504 8.82583 57.9644 17.4469C61.941 21.6774 74.3554 32.8419 83.0734 32.8419C93.5074 32.8419 99.2644 26.5724 106.557 18.6349L107.702 17.3888C108.268 16.7404 122.733 0.404816 136.35 0.404816C148.823 0.404816 157.104 8.82671 164.518 17.4478C168.494 21.6783 180.909 32.8428 189.627 32.8428C199.447 32.8428 204.943 27.1123 213.256 18.4368L214.295 17.3509C214.83 16.7337 229.295 0.401917 242.908 0.401917C255.388 0.401917 263.67 8.82382 271.076 17.4449C275.053 21.6676 287.467 32.8359 296.185 32.8359C306.623 32.8359 312.388 26.5625 319.685 18.6129L320.822 17.3785C321.388 16.7301 335.853 0.394531 349.463 0.394531C361.943 0.394531 370.225 8.81643 377.631 17.4375C381.607 21.6602 394.022 32.8285 402.74 32.8285C412.744 32.8285 422.06 27.4379 427.064 18.7625C427.716 17.6258 429.161 17.2313 430.302 17.8914C431.435 18.5438 431.822 19.993 431.173 21.1258C425.321 31.2898 414.427 37.5908 402.739 37.5908L402.74 37.5899Z"
          fill="#22c55e"
        ></path>
      </svg>

      <main className="!my-2">
        <div>
          <div className="!m-0">
            <p>
              Hi, I&apos;m Souradip! Welcome to my digital playground{" "}
              <span className="relative inline-block">
                <Bike></Bike>
                <span className="absolute bottom-0 inset-x-0 h-[6px] bg-primary-500 opacity-50 hover:opacity-70"></span>
              </span>
            </p>
            <p>
              I am a SSE at Grid Dynamics, where I work with VISA on Cybersource product.
              Before Grid, I used to work with Dassault Systèmes as a Research &
              Development Engineer.
            </p>
            <p>
              My passion lies in creating visually captivating interfaces,
              building robust tools, and refining user interactions to ensure
              they are both intuitive and delightful.
            </p>
            <p>
              Interested in collaborating?{" "}
              <span className="relative inline-block not-prose">
                <Link href={"/contact"} className="font-semibold text-gray-200">
                  Send me a message
                </Link>
                <span className="absolute bottom-1 inset-x-0 h-[6px] bg-primary-500 opacity-50 hover:opacity-70"></span>
              </span>
            </p>

            {/* <ul className="text-sm !m-0">
              <li className=" !m-0">Software Engineer, based in India</li>
              <li className=" !m-0">
                Working with{" "}
                <LinkWrapper href="https://www.griddynamics.com/">
                  Grid Dynamics
                </LinkWrapper>{" "}
                , previously at{" "}
                <LinkWrapper href="https://www.3ds.com/">3ds</LinkWrapper>
              </li>
              <li className=" !m-0">
                Love to travel <span className="text-xs"> 🌍 </span> and explore
                food<span className="text-xs">🍲</span>{" "}
              </li>
            </ul> */}
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h2 className="text-xl font-medium text-white !m-0">Side Projects</h2>
          <div className="my-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects?.slice(0, 3).map((project, index) => (
              <div
                key={`sub-proj-${index}`}
                className="min-w-[120px] flex-col px-4 py-2 border border-gray-700/70 rounded-lg bg-stone-800/70 hover:bg-stone-800 hover:border-gray-700 shadow-[0_0_8px_rgba(0,0,0,0.8)]  flex relative !no-underline"
              >
                <Link
                  href={project?.demoLink}
                  target="_blank"
                  title={project?.title}
                >
                  <div className="absolute top-[10%] right-[10%] z-10 opacity-50 hover:opacity-100 hover:scale-[1.1] duration-100 text-sm">
                    <SquareArrowOutUpRight className="w-4 h-4" />
                  </div>
                </Link>
                <div key={project?.title}>
                  <div className="py-3 relative  overflow-hidden not-prose">
                    {project?.icon ? (
                      <Image
                        className="object-fill w-[40px] h-[40px]"
                        src={project?.icon}
                        alt={project?.title}
                        width={20}
                        height={40}
                      />
                    ) : (
                      <>
                        <div className="flex items-center justify-center w-[42px] h-[42px] text-lg font-medium text-white bg-black border rounded-full border-gray-800 drop-shadow-xl">
                          {project?.title?.slice(0, 1)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center gap-[6px] mt-1">
                      <h3 className="font-medium text-base ">
                        {project?.title}
                      </h3>
                      {project?.active ? (
                        <div
                          className="w-[8px] h-[8px] rounded-full bg-green-500"
                          title="Active"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {project?.description ? (
                      <p className="text-sm opacity-80 !mt-0 line-clamp-3">
                        {project?.description}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/projects"
            className="group border border-primary-500 bg-stone-900 text-primary-400 px-2 py-1 rounded-xl text-xs hover:text-primary-500 transition ease-in-out duration-200 not-prose"
          >
            View all
            <span
              aria-hidden="true"
              className="ml-1 inline-block translate-x-0 group-hover:translate-x-1 transition-transform ease-in-out duration-200"
            >
              →
            </span>
          </Link>
        </div>
        <hr className="my-4" />
        <Timeline />
        <hr className="my-4" />
      </main>
      <footer className="!m-0 not-prose">
        <h2 className="text-xl font-medium text-white !m-0">Recent Activity</h2>

        <div className="my-8">
          <div className="flex items-center gap-3 pb-3">
            <h3 className="font-medium text-white !m-0">
              Github Contributions
            </h3>
            <LinkWrapper
              href={githubLink as string}
              className="relative flex items-center gap-1 justify-center px-2 py-[3px] rounded-lg group text-xs shadow-sm border min-h-[28px] border-gray-700 text-gray-200  bg-neutral-900 duration-100 hover:text-primary-400 "
            >
              View Github profile
              <ExternalLink className="h-3 mb-[1px] w-3" />
            </LinkWrapper>
          </div>
          <GithubActivityGraph username="souradip22" />
        </div>
        <div className="my-8">
          <div className="flex items-center gap-3 pb-3">
            <h3 className="font-medium text-white !m-0">
              Leetcode Submissions
            </h3>
            <LinkWrapper
              href={leetcodeLink as string}
              className="relative flex items-center gap-1 justify-center px-2 py-[3px] rounded-lg group text-xs  shadow-sm border min-h-[28px] border-gray-700 text-gray-200  bg-neutral-900 duration-100 hover:text-primary-400 "
            >
              View Leetcode profile
              <ExternalLink className="h-3 w-3 mb-[1px]" />
            </LinkWrapper>
          </div>
          <LeetcodeActivityGraph username="souradip22" />
        </div>
        <div className="my-12 justify-center relative group">
          <h2 className="text-xl font-medium text-white !m-0">Photo Gallery</h2>
          <h4 className="text-sm mb-4">
            A glimpse into my world through these snapshots! 📸
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {IMAGES.travel?.slice(0, 4)?.map((item) => (
              <div
                key={item.src}
                className={cn(
                  "relative bg-gray-100  hover:bg-stone-900 duration-100 ease-in-out rounded-[12px] border-stone-700  md:hover:scale-[1.05]"
                )}
              >
                <Image
                  src={item?.src}
                  alt={item?.place}
                  className="rounded-[9px] object-cover w-full h-full"
                  loading="lazy"
                  // layout="fill"
                  width={1200}
                  height={1200}
                />
              </div>
            ))}
          </div>
          <div className="my-4"></div>
          <h4 className="text-sm  mb-4">
            Some of my favorite dishes 🍲 because food is the real MVP of my
            life! 😄
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {IMAGES.food?.slice(0, 4)?.map((item) => (
              <div
                key={item.src}
                className={cn(
                  "relative bg-gray-100  hover:bg-stone-900 duration-100 ease-in-out rounded-[12px] border-stone-700  md:hover:scale-[1.05]"
                )}
              >
                <Image
                  src={item?.src}
                  alt={item?.place}
                  className="rounded-[9px] object-cover w-full h-full"
                  loading="lazy"
                  // layout="fill"
                  width={1200}
                  height={1200}
                />
                {item.favourite && (
                  <span className="absolute top-1 right-3 animate-pulse w-4 h-4  ">
                    ❤️
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="not-prose">
          {song?.isPlaying ? <WhenPlaying song={song} /> : <NotPlaying />}
        </div>
        {/* <div className="flex items-center gap-1 mt-5">
          {visitors?.totalVisitors ? (
            <>
              <Dot className=" text-green-500 animate-pulse !m-0" />
              <span className="bg-green-500/10 text-green-500 font-medium text-xs py-1 px-2">
                {visitors?.totalVisitors} visitors in last {visitors?.days} days
              </span>
            </>
          ) : null}
        </div> */}
      </footer>
    </PageLayout>
  );
};

async function fetchCurrentlyPlaying(): Promise<SongData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/currently-playing`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  const data: SongData = await res.json();
  return data;
}

async function fetchVisitorsCount(): Promise<any | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
}

function NotPlaying() {
  return (
    <div className="flex w-full md:w-1/2 flex-row-reverse items-center border-[2px] border-neutral-800 justify-between p-3 rounded-lg bg-neutral-950 sm:p-4 mt-4">
      <Image
        src="/spotify.svg"
        alt="spotify"
        className="w-6 h-6"
        width={24}
        height={24}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <div className="font-semibold text-sm text-white">Not Playing</div>
        <span className="hidden md:inline-flex">—</span>
        <p className="text-xs text-gray-500 sm:text-sm">Spotify</p>
      </div>
    </div>
  );
}

function WhenPlaying({ song }: { song: SongData }) {
  return (
    <div className="flex flex-col gap-4 ">
      <h4 className="text-sm font-semibold text-gray-300">Now Playing</h4>
      <Link
        href={song.songUrl}
        className="flex items-center  w-full md:w-1/2 border-[2px] border-neutral-800 justify-between p-3 rounded-lg bg-neutral-950 sm:p-4"
      >
        <div className="flex items-center gap-2 ">
          <div className="w-10 h-10">
            <Image
              alt={song.title}
              src={song.albumImageUrl}
              width={40}
              height={40}
              quality={50}
              placeholder="blur"
              blurDataURL={song.albumImageUrl}
            />
          </div>
          <div className="flex flex-col ">
            <h3 className="font-semibold md:text-lg text-white animate-">
              {song.title}
            </h3>
            <p className="text-xs text-gray-400 sm:text-sm">{song.artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/spotify.svg"
            alt="spotify"
            className="w-6 h-6 animate-[spin_2s_linear_infinite]"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </div>
  );
}
export default Home;
