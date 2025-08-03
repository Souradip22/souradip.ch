"use client";

import { FC, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, BadgeCheck } from "lucide-react";
import { ResumeData, Experience } from "@/lib/types";

const Timeline: FC = () => {
  const [timeline, setTimeline] = useState<ResumeData | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTimelineData() {
      try {
        const res = await fetch("/api/timeline", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch timeline");
        const data = await res.json();
        setTimeline(data);
      } catch (err) {
        setError("Failed to retrieve timeline data.");
      }
    }

    fetchTimelineData();
  }, []);

  if (error) {
    return (
      <div className="text-red-400 font-medium">{error}</div>
    );
  }

  if (!timeline) {
    return (
      <div className="text-gray-300">
        Loading timeline...
      </div>
    );
  }

  const timelineYears = Object.keys(timeline.data).sort().reverse();

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
        <h2 className="text-xl font-medium text-white !m-0">
          Timeline
        </h2>
        <span className="relative flex items-center justify-center px-2 py-[3px] rounded-lg group text-xs  shadow-sm border  min-h-[28px] border-gray-700 text-gray-200 bg-neutral-900 duration-100">
          Last updated - {timeline.lastUpdate}
        </span>
      </div>

      {timelineYears.slice(0, visibleCount).map((year, index) => (
        <div key={`timeline-${index}`} className="not-prose my-4">
          <h3 className="font-bold text-primary-50 my-2">{year}</h3>
          {timelineElements(timeline.data[year])}
          
          {/* <p className="flex justify-center items-center my-0"> - - - </p> */}
        </div>
      ))}

      {!showAll ? (
        <button
          onClick={showMoreItems}
          className="group flex gap-1 items-center py-3 px-3 rounded text-primary-600 text-sm"
        >
          <ArrowDown className="w-4 h-4 inline-block group-hover:translate-y-1 transition-transform" />
          Show more
        </button>
      ) : (
        <button
          onClick={showLessItems}
          className="group flex gap-1 items-center py-3 px-3 rounded text-primary-600 text-sm"
        >
          <ArrowUp className="w-4 h-4 inline-block group-hover:-translate-y-1 transition-transform" />
          Show less
        </button>
      )}
    </>
  );

  function timelineElements(item: Experience[]) {
    return item.map((expObj, index) => (
      <div key={`exp-${index}`} className="not-prose">
        <ul>
          <li className="mb-2">
            <div className="flex items-center text-primary-300">
              <BadgeCheck className="text-primary-300 w-4 h-4 mr-2" />
              <p className="font-medium text-sm text-gray-100 !m-0">
                {expObj.title}
                {expObj.location && (
                  <span className="text-sm"> - {expObj.location}</span>
                )}
              </p>
            </div>
            <p className="text-sm ml-6">{expObj.description}</p>
          </li>
        </ul>
      </div>
    ));
  }
};

export default Timeline;
