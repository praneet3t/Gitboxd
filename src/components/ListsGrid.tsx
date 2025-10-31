import { List, Film } from '@/types';

interface ListsGridProps {
  lists: List[];
  films: Record<string, Film>;
}

export default function ListsGrid({ lists, films }: ListsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lists.map((list) => (
        <div
          key={list.id}
          className="bg-gh-border/30 p-4 rounded-lg border border-gh-border hover:border-gh-text-secondary transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gh-text text-lg">{list.title}</h4>
            <span className="text-sm text-gh-text-secondary bg-gh-border px-2 py-1 rounded">
              {list.entries.length} films
            </span>
          </div>
          {list.description && (
            <p className="text-sm text-gh-text-secondary mb-3 line-clamp-2">
              {list.description}
            </p>
          )}
          {list.updated && (
            <div className="text-xs text-gh-text-secondary">
              Updated {list.updated}
            </div>
          )}
          {list.entries.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {list.entries.slice(0, 5).map((filmId) => {
                const film = films[filmId];
                return (
                  <div
                    key={filmId}
                    className="text-xs bg-gh-green-1 text-gh-green-3 px-2 py-1 rounded"
                    title={film?.title}
                  >
                    {film?.title?.substring(0, 20) || 'Unknown'}
                  </div>
                );
              })}
              {list.entries.length > 5 && (
                <div className="text-xs text-gh-text-secondary px-2 py-1">
                  +{list.entries.length - 5} more
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
