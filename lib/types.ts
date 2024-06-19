import { ReactNode } from "react";
import { ReadTimeResults } from "reading-time";

export interface FeatureProps {
  title: string;
  description: ReactNode;
  icon?: ReactNode;
}

export interface CalloutProps {
  children: ReactNode;
  type?: string;
  icon?: ReactNode;
}

export interface CalloutMessageType {
  classes: string;
  icon?: ReactNode;
}

export interface CalloutTypes {
  [key: string]: CalloutMessageType;
}

export interface ICustomImgProps {
  title?: string;
  description?: string;
  src?: string;
}

export type FrontMatter = {
  slug: string;
  readingTime: ReadTimeResults;
  excerpt: string;
  title: string;
  date: string;
  keywords: string;
  image: string;
  org?: string | null;
};

export type PageProperties = {
  readonly params: {
    slug: string;
  };
};

export type FormInput = {
  to_name: string;
  name: string;
  email: string;
  message: string;
};

export type SpotifyAccessToken = {
  access_token: string;
};

export interface SongData {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

export interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type Year = number | "last";

export interface ApiResponse {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear;
  };
  contributions: Array<Activity>;
  streak?: number;
  totalActiveDays?: number;
}

export interface ApiErrorResponse {
  error: string;
}

type Color = string;
type ColorScale = [Color, Color, Color, Color, Color];

export type ThemeInput =
  | {
      light: ColorScale | [from: Color, to: Color];
      dark?: ColorScale | [from: Color, to: Color];
    }
  | {
      light?: ColorScale | [from: Color, to: Color];
      dark: ColorScale | [from: Color, to: Color];
    };

type Badge = {
  timestamp: number;
  badge: {
    name: string;
    icon: string;
  };
};

type UserCalendar = {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  dccBadges: Badge[];
  submissionCalendar: string; // This is a JSON string
};

type MatchedUser = {
  userCalendar: UserCalendar;
};

export type LeetcodeApiResponse = {
  data: {
    matchedUser: MatchedUser;
  };
};

type Location = {
  line: number;
  column: number;
};

type ErrorExtensions = {
  handled: boolean;
};

type LeetcodeError = {
  message: string;
  locations: Location[];
  path: string[];
  extensions: ErrorExtensions;
};

export type LeetcodeApiErrorResponse = {
  errors: LeetcodeError[];
  data: {
    matchedUser: null;
  };
};
