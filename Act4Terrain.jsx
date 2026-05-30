import React from 'react';
import { useMemo, useState } from 'react';
import Map, { Marker, Popup, Source } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const initialViewState = {
  longitude: 90.2,
  latitude: 25.5,
  zoom: 9,
  pitch: 60,
  bearing: -12,
};

const habitationNodes = [
  {
    id: 1,
    name: 'Ampati Edge Hamlet',
    longitude: 90.12,
    latitude: 25.57,
    accessibilityScore: 45,
  },
  {
    id: 2,
    name: 'Mahendraganj Ridge',
    longitude: 90.29,
    latitude: 25.61,
    accessibilityScore: 82,
  },
  {
    id: 3,
    name: 'Tura Valley Settlement',
    longitude: 90.18,
    latitude: 25.43,
    accessibilityScore: 68,
  },
  {
    id: 4,
    name: 'Rongjeng Foothill Node',
    longitude: 90.35,
    latitude: 25.49,
    accessibilityScore: 54,
  },
  {
    id: 5,
    name: 'Dalu Corridor Cluster',
    longitude: 90.07,
    latitude: 25.39,
    accessibilityScore: 77,
  },
];

const terrainSource = {
  id: 'mapbox-dem',
  type: 'raster-dem',
  url: 'mapbox://mapbox.terrain-rgb',
  tileSize: 512,
  maxzoom: 14,
};

function scoreTone(score) {
  if (score >= 75) {
    return 'bg-[#C5E1A5]';
  }

  if (score >= 60) {
    return 'bg-[#90a96a]';
  }

  return 'bg-[#556B2F]';
}

export default function Act4Terrain() {
  const [selectedNode, setSelectedNode] = useState(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const selectedScoreTone = useMemo(() => {
    if (!selectedNode) {
      return 'bg-[#556B2F]';
    }

    return scoreTone(selectedNode.accessibilityScore);
  }, [selectedNode]);

  return (
    <section className="h-full w-full rounded-[2rem] border border-stone-200 bg-[#f3ecd9] p-4 shadow-[0_24px_70px_rgba(72,63,42,0.14)] sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-olive-800">
            Act 4 Terrain
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            GIS-AHP terrain-sensitive accessibility model
          </h2>
        </div>
        <div className="rounded-full border border-stone-300 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-stone-600">
          West Garo Hills, Meghalaya
        </div>
      </div>

      <div className="relative h-[540px] w-full overflow-hidden rounded-[1.75rem] shadow-[0_18px_50px_rgba(72,63,42,0.14)]">
        {mapboxToken ? (
          <Map
            initialViewState={initialViewState}
            mapboxAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            terrain={{ source: 'mapbox-dem', exaggeration: 1.3 }}
            style={{ width: '100%', height: '100%' }}
            minPitch={0}
            maxPitch={85}
            projection="mercator"
          >
            <Source {...terrainSource} />

            {habitationNodes.map((node) => (
              <Marker
                key={node.id}
                longitude={node.longitude}
                latitude={node.latitude}
                anchor="center"
                onClick={(event) => {
                  event.originalEvent.stopPropagation();
                  setSelectedNode(node);
                }}
              >
                <button
                  type="button"
                  className="h-4 w-4 rounded-full border border-white/90 bg-[#C5E1A5] shadow-[0_0_0_4px_rgba(197,225,165,0.25)] transition-transform hover:scale-110"
                  aria-label={`${node.name} accessibility score ${node.accessibilityScore}`}
                />
              </Marker>
            ))}

            {selectedNode ? (
              <Popup
                longitude={selectedNode.longitude}
                latitude={selectedNode.latitude}
                anchor="top"
                closeOnClick={false}
                onClose={() => setSelectedNode(null)}
                offset={16}
              >
                <div className="min-w-[180px] rounded-2xl px-1 py-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-800">
                    Habitation Node
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-stone-900">{selectedNode.name}</h3>
                  <p className="mt-2 text-sm text-stone-700">
                    Accessibility Score: {selectedNode.accessibilityScore}
                  </p>
                  <div className={`mt-3 h-2 w-full rounded-full ${selectedScoreTone}`} />
                </div>
              </Popup>
            ) : null}

            <div className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-[220px] rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-xs leading-5 text-white backdrop-blur-md">
              <p className="font-semibold uppercase tracking-[0.28em] text-white/80">
                GIS-AHP Accessibility Score
              </p>
              <p className="mt-2 text-white/85">
                Higher values indicate stronger terrain-sensitive access to habitations in the West Garo Hills.
              </p>
            </div>
          </Map>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-900/90 px-6 text-center text-[#f7f3eb]">
            <div className="max-w-md rounded-[1.75rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-olive-400">
                Mapbox Token Required
              </p>
              <p className="mt-4 text-sm leading-6 text-stone-200">
                Add VITE_MAPBOX_TOKEN to your .env file to render the terrain map and habitation markers.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}