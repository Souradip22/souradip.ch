"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Tooltip as MuiTooltip,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Calendar, {
  type Props as ActivityCalendarProps,
  Skeleton,
} from "react-activity-calendar";

import {
  Activity,
  ApiErrorResponse,
  ApiResponse,
  ThemeInput,
  Year,
} from "@/lib/types";
export const DEFAULT_THEME: ThemeInput = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export interface Props extends Omit<ActivityCalendarProps, "data" | "theme"> {
  username: string;
  errorMessage?: string;
  theme?: ThemeInput;
  throwOnError?: boolean;
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
  year?: Year;
}

async function fetchCalendarData(
  username: string,
  year: Year
): Promise<ApiResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/leetcode-activity`,
    {
      method: "POST",
      body: JSON.stringify({
        username: username,
        year: year,
      }),
    }
  );
  const data: ApiResponse | ApiErrorResponse = await response.json();

  if (!response.ok) {
    throw Error(
      `Fetching Leetcode data for "${username}" failed: ${(data as ApiErrorResponse).error}`
    );
  }

  return data as ApiResponse;
}

const LeetcodeActivityGraph: FC<Props> = ({
  username,
  year = "last",
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching Leetcode data for "${username}" failed.`,
  ...props
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [yearData, setYearData] = useState(year);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value == "last") {
      setYearData("last");
    } else {
      setYearData(new Date(event.target.value).getFullYear());
    }
  };
  let allYears: string[] = [];
  if (data) {
    allYears = Object.keys(data?.total);
  }

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username, yearData)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username, yearData]);

  useEffect(fetchData, [fetchData]);

  // React error boundaries can't handle asynchronous code, so rethrow.
  if (error) {
    if (throwOnError) {
      throw error;
    } else {
      return <div>{errorMessage}</div>;
    }
  }

  if (loading || !data) {
    return (
      <Skeleton
        blockRadius={3}
        blockMargin={4}
        blockSize={9}
        fontSize={12}
        {...props}
        loading
      />
    );
  }

  const theme = props.theme ?? DEFAULT_THEME;

  const defaultLabels = {
    totalCount: `{{count}} submissions in ${
      yearData === "last" ? "the past one year" : yearData
    }`,
  };

  return (
    <>
      <div className="flex justify-between my-2 gap-2 items-center ">
        <div className="text-xs ">
          <span className="mr-2">
            Total active days:{" "}
            <span className="font-bold text-gray-50">
              {data.totalActiveDays}
            </span>
          </span>
          <span>
            Max streak:{" "}
            <span className="font-bold text-gray-50">{data.streak}</span>
          </span>
        </div>

        <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
          <Select
            value={yearData.toString()}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="bg-white !text-[10px]"
          >
            {allYears.map((yearVal) =>
              yearVal === new Date().getFullYear().toString() ? (
                <MenuItem key={yearVal} className="!text-[10px]" value={"last"}>
                  Current
                </MenuItem>
              ) : (
                <MenuItem
                  key={yearVal}
                  className="!text-[10px]"
                  value={yearVal}
                >
                  {yearVal}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </div>
      <Calendar
        data={data.contributions}
        theme={theme}
        labels={Object.assign({}, defaultLabels, labels)}
        blockRadius={3}
        blockMargin={4}
        blockSize={9}
        fontSize={12}
        {...props}
        loading={Boolean(props.loading) || loading}
        maxLevel={4}
        renderBlock={(block, activity) => (
          <MuiTooltip
            title={`${activity.count} submissions on ${activity.date}`}
          >
            {block}
          </MuiTooltip>
        )}
      />
    </>
  );
};

export default LeetcodeActivityGraph;
