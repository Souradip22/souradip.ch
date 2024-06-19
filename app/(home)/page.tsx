import Image from "next/image";
import { LinkWrapper } from "@/components/LinkWrapper";
import { Header } from "@/components/Header";
import PageLayout from "@/app/(pages)/layout";
import type { StaticImageData } from "next/image";
import type { Metadata } from "next";
import type { FC, ReactElement } from "react";
import Link from "next/link";
import { SquareArrowOutUpRight, ExternalLink, HeartIcon } from "lucide-react";
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
    "A software developer from India with 6 years of experience, deeply fascinated by large-scale distributed systems and backend technologies.",
};

const getUrlByTitle = (title: string) => {
  const link = socialLinks.find(
    (link) => link.title.toLowerCase() === title.toLowerCase()
  );
  return link ? link.url : null;
};

const Home = async (): Promise<ReactElement> => {
  const song = await fetchCurrentlyPlaying();
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
      <main>
        <div>
          <div className="!m-0">
            Hi 👋, I&apos;m Souradip!
            <ul className="text-md ">
              <li>Software Engineer, based in India</li>
              <li>
                Working with{" "}
                <LinkWrapper href="https://www.griddynamics.com/">
                  Grid Dynamics
                </LinkWrapper>{" "}
                , previously at{" "}
                <LinkWrapper href="https://www.3ds.com/">3ds</LinkWrapper>
              </li>
              <li>
                Love to travel <span className="text-xs"> 🌍 </span> and explore
                foods <span className="text-xs">🍲</span>{" "}
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h2 className="text-xl font-medium text-black dark:text-white !m-0">
            Side-projects
          </h2>
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects?.slice(0, 3).map((project, index) => (
              <div
                key={`sub-proj-${index}`}
                className="min-w-[120px] flex-col px-4 py-2 border border-gray-200 dark:border-gray-700/70 rounded-lg hover:bg-gray-100 dark:bg-stone-800/70 dark:hover:bg-stone-800 dark:hover:border-gray-700 dark:shadow-[0_0_8px_rgba(0,0,0,0.8)] shadow-[0_0_8px_rgba(0,0,0,0.06)] flex relative !no-underline"
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
                        <div className="flex items-center justify-center w-[42px] h-[42px] text-lg font-medium text-white bg-black border border-gray-100 rounded-full dark:border-gray-800 drop-shadow-xl">
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
        <h2 className="text-xl font-medium text-black dark:text-white !m-0">
          Recent Activity
        </h2>

        <div className="my-8">
          <div className="flex items-center gap-3 pb-3">
            <h3 className="font-medium text-black dark:text-white !m-0">
              Github Contributions
            </h3>
            <LinkWrapper
              href={githubLink as string}
              className="relative flex items-center gap-1 justify-center px-2 py-[3px] rounded-lg group text-xs text-gray-900 shadow-sm border border-gray-300 min-h-[28px] dark:border-gray-700 dark:text-gray-200  bg-white dark:bg-neutral-900 duration-100 hover:text-primary-400 "
            >
              View Github profile
              <ExternalLink className="h-3 mb-[1px] w-3" />
            </LinkWrapper>
          </div>
          <GithubActivityGraph username="souradip22" />
        </div>
        <div className="my-8">
          <div className="flex items-center gap-3 pb-3">
            <h3 className="font-medium text-black dark:text-white !m-0">
              Leetcode Submissions
            </h3>
            <LinkWrapper
              href={leetcodeLink as string}
              className="relative flex items-center gap-1 justify-center px-2 py-[3px] rounded-lg group text-xs text-gray-900 shadow-sm border border-gray-300 min-h-[28px] dark:border-gray-700 dark:text-gray-200  bg-white dark:bg-neutral-900 duration-100 hover:text-primary-400 "
            >
              View Leetcode profile
              <ExternalLink className="h-3 w-3 mb-[1px]" />
            </LinkWrapper>
          </div>
          <LeetcodeActivityGraph username="souradip22" />
        </div>
        <div className="mt-5 mb-12 justify-center relative group">
          <h4 className="text-sm mb-4">
            I&apos;m not exactly a social media sensation elsewhere, but behold,
            a glimpse into my world through these snapshots! 📸✨ 🤙🏻
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {IMAGES.travel?.slice(0, 4)?.map((item) => (
              <div
                key={item.src}
                className={cn(
                  "relative bg-gray-100  hover:bg-stone-900 duration-100 ease-in-out rounded-[12px] dark:border-stone-700  md:hover:scale-[1.05]"
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
            Some of my favorite dishes 🍲🍕🍰🍣 because food is the real MVP of
            my life! 😄
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {IMAGES.food?.slice(0, 4)?.map((item) => (
              <div
                key={item.src}
                className={cn(
                  "relative bg-gray-100  hover:bg-stone-900 duration-100 ease-in-out rounded-[12px] dark:border-stone-700  md:hover:scale-[1.05]"
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
function NotPlaying() {
  return (
    <div className="flex w-full md:w-1/2 flex-row-reverse items-center border-[2px] border-neutral-800 justify-between p-3 rounded-lg dark:bg-neutral-950 sm:p-4 mt-4">
      <Image
        src="/spotify.svg"
        alt="spotify"
        className="w-6 h-6"
        width={24}
        height={24}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <div className="font-semibold text-sm text-black  dark:text-white">
          Not Playing
        </div>
        <span className="hidden md:inline-flex">—</span>
        <p className="text-xs text-gray-500 sm:text-sm">Spotify</p>
      </div>
    </div>
  );
}

function WhenPlaying({ song }: { song: SongData }) {
  return (
    <div className="flex flex-col gap-4 ">
      <h4 className="text-sm font-semibold dark:text-gray-300">Now Playing</h4>
      <Link
        href={song.songUrl}
        className="flex items-center  w-full md:w-1/2 border-[2px] border-neutral-800 justify-between p-3 rounded-lg dark:bg-neutral-950 sm:p-4"
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
            <h3 className="font-semibold text-black md:text-lg dark:text-white animate-">
              {song.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {song.artist}
            </p>
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
