import { Stats } from '@/types';

interface StatsCardProps {
  stats: Stats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-gh-border/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-gh-green-3">{stats.totalWatches}</div>
        <div className="text-sm text-gh-text-secondary">Total Watches</div>
      </div>
      <div className="bg-gh-border/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-gh-green-3">{stats.uniqueFilms}</div>
        <div className="text-sm text-gh-text-secondary">Unique Films</div>
      </div>
      <div className="bg-gh-border/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-gh-green-3">
          {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}
        </div>
        <div className="text-sm text-gh-text-secondary">Avg Rating</div>
      </div>
      <div className="bg-gh-border/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-gh-green-3">{stats.rewatches}</div>
        <div className="text-sm text-gh-text-secondary">Rewatches</div>
      </div>
      <div className="bg-gh-border/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-gh-green-3">{stats.longestStreak}</div>
        <div className="text-sm text-gh-text-secondary">Longest Streak</div>
      </div>
    </div>
  );
}
