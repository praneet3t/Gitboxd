import { DiaryEntry, Film, LetterboxdData } from '@/types';

export interface AdvancedStats {
  topRewatched: Array<{ film: Film; count: number }>;
  topRated: Array<{ film: Film; rating: number }>;
  genreDistribution: Record<string, number>;
  decadeDistribution: Record<string, number>;
  monthlyActivity: Array<{ month: string; count: number }>;
  ratingDistribution: Record<string, number>;
  averageRatingByYear: Array<{ year: number; avgRating: number }>;
  busiestDay: { date: string; count: number };
  favoriteYear: { year: number; count: number };
}

export const calculateAdvancedStats = (data: LetterboxdData): AdvancedStats => {
  const { diary, films } = data;

  // Top rewatched
  const rewatchCount = new Map<string, number>();
  diary.forEach(entry => {
    if (entry.rewatch) {
      rewatchCount.set(entry.filmId, (rewatchCount.get(entry.filmId) || 0) + 1);
    }
  });
  const topRewatched = Array.from(rewatchCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([filmId, count]) => ({ film: films[filmId], count }));

  // Top rated
  const topRated = diary
    .filter(e => e.rating && e.rating >= 4.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3)
    .map(e => ({ film: films[e.filmId], rating: e.rating || 0 }));

  // Genre distribution from tags
  const genreDistribution: Record<string, number> = {};
  diary.forEach(entry => {
    entry.tags.forEach(tag => {
      genreDistribution[tag] = (genreDistribution[tag] || 0) + 1;
    });
  });

  // Decade distribution
  const decadeDistribution: Record<string, number> = {};
  Object.values(films).forEach(film => {
    if (film.year) {
      const decade = `${Math.floor(film.year / 10) * 10}s`;
      decadeDistribution[decade] = (decadeDistribution[decade] || 0) + 1;
    }
  });

  // Monthly activity
  const monthlyCount = new Map<string, number>();
  diary.forEach(entry => {
    const month = entry.date.substring(0, 7);
    monthlyCount.set(month, (monthlyCount.get(month) || 0) + 1);
  });
  const monthlyActivity = Array.from(monthlyCount.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month, count }));

  // Rating distribution
  const ratingDistribution: Record<string, number> = {};
  diary.forEach(entry => {
    if (entry.rating) {
      const rating = entry.rating.toString();
      ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
    }
  });

  // Average rating by year
  const yearRatings = new Map<number, number[]>();
  diary.forEach(entry => {
    if (entry.rating) {
      const year = new Date(entry.date).getFullYear();
      if (!yearRatings.has(year)) yearRatings.set(year, []);
      yearRatings.get(year)!.push(entry.rating);
    }
  });
  const averageRatingByYear = Array.from(yearRatings.entries())
    .map(([year, ratings]) => ({
      year,
      avgRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
    }))
    .sort((a, b) => a.year - b.year);

  // Busiest day
  const dayCount = new Map<string, number>();
  diary.forEach(entry => {
    dayCount.set(entry.date, (dayCount.get(entry.date) || 0) + 1);
  });
  const busiestDay = Array.from(dayCount.entries())
    .sort((a, b) => b[1] - a[1])[0] || { date: '', count: 0 };

  // Favorite year (most films from)
  const yearCount = new Map<number, number>();
  Object.values(films).forEach(film => {
    if (film.year) {
      yearCount.set(film.year, (yearCount.get(film.year) || 0) + 1);
    }
  });
  const favoriteYear = Array.from(yearCount.entries())
    .sort((a, b) => b[1] - a[1])[0] || { year: 0, count: 0 };

  return {
    topRewatched,
    topRated,
    genreDistribution,
    decadeDistribution,
    monthlyActivity,
    ratingDistribution,
    averageRatingByYear,
    busiestDay: { date: busiestDay[0], count: busiestDay[1] },
    favoriteYear: { year: favoriteYear[0], count: favoriteYear[1] },
  };
};
