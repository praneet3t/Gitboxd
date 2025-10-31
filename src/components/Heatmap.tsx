'use client';

import { useMemo, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import { HeatmapDay } from '@/types';
import { getColorForCount } from '@/lib/heatmap';

interface HeatmapProps {
  data: HeatmapDay[];
  year: number;
}

export default function Heatmap({ data, year }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const maxCount = useMemo(() => 
    Math.max(...data.map(d => d.count), 1),
    [data]
  );

  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const values = useMemo(() => 
    data.map(d => ({
      date: d.date,
      count: d.count,
      films: d.films,
    })),
    [data]
  );

  return (
    <div className="w-full">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          const color = getColorForCount(value.count, maxCount);
          return `color-scale-${color}`;
        }}
        tooltipDataAttrs={(value: any) => {
          if (!value || !value.date) return {};
          return {
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': value.date,
          };
        }}
        onMouseOver={(event, value) => {
          if (value) {
            setHoveredDay(value as HeatmapDay);
          }
        }}
        onMouseLeave={() => setHoveredDay(null)}
      />
      
      <Tooltip id="heatmap-tooltip" className="z-50">
        {hoveredDay && (
          <div className="max-w-xs">
            <div className="font-semibold mb-1">
              {hoveredDay.date} - {hoveredDay.count} film{hoveredDay.count !== 1 ? 's' : ''}
            </div>
            <div className="space-y-1 text-sm">
              {hoveredDay.films.map((film, idx) => (
                <div key={idx} className="border-t border-gray-600 pt-1">
                  <div className="font-medium">{film.title}</div>
                  {film.rating && (
                    <div className="text-yellow-400">★ {film.rating}</div>
                  )}
                  {film.review && (
                    <div className="text-gray-300 text-xs italic">{film.review}...</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Tooltip>

      <style jsx global>{`
        .react-calendar-heatmap .color-empty { fill: #161b22; }
        .react-calendar-heatmap .color-scale-gh-green-0 { fill: #161b22; }
        .react-calendar-heatmap .color-scale-gh-green-1 { fill: #0e4429; }
        .react-calendar-heatmap .color-scale-gh-green-2 { fill: #006d32; }
        .react-calendar-heatmap .color-scale-gh-green-3 { fill: #26a641; }
        .react-calendar-heatmap .color-scale-gh-green-4 { fill: #39d353; }
        .react-calendar-heatmap rect { rx: 2; }
        .react-calendar-heatmap rect:hover { stroke: #c9d1d9; stroke-width: 1px; }
      `}</style>
    </div>
  );
}
