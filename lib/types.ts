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
