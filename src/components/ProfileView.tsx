'use client';

import { useState, useMemo } from 'react';
import { LetterboxdData } from '@/types';
import { generateHeatmapData, getYearsFromDiary } from '@/lib/heatmap';
import Heatmap from './Heatmap';
import StatsCard from './StatsCard';
import ActivityFeed from './ActivityFeed';
import ListsGrid from './ListsGrid';
import StatsPage from './StatsPage';

interface ProfileViewProps {
  data: LetterboxdData;
  onReset: () => void;
}

type View = 'profile' | 'stats';

export default function ProfileView({ data, onReset }: ProfileViewProps) {
  const [view, setView] = useState<View>('profile');
  const years = useMemo(() => getYearsFromDiary(data.diary), [data.diary]);
  const [selectedYear, setSelectedYear] = useState(years[0] || new Date().getFullYear());

  if (view === 'stats') {
    return <StatsPage data={data} onBack={() => setView('profile')} />;
  }

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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">GitBoxd</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('stats')}
                className="px-3 py-1.5 text-sm border border-gh-border hover:bg-gh-border/30 rounded-md transition-colors"
              >
                Insights
              </button>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 text-sm border border-gh-border hover:bg-gh-border/30 rounded-md transition-colors"
              >
                Export
              </button>
              <button
                onClick={onReset}
                className="px-3 py-1.5 text-sm bg-gh-green-3 hover:bg-gh-green-4 text-black font-semibold rounded-md transition-colors"
              >
                New Upload
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              {data.profile.avatar && (
                <img
                  src={data.profile.avatar}
                  alt={data.profile.displayName}
                  className="w-32 h-32 rounded-full mb-3 border-2 border-gh-border"
                />
              )}
              <h2 className="text-xl font-semibold mb-0.5">{data.profile.displayName}</h2>
              <div className="text-sm text-gh-text-secondary mb-3">@{data.profile.username}</div>
              {data.profile.bio && (
                <p className="text-sm text-gh-text-secondary mb-3">{data.profile.bio}</p>
              )}
              <div className="text-xs text-gh-text-secondary flex items-center gap-1">
                <span>🗓️</span> Joined {data.profile.joined}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <section>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gh-text-secondary">
                  {heatmapData.reduce((sum, d) => sum + d.count, 0)} contributions in {selectedYear}
                </h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="bg-gh-bg border border-gh-border text-gh-text text-sm px-2 py-1 rounded-md"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="border border-gh-border rounded-md p-4 overflow-x-auto">
                <Heatmap data={heatmapData} year={selectedYear} />
              </div>
            </section>

            <StatsCard stats={data.stats} />

            <section>
              <h3 className="text-base font-semibold mb-3">Contribution activity</h3>
              <ActivityFeed diary={data.diary} films={data.films} />
            </section>

            {data.lists.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-3">Pinned Lists</h3>
                <ListsGrid lists={data.lists.slice(0, 6)} films={data.films} />
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
