import JSZip from 'jszip';
import Papa from 'papaparse';
import { LetterboxdData, Film, DiaryEntry, List, Profile, Stats } from '@/types';

const normalizeHeader = (header: string): string => 
  header.toLowerCase().trim().replace(/\s+/g, '_');

const mapHeaders = (row: any): any => {
  const mapped: any = {};
  for (const key in row) {
    const normalized = normalizeHeader(key);
    mapped[normalized] = row[key];
  }
  return mapped;
};

const parseCSV = (text: string): any[] => {
  const result = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return result.data.map(mapHeaders);
};

const extractDate = (row: any): string | null => {
  const dateFields = ['date', 'watched_date', 'dateadded', 'created'];
  for (const field of dateFields) {
    if (row[field]) {
      const dateStr = String(row[field]).split('T')[0];
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    }
  }
  return null;
};

const extractFilmId = (row: any): string => {
  return String(row.letterboxd_uri || row.film_id || row.tmdb_id || row.title || '').replace(/\s+/g, '-');
};

export const parseLetterboxdZip = async (file: File): Promise<LetterboxdData> => {
  const zip = await JSZip.loadAsync(file);
  
  const profile: Profile = {
    username: 'User',
    displayName: 'Letterboxd User',
    bio: '',
    avatar: '',
    joined: new Date().toISOString().split('T')[0],
  };

  const films: Record<string, Film> = {};
  const diary: DiaryEntry[] = [];
  const lists: List[] = [];

  // Parse profile
  const profileFile = zip.file('profile.csv');
  if (profileFile) {
    const text = await profileFile.async('text');
    const rows = parseCSV(text);
    if (rows[0]) {
      profile.username = rows[0].username || rows[0].display_name || 'User';
      profile.displayName = rows[0].display_name || rows[0].username || 'User';
      profile.bio = rows[0].bio || rows[0].about || '';
      profile.avatar = rows[0].avatar || '';
      profile.joined = rows[0].joined || rows[0].created || profile.joined;
    }
  }

  // Parse diary (primary source for heatmap)
  const diaryFile = zip.file('diary.csv');
  if (diaryFile) {
    const text = await diaryFile.async('text');
    const rows = parseCSV(text);
    
    rows.forEach((row, idx) => {
      const date = extractDate(row);
      if (!date) return;

      const filmId = extractFilmId(row);
      const title = row.name || row.title || 'Unknown';
      const year = parseInt(row.year) || 0;

      if (!films[filmId]) {
        films[filmId] = {
          id: filmId,
          title,
          year,
          tmdbId: row.tmdb_id,
          posterUrl: row.poster_url,
        };
      }

      diary.push({
        id: `diary-${idx}`,
        filmId,
        date,
        rating: row.rating ? parseFloat(row.rating) : undefined,
        review: row.review || row.diary_entry || '',
        rewatch: row.rewatch === 'Yes' || row.rewatch === true,
        tags: row.tags ? String(row.tags).split(/[,;]/).map(t => t.trim()) : [],
      });
    });
  }

  // Fallback to watched.csv if no diary
  if (diary.length === 0) {
    const watchedFile = zip.file('watched.csv');
    if (watchedFile) {
      const text = await watchedFile.async('text');
      const rows = parseCSV(text);
      
      rows.forEach((row, idx) => {
        const date = extractDate(row);
        if (!date) return;

        const filmId = extractFilmId(row);
        const title = row.name || row.title || 'Unknown';

        if (!films[filmId]) {
          films[filmId] = {
            id: filmId,
            title,
            year: parseInt(row.year) || 0,
            tmdbId: row.tmdb_id,
          };
        }

        diary.push({
          id: `watched-${idx}`,
          filmId,
          date,
          rewatch: false,
          tags: [],
        });
      });
    }
  }

  // Parse lists
  const listsFolder = Object.keys(zip.files).filter(f => f.startsWith('lists/'));
  if (listsFolder.length > 0) {
    const listsFile = zip.file('lists/lists.csv');
    if (listsFile) {
      const text = await listsFile.async('text');
      const rows = parseCSV(text);
      
      rows.forEach(row => {
        lists.push({
          id: row.id || row.list_id || String(lists.length),
          title: row.name || row.title || 'Untitled List',
          description: row.description || '',
          entries: [],
          updated: row.updated || row.modified,
        });
      });
    }

    const entriesFile = zip.file('lists/list-entries.csv');
    if (entriesFile) {
      const text = await entriesFile.async('text');
      const rows = parseCSV(text);
      
      rows.forEach(row => {
        const listId = row.list_id || row.id;
        const list = lists.find(l => l.id === listId);
        if (list) {
          const filmId = extractFilmId(row);
          list.entries.push(filmId);
          
          if (!films[filmId]) {
            films[filmId] = {
              id: filmId,
              title: row.name || row.title || 'Unknown',
              year: parseInt(row.year) || 0,
              tmdbId: row.tmdb_id,
            };
          }
        }
      });
    }
  }

  // Calculate stats
  const uniqueFilms = new Set(diary.map(d => d.filmId)).size;
  const rewatches = diary.filter(d => d.rewatch).length;
  const ratingsSum = diary.reduce((sum, d) => sum + (d.rating || 0), 0);
  const ratingsCount = diary.filter(d => d.rating).length;
  
  const sortedDiary = [...diary].sort((a, b) => a.date.localeCompare(b.date));
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate: string | null = null;

  sortedDiary.forEach(entry => {
    if (lastDate) {
      const dayDiff = (new Date(entry.date).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24);
      if (dayDiff === 1) {
        currentStreak++;
      } else if (dayDiff > 1) {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    lastDate = entry.date;
  });
  longestStreak = Math.max(longestStreak, currentStreak);

  const stats: Stats = {
    totalWatches: diary.length,
    uniqueFilms,
    avgRating: ratingsCount > 0 ? ratingsSum / ratingsCount : 0,
    rewatches,
    longestStreak,
  };

  return { profile, films, diary, lists, stats };
};
