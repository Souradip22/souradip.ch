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
export const API_URL = "https://github-contributions-api.jogruber.de/v4/";

// GitHub theme
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
  const response = await fetch(`${API_URL}${username}?y=${year}`);
  const data: ApiResponse | ApiErrorResponse = await response.json();

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`
    );
  }

  return data as ApiResponse;
}
const GithubActivityGraph: FC<Props> = ({
  username,
  year = "last",
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username, year)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username, year]);

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
    totalCount: `{{count}} contributions in ${
      year === "last" ? "the last year" : "{{year}}"
    }`,
  };

  const totalCount =
    year === "last" ? data.total["lastYear"] : data.total[year];

  return (
    <>
      <Calendar
        data={data.contributions}
        theme={theme}
        labels={Object.assign({}, defaultLabels, labels)}
        totalCount={transformFn && transformTotalCount ? undefined : totalCount}
        blockRadius={3}
        blockMargin={4}
        blockSize={9}
        fontSize={12}
        {...props}
        loading={Boolean(props.loading) || loading}
        maxLevel={4}
        renderBlock={(block, activity) => (
          <MuiTooltip
            title={`${activity.count} activities on ${activity.date}`}
          >
            {block}
          </MuiTooltip>
        )}
      />
    </>
  );
};

export default GithubActivityGraph;
