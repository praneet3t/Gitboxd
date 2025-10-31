import { Stats } from '@/types';

interface StatsCardProps {
  stats: Stats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="border border-gh-border rounded-md p-3">
        <div className="text-xl font-semibold text-gh-text">{stats.uniqueFilms}</div>
        <div className="text-xs text-gh-text-secondary">Total Films</div>
      </div>
      <div className="border border-gh-border rounded-md p-3">
        <div className="text-xl font-semibold text-gh-text">{stats.totalWatches}</div>
        <div className="text-xs text-gh-text-secondary">Diary Entries</div>
      </div>
      <div className="border border-gh-border rounded-md p-3">
        <div className="text-xl font-semibold text-gh-text">
          {stats.avgRating > 0 ? `★ ${stats.avgRating.toFixed(1)}` : 'N/A'}
        </div>
        <div className="text-xs text-gh-text-secondary">Avg Rating</div>
      </div>
      <div className="border border-gh-border rounded-md p-3">
        <div className="text-xl font-semibold text-gh-text">{stats.longestStreak}</div>
        <div className="text-xs text-gh-text-secondary">Day Streak</div>
      </div>
    </div>
  );
}
