'use client';

import { useState, useMemo } from 'react';
import { LetterboxdData } from '@/types';
import { generateHeatmapData, getYearsFromDiary } from '@/lib/heatmap';
import Heatmap from './Heatmap';
import StatsCard from './StatsCard';
import ActivityFeed from './ActivityFeed';
import ListsGrid from './ListsGrid';

interface ProfileViewProps {
  data: LetterboxdData;
  onReset: () => void;
}

export default function ProfileView({ data, onReset }: ProfileViewProps) {
  const years = useMemo(() => getYearsFromDiary(data.diary), [data.diary]);
  const [selectedYear, setSelectedYear] = useState(years[0] || new Date().getFullYear());

  const heatmapData = useMemo(
    () => generateHeatmapData(data.diary, data.films, selectedYear),
    [data.diary, data.films, selectedYear]
  );

  const handleExport = () => {
    const exportData = {
      profile: data.profile,
      stats: data.stats,
      diary: data.diary,
      lists: data.lists,
      films: data.films,
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gitboxd-${data.profile.username}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text">
      <header className="border-b border-gh-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">GitBoxd</h1>
          <div className="space-x-4">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gh-border hover:bg-gh-text-secondary/20 rounded transition-colors"
            >
              Export JSON
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gh-border hover:bg-gh-text-secondary/20 rounded transition-colors"
            >
              Upload New
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              {data.profile.avatar && (
                <img
                  src={data.profile.avatar}
                  alt={data.profile.displayName}
                  className="w-full rounded-full mb-4"
                />
              )}
              <h2 className="text-2xl font-bold mb-1">{data.profile.displayName}</h2>
              <div className="text-gh-text-secondary mb-4">@{data.profile.username}</div>
              {data.profile.bio && (
                <p className="text-sm mb-4">{data.profile.bio}</p>
              )}
              <div className="text-sm text-gh-text-secondary">
                Joined {data.profile.joined}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {data.stats.totalWatches} films in {selectedYear}
                </h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="bg-gh-border text-gh-text px-3 py-1 rounded"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="bg-gh-border/30 p-4 rounded-lg overflow-x-auto">
                <Heatmap data={heatmapData} year={selectedYear} />
              </div>
            </section>

            <StatsCard stats={data.stats} />

            {data.lists.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-4">Lists</h3>
                <ListsGrid lists={data.lists} films={data.films} />
              </section>
            )}

            <section>
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <ActivityFeed diary={data.diary} films={data.films} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
