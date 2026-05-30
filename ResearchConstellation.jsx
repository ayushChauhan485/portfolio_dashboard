import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls, Stars } from '@react-three/drei';

const nodeContent = {
  1: {
    title: 'Air Quality',
    body:
      'Wavelet analysis revealed 3 rhythms. Traffic PM2.5 surges to 35-50% in winter. Proposed interventions reduce PM by 40-50%.',
  },
  2: {
    title: 'Hydrosphere',
    body:
      'AI model predicts SDT, Chlorophyll-a, and LST. Proposed floating treatment wetlands for scalable bioremediation.',
  },
  3: {
    title: 'Urban Mobility',
    body:
      'Distinct gender constraints identified. Male cyclists commute short distances; females face unique infrastructure safety barriers.',
  },
  4: {
    title: 'Terrain Accessibility',
    body:
      'GIS-AHP framework calibrated with 49 stakeholder surveys to weight terrain constraints across 1,176 rural habitations.',
  },
};

function ResearchNode({ id, position, geometry, color, activeNode, setActiveNode }) {
  const isActive = activeNode === id;

  return (
    <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.2}>
      <mesh
        position={position}
        onClick={(event) => {
          event.stopPropagation();
          setActiveNode(id);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={0.25}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={isActive ? 0.45 : 0.15}
        />
      </mesh>
    </Float>
  );
}

export default function ResearchConstellation() {
  const [activeNode, setActiveNode] = useState(null);

  const overlayContent = useMemo(() => {
    if (!activeNode) {
      return null;
    }

    return nodeContent[activeNode];
  }, [activeNode]);

  return (
    <div className="relative h-[800px] w-full overflow-hidden rounded-3xl bg-stone-900 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={120} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <ResearchNode
          id={1}
          position={[-4, 2, 0]}
          geometry={<sphereGeometry args={[1.1, 48, 48]} />}
          color="#C5E1A5"
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
        <ResearchNode
          id={2}
          position={[4, 2, 0]}
          geometry={<torusGeometry args={[0.95, 0.35, 24, 80]} />}
          color="#87CEEB"
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
        <ResearchNode
          id={3}
          position={[-4, -2, 0]}
          geometry={<boxGeometry args={[1.8, 1.8, 1.8]} />}
          color="#556B2F"
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
        <ResearchNode
          id={4}
          position={[4, -2, 0]}
          geometry={<tetrahedronGeometry args={[1.15, 0]} />}
          color="#D2B48C"
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />

        {overlayContent ? (
          <Html position={[0, 0, 2]} center>
            <div className="relative w-96 rounded-2xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="absolute right-4 top-4 text-sm font-semibold text-white/70 transition hover:text-white"
                aria-label="Close overlay"
              >
                X
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                Research Finding
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {overlayContent.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-white/85">
                {overlayContent.body}
              </p>
            </div>
          </Html>
        ) : null}

        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}
