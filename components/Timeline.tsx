"use client";
import { BadgeCheck, ArrowDown, ArrowUp } from "lucide-react";
import experiences from "@/data/experience.json";
import React, { FC, useState } from "react";

const Timeline: FC = () => {
  const [visibleCount, setVisibleCount] = useState(3); // Number of items to show initially
  const [showAll, setShowAll] = useState(false);

  const showMoreItems = () => {
    setShowAll(true);
    setVisibleCount(experiences.data.length);
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
          Last updated - {experiences.lastUpdate}
        </span>
      </div>
      {experiences.data.slice(0, visibleCount).map((item, index) => {
        return timelineElements({ item, index });
      })}

      {!showAll ? (
        <button
          onClick={showMoreItems}
          className="flex gap-1 items-center py-3 px-3 rounded  text-primary-600 text-sm"
        >
          <ArrowDown className="w-5 h-5" /> Show more
        </button>
      ) : (
        <button
          onClick={showLessItems}
          className="flex gap-1 items-center py-3 px-3 rounded  text-primary-600 text-sm"
        >
          <ArrowUp className="w-5 h-5" /> Show less
        </button>
      )}
    </>
  );

  function timelineElements({
    item,
    index,
  }: {
    item:
      | {
          id: number;
          companyName: string;
          description: string;
          fromDate: string;
          toDate: string;
          location: string;
          designation: string;
          type: string;
        }
      | undefined;
    index: number | undefined;
  }): React.JSX.Element {
    return (
      <div key={`timeline-${index}`}>
        <h5 className="font-bold my-4 tracking-tight text-gray-900 dark:text-gray-100 ">
          {item?.fromDate} - {item?.toDate}
        </h5>
        <ul>
          <li className="mb-4 ml-2">
            <div className="flex items-center mb-2 text-primary-700 dark:text-primary-300">
              <BadgeCheck className="text-primary-300 w-5 h-5 mr-2" />
              <p className="font-medium text-gray-900 dark:text-gray-100 !m-0">
                {item?.companyName} -{" "}
                <span className="text-sm">{item?.location}</span>
              </p>
            </div>
            <p className="text-sm !m-0">{item?.description}</p>
          </li>
        </ul>
      </div>
    );
  }
};
export default Timeline;
