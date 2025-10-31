'use client';

import { useMemo } from 'react';
import { LetterboxdData } from '@/types';
import { calculateAdvancedStats } from '@/lib/analytics';

interface StatsPageProps {
  data: LetterboxdData;
  onBack: () => void;
}

export default function StatsPage({ data, onBack }: StatsPageProps) {
  const stats = useMemo(() => calculateAdvancedStats(data), [data]);

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text">
      <header className="border-b border-gh-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gh-text-secondary hover:text-gh-text"
            >
              ← Back
            </button>
            <h1 className="text-xl font-semibold">Insights</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Top Rewatched */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🔁</span> Most Rewatched
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.topRewatched.map((item, idx) => (
              <div key={idx} className="border border-gh-border rounded-md p-4">
                <div className="text-2xl font-bold text-gh-green-3 mb-1">{item.count}x</div>
                <div className="font-semibold">{item.film?.title}</div>
                <div className="text-sm text-gh-text-secondary">{item.film?.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⭐</span> Highest Rated
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.topRated.map((item, idx) => (
              <div key={idx} className="border border-gh-border rounded-md p-4">
                <div className="text-2xl font-bold text-yellow-400 mb-1">★ {item.rating}</div>
                <div className="font-semibold">{item.film?.title}</div>
                <div className="text-sm text-gh-text-secondary">{item.film?.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Decade Distribution */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📅</span> Films by Decade
          </h2>
          <div className="border border-gh-border rounded-md p-4">
            <div className="space-y-2">
              {Object.entries(stats.decadeDistribution)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([decade, count]) => (
                  <div key={decade} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-gh-text-secondary">{decade}</div>
                    <div className="flex-1 bg-gh-border rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-gh-green-3 h-full flex items-center px-2 text-xs font-semibold"
                        style={{
                          width: `${(count / Math.max(...Object.values(stats.decadeDistribution))) * 100}%`,
                        }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Rating Distribution */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📊</span> Rating Distribution
          </h2>
          <div className="border border-gh-border rounded-md p-4">
            <div className="flex items-end gap-2 h-40">
              {['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'].map(rating => {
                const count = stats.ratingDistribution[rating] || 0;
                const maxCount = Math.max(...Object.values(stats.ratingDistribution));
                const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return (
                  <div key={rating} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs text-gh-text-secondary">{count}</div>
                    <div
                      className="w-full bg-gh-green-3 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-gh-text-secondary">{rating}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quirky Stats */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🎲</span> Fun Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gh-border rounded-md p-4">
              <div className="text-sm text-gh-text-secondary mb-1">Busiest Day</div>
              <div className="text-xl font-semibold">{stats.busiestDay.date}</div>
              <div className="text-sm text-gh-text-secondary">{stats.busiestDay.count} films watched</div>
            </div>
            <div className="border border-gh-border rounded-md p-4">
              <div className="text-sm text-gh-text-secondary mb-1">Favorite Era</div>
              <div className="text-xl font-semibold">{stats.favoriteYear.year}</div>
              <div className="text-sm text-gh-text-secondary">{stats.favoriteYear.count} films from this year</div>
            </div>
            <div className="border border-gh-border rounded-md p-4">
              <div className="text-sm text-gh-text-secondary mb-1">Total Watch Time</div>
              <div className="text-xl font-semibold">~{Math.round(data.stats.uniqueFilms * 1.8)} hours</div>
              <div className="text-sm text-gh-text-secondary">Assuming 108 min avg</div>
            </div>
            <div className="border border-gh-border rounded-md p-4">
              <div className="text-sm text-gh-text-secondary mb-1">Rewatch Rate</div>
              <div className="text-xl font-semibold">
                {((data.stats.rewatches / data.stats.totalWatches) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gh-text-secondary">Of all watches</div>
            </div>
          </div>
        </section>

        {/* Top Tags */}
        {Object.keys(stats.genreDistribution).length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🏷️</span> Top Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.genreDistribution)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 15)
                .map(([tag, count]) => (
                  <div
                    key={tag}
                    className="border border-gh-border rounded-full px-3 py-1 text-sm"
                  >
                    {tag} <span className="text-gh-text-secondary">({count})</span>
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
