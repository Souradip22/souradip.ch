import {
  LeetcodeApiResponse,
  LeetcodeApiErrorResponse,
  ApiResponse,
  Activity,
} from "@/lib/types";

export async function POST(req: Request) {
  const { username, year } = await req.json();
  const payload: any = {
    query: `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            activeYears
            streak
            totalActiveDays
            dccBadges {
              timestamp
              badge {
                name
                icon
              }
            }
            submissionCalendar
          }
        }
      }
    `,
    variables: {
      username: username,
    },
    operationName: "userProfileCalendar",
  };
  if (year != "last") {
    payload.variables.year = year;
  }

  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: LeetcodeApiResponse | LeetcodeApiErrorResponse =
    await response.json();

  if ("errors" in data) {
    throw Error(
      `Fetching Leetcode contribution data for "${username}" failed: ${(data as LeetcodeApiErrorResponse).errors}`
    );
  }
  const transformedData: ApiResponse = transformLeetcodeApiResponse(data, year);
  return Response.json(transformedData);
}

const getLevelFromCount = (count: number): 0 | 1 | 2 | 3 | 4 =>
  count <= 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4;

const dateToTimestamp = (dateString: string) => {
  let date = new Date(dateString);
  let timestamp = Math.floor(date.getTime() / 1000).toString();
  return timestamp;
};

const transformLeetcodeApiResponse = (
  apiResponse: LeetcodeApiResponse,
  year: Number | string
): ApiResponse => {
  const { matchedUser } = apiResponse.data;
  const { userCalendar } = matchedUser;
  const { submissionCalendar } = userCalendar;

  // Transforming total active days by year
  const total: { [year: number]: number } = {};
  userCalendar.activeYears.forEach((year) => {
    total[year] = userCalendar.totalActiveDays;
  });
  let parsedSubmissionCalendar = JSON.parse(submissionCalendar);

  if (year != "last") {
    const yearStartDateTimeStamp = dateToTimestamp(`${year}-01-01`);
    const yearEndDateTimeStamp = dateToTimestamp(`${year}-12-31`);

    parsedSubmissionCalendar[yearStartDateTimeStamp] =
      parsedSubmissionCalendar[yearStartDateTimeStamp] || 0;
    parsedSubmissionCalendar[yearEndDateTimeStamp] =
      parsedSubmissionCalendar[yearEndDateTimeStamp] || 0;
  }

  const contributions: Activity[] = Object.entries(
    parsedSubmissionCalendar
  ).map(([timestamp, count]) => ({
    date: new Date(Number(timestamp) * 1000).toISOString().substr(0, 10),
    count: count as number,
    level: getLevelFromCount(count as number),
  }));
  const apiResponseTransformed: ApiResponse = {
    total,
    contributions,
    streak: apiResponse.data.matchedUser.userCalendar.streak,
    totalActiveDays: apiResponse.data.matchedUser.userCalendar.totalActiveDays,
  };

  return apiResponseTransformed;
};
