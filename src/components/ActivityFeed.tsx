import { useMemo } from 'react';
import { DiaryEntry, Film } from '@/types';

interface ActivityFeedProps {
  diary: DiaryEntry[];
  films: Record<string, Film>;
}

export default function ActivityFeed({ diary, films }: ActivityFeedProps) {
  const sortedDiary = useMemo(
    () => [...diary].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4),
    [diary]
  );

  const displayedEntries = sortedDiary;

  const getRelativeTime = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <div className="space-y-3">
      {displayedEntries.map((entry) => {
        const film = films[entry.filmId];
        return (
          <div
            key={entry.id}
            className="border border-gh-border rounded-md p-3 hover:bg-gh-border/20 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gh-green-1 rounded-full flex items-center justify-center text-lg">
                🎬
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gh-text text-sm">
                    Watched {film?.title || 'Unknown Film'}
                  </span>
                  {entry.rating && (
                    <span className="text-xs text-yellow-400">★{entry.rating}</span>
                  )}
                  {entry.rewatch && (
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded">
                      rewatch
                    </span>
                  )}
                </div>
                {entry.review && (
                  <p className="text-xs text-gh-text-secondary mb-1 line-clamp-2">
                    {entry.review}
                  </p>
                )}
                <div className="text-xs text-gh-text-secondary">
                  {getRelativeTime(entry.date)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
