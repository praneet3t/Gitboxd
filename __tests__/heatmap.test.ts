import { generateHeatmapData, getYearsFromDiary } from '@/lib/heatmap';
import { DiaryEntry, Film } from '@/types';

describe('Heatmap Generation', () => {
  const mockFilms: Record<string, Film> = {
    'film-1': { id: 'film-1', title: 'Spirited Away', year: 2001 },
    'film-2': { id: 'film-2', title: 'Parasite', year: 2019 },
  };

  const mockDiary: DiaryEntry[] = [
    {
      id: '1',
      filmId: 'film-1',
      date: '2024-01-01',
      rating: 5,
      review: 'Amazing',
      rewatch: false,
      tags: [],
    },
    {
      id: '2',
      filmId: 'film-2',
      date: '2024-01-01',
      rating: 4.5,
      review: 'Great',
      rewatch: false,
      tags: [],
    },
    {
      id: '3',
      filmId: 'film-1',
      date: '2024-01-01',
      rewatch: true,
      tags: [],
    },
    {
      id: '4',
      filmId: 'film-1',
      date: '2024-01-02',
      rating: 5,
      rewatch: false,
      tags: [],
    },
  ];

  test('deduplicates films on same date', () => {
    const heatmapData = generateHeatmapData(mockDiary, mockFilms);
    const jan1 = heatmapData.find(d => d.date === '2024-01-01');
    
    expect(jan1).toBeDefined();
    expect(jan1!.count).toBe(2); // Only 2 unique films despite 3 entries
  });

  test('counts films correctly across dates', () => {
    const heatmapData = generateHeatmapData(mockDiary, mockFilms);
    
    expect(heatmapData).toHaveLength(2);
    expect(heatmapData.find(d => d.date === '2024-01-02')!.count).toBe(1);
  });

  test('includes film details in tooltip data', () => {
    const heatmapData = generateHeatmapData(mockDiary, mockFilms);
    const jan1 = heatmapData.find(d => d.date === '2024-01-01');
    
    expect(jan1!.films).toHaveLength(2);
    expect(jan1!.films[0].title).toBe('Spirited Away');
    expect(jan1!.films[1].title).toBe('Parasite');
  });

  test('filters by year correctly', () => {
    const diary2023: DiaryEntry[] = [
      { id: '5', filmId: 'film-1', date: '2023-12-31', rewatch: false, tags: [] },
    ];
    
    const heatmapData = generateHeatmapData([...mockDiary, ...diary2023], mockFilms, 2024);
    
    expect(heatmapData.every(d => d.date.startsWith('2024'))).toBe(true);
  });

  test('extracts years from diary', () => {
    const diary: DiaryEntry[] = [
      { id: '1', filmId: 'film-1', date: '2022-01-01', rewatch: false, tags: [] },
      { id: '2', filmId: 'film-1', date: '2023-06-15', rewatch: false, tags: [] },
      { id: '3', filmId: 'film-1', date: '2024-12-31', rewatch: false, tags: [] },
    ];
    
    const years = getYearsFromDiary(diary);
    
    expect(years).toEqual([2024, 2023, 2022]);
  });
});
