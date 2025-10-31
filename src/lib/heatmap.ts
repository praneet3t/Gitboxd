import { DiaryEntry, Film, HeatmapDay } from '@/types';

export const generateHeatmapData = (
  diary: DiaryEntry[],
  films: Record<string, Film>,
  year?: number
): HeatmapDay[] => {
  const dateMap = new Map<string, Set<string>>();
  const filmsByDate = new Map<string, Array<{ filmId: string; entry: DiaryEntry }>>();

  diary.forEach(entry => {
    const entryYear = new Date(entry.date).getFullYear();
    if (year && entryYear !== year) return;

    if (!dateMap.has(entry.date)) {
      dateMap.set(entry.date, new Set());
      filmsByDate.set(entry.date, []);
    }
    
    dateMap.get(entry.date)!.add(entry.filmId);
    filmsByDate.get(entry.date)!.push({ filmId: entry.filmId, entry });
  });

  const heatmapData: HeatmapDay[] = [];
  
  dateMap.forEach((filmIds, date) => {
    const dayFilms = filmsByDate.get(date)!;
    const uniqueFilms = Array.from(new Set(dayFilms.map(f => f.filmId)))
      .map(filmId => {
        const film = films[filmId];
        const entry = dayFilms.find(f => f.filmId === filmId)?.entry;
        return {
          title: film?.title || 'Unknown',
          rating: entry?.rating,
          review: entry?.review?.substring(0, 100),
        };
      });

    heatmapData.push({
      date,
      count: filmIds.size,
      films: uniqueFilms,
    });
  });

  return heatmapData.sort((a, b) => a.date.localeCompare(b.date));
};

export const getYearsFromDiary = (diary: DiaryEntry[]): number[] => {
  const years = new Set(diary.map(d => new Date(d.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
};

export const getColorForCount = (count: number, maxCount: number): string => {
  if (count === 0) return 'gh-green-0';
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 'gh-green-1';
  if (ratio <= 0.5) return 'gh-green-2';
  if (ratio <= 0.75) return 'gh-green-3';
  return 'gh-green-4';
};
