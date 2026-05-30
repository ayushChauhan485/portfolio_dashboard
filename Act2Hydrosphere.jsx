import React from 'react';
import { useMemo, useState } from 'react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const metricConfig = [
  {
    label: 'Chlorophyll-a',
    current: 85,
    predicted: 30,
    color: '#556B2F',
    track: '#e6ddcc',
  },
  {
    label: 'Secchi Disk Transparency',
    shortLabel: 'SDT',
    current: 20,
    predicted: 75,
    color: '#7a8f55',
    track: '#ece3d3',
  },
  {
    label: 'Land Surface Temp',
    shortLabel: 'LST',
    current: 90,
    predicted: 45,
    color: '#C5E1A5',
    track: '#e8e0d2',
  },
];

function MetricDial({ label, shortLabel, value, color, track, mode }) {
  const chartData = useMemo(
    () => [
      {
        name: label,
        value,
        fill: color,
      },
    ],
    [label, value, color],
  );

  return (
    <div className="rounded-[1.75rem] border border-stone-200 bg-white/55 p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-800">
            {shortLabel ?? label}
          </p>
          <h3 className="mt-2 text-sm font-semibold leading-5 text-stone-900">{label}</h3>
        </div>
        <span className="rounded-full border border-stone-200 bg-[#f7f3eb] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-600">
          {mode}
        </span>
      </div>

      <div className="h-36 sm:h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            key={`${label}-${mode}`}
            data={chartData}
            innerRadius="72%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            barSize={18}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={999}
              background={{ fill: track }}
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                const item = payload[0].payload;

                return (
                  <div className="rounded-2xl border border-stone-200 bg-[#f7f3eb]/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-stone-700">{item.value}%</p>
                  </div>
                );
              }}
            />
            <text x="50%" y="46%" textAnchor="middle" fill="#1f2937">
              <tspan className="fill-stone-900 text-[22px] font-semibold">{value}%</tspan>
            </text>
            <text x="50%" y="60%" textAnchor="middle" fill="#6b7280">
              <tspan className="fill-stone-500 text-[11px] uppercase tracking-[0.28em]">
                {mode}
              </tspan>
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MapView({ mode }) {
  const currentMapClass =
    'bg-[radial-gradient(circle_at_20%_25%,rgba(81,108,64,0.35),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(90,73,52,0.45),transparent_24%),linear-gradient(135deg,#6b7f8d_0%,#52646f_38%,#7a6654_72%,#4e4a44_100%)]';
  const predictedMapClass =
    'bg-[radial-gradient(circle_at_18%_28%,rgba(37,99,235,0.65),transparent_22%),radial-gradient(circle_at_48%_34%,rgba(250,204,21,0.62),transparent_18%),radial-gradient(circle_at_78%_60%,rgba(239,68,68,0.62),transparent_20%),linear-gradient(135deg,#123a7a_0%,#2b7fd6_34%,#76b84d_62%,#f6d74c_82%,#d9483b_100%)]';

  return (
    <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#ece4d3] shadow-[0_24px_60px_rgba(72,63,42,0.12)]">
      <div className="aspect-[16/9] w-full p-4 sm:p-5">
        <div
          className={`relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/35 shadow-inner ${
            mode === 'Current' ? currentMapClass : predictedMapClass
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.22))]" />
          <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
            {mode === 'Current' ? 'Landsat-7 Snapshot' : 'AI Predictive Heatmap'}
          </div>
          <div className="absolute bottom-4 right-4 rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-right text-white backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.28em] text-white/80">Sukhna Lake</p>
            <p className="mt-1 text-sm font-medium text-white/90">
              {mode === 'Current' ? 'Observed seasonal water quality' : 'Projected spatial response'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Act2Hydrosphere() {
  const [mode, setMode] = useState('Current');

  return (
    <section className="w-full rounded-[2rem] border border-stone-200 bg-[#f5efe3] p-4 shadow-[0_26px_70px_rgba(72,63,42,0.12)] sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-olive-800">
              Act 2 Hydrosphere
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              AI-driven predictive modeling for Sukhna Lake
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setMode((current) => (current === 'Current' ? 'AI Model' : 'Current'))}
            className="inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-olive-500 hover:text-stone-900"
            aria-pressed={mode === 'AI Model'}
          >
            <span className="text-xs uppercase tracking-[0.28em] text-stone-500">Toggle</span>
            <span
              className={`flex h-6 w-12 items-center rounded-full p-0.5 transition-colors ${
                mode === 'AI Model' ? 'bg-[#a7bf76]' : 'bg-[#cfc4b1]'
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  mode === 'AI Model' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </span>
            <span className="hidden sm:inline">{mode === 'Current' ? 'Current Satellite (Landsat-7)' : 'AI Predictive Model'}</span>
          </button>
        </div>

        <MapView mode={mode} />

        <div className="grid gap-4 md:grid-cols-3">
          {metricConfig.map((metric) => {
            const value = mode === 'Current' ? metric.current : metric.predicted;

            return (
              <MetricDial
                key={metric.label}
                label={metric.label}
                shortLabel={metric.shortLabel}
                value={value}
                color={metric.color}
                track={metric.track}
                mode={mode}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}