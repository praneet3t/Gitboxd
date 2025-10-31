export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  joined: string;
}

export interface Film {
  id: string;
  title: string;
  year: number;
  tmdbId?: string;
  posterUrl?: string;
}

export interface DiaryEntry {
  id: string;
  filmId: string;
  date: string;
  rating?: number;
  review?: string;
  rewatch: boolean;
  tags: string[];
}

export interface List {
  id: string;
  title: string;
  description: string;
  entries: string[];
  updated?: string;
}

export interface Stats {
  totalWatches: number;
  uniqueFilms: number;
  avgRating: number;
  rewatches: number;
  longestStreak: number;
}

export interface LetterboxdData {
  profile: Profile;
  films: Record<string, Film>;
  diary: DiaryEntry[];
  lists: List[];
  stats: Stats;
}

export interface HeatmapDay {
  date: string;
  count: number;
  films: Array<{
    title: string;
    rating?: number;
    review?: string;
  }>;
}
