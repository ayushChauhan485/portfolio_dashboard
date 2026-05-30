import React from 'react';
import { useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const maleData = [
  { subject: 'Lighting/Safety', A: 8 },
  { subject: 'Shade Presence', A: 5 },
  { subject: 'Crosswalks', A: 6 },
  { subject: 'Sidewalk Width', A: 8 },
  { subject: 'Green Cover', A: 6 },
];

const femaleData = [
  { subject: 'Lighting/Safety', A: 3 },
  { subject: 'Shade Presence', A: 6 },
  { subject: 'Crosswalks', A: 4 },
  { subject: 'Sidewalk Width', A: 7 },
  { subject: 'Green Cover', A: 7 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const value = payload[0]?.value;

  return (
    <div className="rounded-2xl border border-stone-200 bg-[#f7f3eb]/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-sm font-semibold text-stone-900">{label}</p>
      <p className="mt-1 text-sm text-stone-700">Score: {value}/10</p>
      {label === 'Lighting/Safety' ? (
        <p className="mt-2 max-w-xs text-sm text-stone-700">
          This axis captures the sharper safety barrier noted for female cyclists and pedestrians in the research.
        </p>
      ) : null}
    </div>
  );
}

export default function Act3Streetscape() {
  const [demographic, setDemographic] = useState('Male Demographic');
  const chartData = demographic === 'Male Demographic' ? maleData : femaleData;

  return (
    <section className="w-full rounded-[2rem] border border-stone-200 bg-transparent p-4 sm:p-6">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-olive-800">
            Act 3 Streetscape
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Linear Walkability Index and demographic constraints
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
            Compare how urban mobility conditions shift across demographic experience on the same street network.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setDemographic('Male Demographic')}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              demographic === 'Male Demographic'
                ? 'border-olive-700 bg-[#556B2F] text-white shadow-sm'
                : 'border-stone-300 bg-white/70 text-stone-700 hover:border-olive-500 hover:text-stone-900'
            }`}
            aria-pressed={demographic === 'Male Demographic'}
          >
            Male Demographic
          </button>

          <button
            type="button"
            onClick={() => setDemographic('Female Demographic')}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              demographic === 'Female Demographic'
                ? 'border-olive-700 bg-[#C5E1A5] text-stone-900 shadow-sm'
                : 'border-stone-300 bg-white/70 text-stone-700 hover:border-olive-500 hover:text-stone-900'
            }`}
            aria-pressed={demographic === 'Female Demographic'}
          >
            Female Demographic
          </button>
        </div>

        <div className="h-[360px] w-full sm:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius="72%">
              <PolarGrid stroke="#d9d0be" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#4b463d', fontSize: 12, fontFamily: 'sans-serif' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: '#6b6257', fontSize: 10, fontFamily: 'sans-serif' }}
                axisLine={false}
              />
              <Radar
                name={demographic}
                dataKey="A"
                stroke="#556B2F"
                fill="#556B2F"
                fillOpacity={0.5}
                animationDuration={700}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}