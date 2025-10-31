import { useMemo, useState } from 'react';
import { DiaryEntry, Film } from '@/types';

interface ActivityFeedProps {
  diary: DiaryEntry[];
  films: Record<string, Film>;
}

export default function ActivityFeed({ diary, films }: ActivityFeedProps) {
  const [limit, setLimit] = useState(20);

  const sortedDiary = useMemo(
    () => [...diary].sort((a, b) => b.date.localeCompare(a.date)),
    [diary]
  );

  const displayedEntries = sortedDiary.slice(0, limit);

  return (
    <div className="space-y-4">
      {displayedEntries.map((entry) => {
        const film = films[entry.filmId];
        return (
          <div
            key={entry.id}
            className="bg-gh-border/30 p-4 rounded-lg border border-gh-border hover:border-gh-text-secondary transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gh-green-1 rounded flex items-center justify-center text-2xl">
                🎬
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-gh-text">
                    {film?.title || 'Unknown Film'}
                  </span>
                  {film?.year && (
                    <span className="text-sm text-gh-text-secondary">({film.year})</span>
                  )}
                  {entry.rewatch && (
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">
                      Rewatch
                    </span>
                  )}
                </div>
                <div className="text-sm text-gh-text-secondary mb-2">
                  Watched on {entry.date}
                  {entry.rating && (
                    <span className="ml-2 text-yellow-400">★ {entry.rating}</span>
                  )}
                </div>
                {entry.review && (
                  <p className="text-sm text-gh-text-secondary italic">
                    "{entry.review.substring(0, 200)}{entry.review.length > 200 ? '...' : ''}"
                  </p>
                )}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gh-border px-2 py-1 rounded text-gh-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {sortedDiary.length > limit && (
        <button
          onClick={() => setLimit(limit + 20)}
          className="w-full py-3 bg-gh-border hover:bg-gh-text-secondary/20 rounded transition-colors"
        >
          Load More ({sortedDiary.length - limit} remaining)
        </button>
      )}
    </div>
  );
}
