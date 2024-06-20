"use client";
import { BadgeCheck, ArrowDown, ArrowUp } from "lucide-react";
import resumeData from "@/data/timeline.json";
import React, { FC, useState } from "react";
import { Experience, ResumeData, TimelineData } from "@/lib/types";

const resume: ResumeData = resumeData;
const timeline: TimelineData = resume.data;

const Timeline: FC = () => {
  const [visibleCount, setVisibleCount] = useState(3); // Number of items to show initially
  const [showAll, setShowAll] = useState(false);

  const timelineYears = Object.keys(timeline).sort().reverse();

  const showMoreItems = () => {
    setShowAll(true);
    setVisibleCount(timelineYears.length);
  };

  const showLessItems = () => {
    setShowAll(false);
    setVisibleCount(3);
  };

  return (
    <>
      <div className="flex items-center gap-3 pb-3">
        <h2 className="text-xl font-medium text-black dark:text-white !m-0">
          Timeline
        </h2>
        <span className="relative flex items-center justify-center px-2 py-[3px] rounded-lg group text-xs text-gray-900 shadow-sm border border-gray-300 min-h-[28px] dark:border-gray-700 dark:text-gray-200  bg-white dark:bg-neutral-900 duration-100">
          Last updated - {resume.lastUpdate}
        </span>
      </div>
      {timelineYears
        .slice(0, visibleCount)
        .map((item: string, index: number) => {
          return (
            <div key={`timeline-${index}`} className="not-prose my-4">
              <h3 className="font-bold text-primary-50 my-2  ">{item}</h3>
              {timelineElements(timeline[item])}
              <p className="flex justify-center items-center"> - - - </p>
            </div>
          );
        })}

      {!showAll ? (
        <button
          onClick={showMoreItems}
          className="group flex gap-1 items-center py-3 px-3 rounded  text-primary-600 text-sm"
        >
          <ArrowDown className="w-4 h-4 inline-block translate-y-0 group-hover:translate-y-1 transition-transform ease-in-out duration-200" />{" "}
          Show more
        </button>
      ) : (
        <button
          onClick={showLessItems}
          className="group flex gap-1 items-center py-3 px-3 rounded  text-primary-600 text-sm"
        >
          <ArrowUp className="w-4 h-4 inline-block translate-y-0 group-hover:-translate-y-1 transition-transform ease-in-out duration-200" />{" "}
          Show less
        </button>
      )}
    </>
  );

  function timelineElements(item: Experience[]) {
    return item.map((expObj: Experience, index: number) => {
      return (
        <div key={`timeline-${index}`} className="not-prose">
          <ul>
            <li className="mb-2 ">
              <div className="flex items-center  text-primary-700 dark:text-primary-300">
                <BadgeCheck className="text-primary-300 w-4 h-4 mr-2" />
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100 !m-0 ">
                  {expObj?.title}
                  {expObj?.location && (
                    <span className="text-sm">- {expObj?.location}</span>
                  )}
                </p>
              </div>
              <p className="text-sm ml-6">{expObj?.description}</p>
            </li>
          </ul>
        </div>
      );
    });
  }
};
export default Timeline;
