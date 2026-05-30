import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Winter Stagnation',
    value: 160,
    fill: '#556B2F',
  },
  {
    name: 'Monsoon Clarity',
    value: 45,
    fill: '#C5E1A5',
  },
];

const whoSafeLimit = 15;

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const datum = payload[0].payload;
  const winterToMonsoonRatio = datum.value / 45;
  const whoMultiple = datum.value / whoSafeLimit;

  return (
    <div className="rounded-2xl border border-stone-200 bg-[#f7f3eb]/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-sm font-semibold text-stone-900">{datum.name}</p>
      <p className="mt-1 text-sm text-stone-700">PM2.5 concentration: {datum.value} µg/m³</p>
      {datum.name === 'Winter Stagnation' ? (
        <>
          <p className="mt-2 text-sm text-stone-700">
            Seasonal variance: {winterToMonsoonRatio.toFixed(1)}x higher than Monsoon Clarity.
          </p>
          <p className="mt-1 text-sm text-stone-700">
            Relative to the WHO safe limit, winter levels are {whoMultiple.toFixed(1)}x higher.
          </p>
        </>
      ) : (
        <p className="mt-2 text-sm text-stone-700">
          Cooler monsoon air improves dispersion and keeps concentrations closer to the health guideline.
        </p>
      )}
    </div>
  );
}

export default function Act1Atmosphere() {
  return (
    <div className="h-full w-full rounded-[2rem] border border-stone-200 bg-transparent p-4 sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-olive-800">Act 1 Atmosphere</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Seasonal PM2.5 dynamics in the Indo-Gangetic Plain
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
          A minimalist comparison of winter stagnation, monsoon clarity, and the WHO safe limit.
        </p>
      </div>

      <div className="h-[320px] w-full sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#d8d0bf" strokeDasharray="3 8" vertical={false} opacity={0.35} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#4b463d', fontSize: 12, fontFamily: 'sans-serif' }}
              tickLine={false}
              axisLine={{ stroke: '#c9c1b1' }}
              interval={0}
            />
            <YAxis
              tick={{ fill: '#4b463d', fontSize: 12, fontFamily: 'sans-serif' }}
              tickLine={false}
              axisLine={{ stroke: '#c9c1b1' }}
              width={40}
              label={{ value: 'µg/m³', angle: -90, position: 'insideLeft', fill: '#5b564d' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(85, 107, 47, 0.08)' }} />
            <ReferenceLine
              y={whoSafeLimit}
              stroke="#7a8f55"
              strokeDasharray="6 6"
              strokeWidth={1.5}
              label={{ value: 'WHO Safe Limit', position: 'insideTopRight', fill: '#6f7f4a', fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={72}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}