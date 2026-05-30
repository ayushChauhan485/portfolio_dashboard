import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { CameraControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const cameraTargets = {
  air: {
    camera: [-6, 6, -6],
    target: [-3, 0, -3],
    overlay: [-6.6, 3.6, -4.1],
  },
  lake: {
    camera: [6, 6, -6],
    target: [3, 0, -3],
    overlay: [6.6, 3.6, -4.1],
  },
  mobility: {
    camera: [-6, 6, 6],
    target: [-3, 0, 3],
    overlay: [-6.6, 3.6, 4.1],
  },
  terrain: {
    camera: [6, 6, 6],
    target: [3, 0, 3],
    overlay: [6.6, 3.6, 4.1],
  },
};

const zoneCopy = {
  air: {
    title: 'Modeling Seasonal Dynamics of PM2.5',
    lines: [
      '• PM2.5 Variance: Drastic shifts from 140-180 µg/m³ (Winter) to 35-55 µg/m³ (Monsoon).',
      '• Source Apportionment: Rolling PMF reveals traffic contribution surges to 35-50% during winter atmospheric stagnation.',
      '• Emission Origins: 70-85% of vehicle-induced PM originates from non-exhaust sources.',
      '• Predictive Edge: Season-specific ML models (Winter R²=0.89, Monsoon R²=0.93) heavily outperform generic models.',
    ],
  },
  lake: {
    title: 'AI-Driven Lake Restoration (Sukhna Lake)',
    lines: [
      '• Satellite Integration: Utilizing Landsat-7 ETM+ and ASTER data.',
      '• Predictive Parameters: AI modeling successfully forecasts Secchi Disk Transparency (SDT), Chlorophyll-a, and Land Surface Temperature (LST).',
      '• SDG-2030 Interventions: Proposed scalable, nature-based bioremediation via floating treatment wetlands.',
    ],
  },
  mobility: {
    title: 'Pedestrian Safety & Walkability at Congested Intersections',
    lines: [
      '• LWI Development: Established a Linear Walkability Index measuring lighting, shade, crosswalk sufficiency, and green cover.',
      '• Gender Constraints: Revealed severe infrastructure safety barriers for female cyclists, while male cyclists dominate short-distance commuting.',
      '• Policy Impact: Shift from generic to context-specific regional traffic planning for educational and recreational zones.',
    ],
  },
  terrain: {
    title: 'Terrain-Sensitive Accessibility Modelling',
    lines: [
      '• GIS-AHP Framework: Integrating Geographic Information Systems with the Analytic Hierarchy Process.',
      '• Scale: Modeled 1,176 habitations in the West Garo Hills using high-resolution SRTM elevation data.',
      '• Calibration: Participatory calibration via 49 structured stakeholder surveys to weight terrain constraints against service priorities.',
    ],
  },
};

function ZoneOverlay({ activeZone, onClose }) {
  const content = activeZone ? zoneCopy[activeZone] : null;
  const position = activeZone ? cameraTargets[activeZone].overlay : [0, 0, 0];

  return (
    <Html position={position} transform occlude={false} zIndexRange={[100, 0]}>
      <AnimatePresence mode="wait">
        {content ? (
          <motion.div
            key={activeZone}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative w-[400px] rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-lg"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-sm font-semibold text-white/70 transition hover:text-white"
              aria-label="Close zone details"
            >
              X
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Research Finding
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              {content.title}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/90">
              {content.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Html>
  );
}

function SmogParticles() {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const data = new Float32Array(1200 * 3);

    for (let i = 0; i < 1200; i += 1) {
      const radius = 0.6 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const height = 2.3 + Math.random() * 1.9;

      data[i * 3] = -3 + Math.cos(angle) * radius;
      data[i * 3 + 1] = height;
      data[i * 3 + 2] = -3 + Math.sin(angle) * radius;
    }

    return data;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.position.y = 0.05 * Math.sin(clock.elapsedTime * 0.8);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#d5d7d1" size={0.08} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function CityGrid({ activeZone, onSelect }) {
  const buildingSpecs = useMemo(
    () => [
      [-1.0, 0.8, -0.8, 0.8, 1.6, 0.8],
      [-0.3, 1.3, -1.1, 0.6, 2.6, 0.7],
      [0.6, 0.95, -0.6, 0.9, 1.9, 0.9],
      [1.1, 1.7, -1.0, 0.65, 3.4, 0.65],
      [-1.3, 1.4, 0.1, 0.7, 2.8, 0.7],
      [-0.5, 0.7, 0.5, 0.9, 1.4, 0.9],
      [0.5, 1.6, 0.3, 0.7, 3.1, 0.7],
      [1.4, 0.9, 0.7, 0.75, 1.8, 0.75],
      [0.0, 1.1, 1.3, 0.95, 2.2, 0.95],
    ],
    [],
  );

  return (
    <group
      position={[-3, 0, -3]}
      onClick={() => onSelect('air')}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {buildingSpecs.map(([x, y, z, sx, sy, sz], index) => (
        <mesh key={`${index}-${x}`} position={[x, y / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[sx, sy, sz]} />
          <meshStandardMaterial color="#556B2F" roughness={0.9} metalness={0.05} />
        </mesh>
      ))}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.4, 4.4]} />
        <meshStandardMaterial color="#1f1f1f" roughness={1} metalness={0} />
      </mesh>
      <SmogParticles />
    </group>
  );
}

function LakeBowl({ activeZone, onSelect }) {
  const materialRef = useRef();
  const blue = useMemo(() => new THREE.Color('#4ea8df'), []);
  const yellow = useMemo(() => new THREE.Color('#ffd34d'), []);
  const red = useMemo(() => new THREE.Color('#ff5b4f'), []);

  useFrame(({ clock }) => {
    if (!materialRef.current) {
      return;
    }

    if (activeZone === 'lake') {
      const wave = (Math.sin(clock.elapsedTime * 1.9) + 1) / 2;
      const targetColor = wave < 0.5 ? blue.clone().lerp(yellow, wave * 2) : yellow.clone().lerp(red, (wave - 0.5) * 2);
      materialRef.current.color.copy(targetColor);
      materialRef.current.emissive.copy(targetColor);
      materialRef.current.emissiveIntensity = 0.45 + wave * 0.35;
    } else {
      materialRef.current.color.copy(blue);
      materialRef.current.emissive.copy(blue);
      materialRef.current.emissiveIntensity = 0.18;
    }
  });

  return (
    <group
      position={[3, 0, -3]}
      onClick={() => onSelect('lake')}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh position={[0, 0.08, 0]} rotation={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 2.2, 0.25, 48]} />
        <meshStandardMaterial ref={materialRef} color="#4ea8df" roughness={0.25} metalness={0.35} emissive="#4ea8df" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.25, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
      {activeZone === 'lake' ? (
        <mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.0, 2.35, 48]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>
      ) : null}
    </group>
  );
}

function MobilityGrid({ activeZone, onSelect }) {
  const flowA = useRef();
  const flowB = useRef();
  const flowC = useRef();

  useFrame(({ clock }) => {
    if (flowA.current) {
      flowA.current.position.x = -4.5 + ((clock.elapsedTime * 1.4) % 4.5);
      flowA.current.position.y = 0.12;
    }

    if (flowB.current) {
      flowB.current.position.z = 0.2 - ((clock.elapsedTime * 1.2) % 4.5);
      flowB.current.position.y = 0.12;
    }

    if (flowC.current) {
      flowC.current.position.x = 4.5 - ((clock.elapsedTime * 1.6) % 4.5);
      flowC.current.position.y = 0.12;
    }
  });

  return (
    <group
      position={[-3, 0, 3]}
      onClick={() => onSelect('mobility')}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[4.4, 4.4]} />
        <meshStandardMaterial color="#2b2b2b" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.1, 0.08]} />
        <meshBasicMaterial color="#7d7d7d" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 4.1]} />
        <meshBasicMaterial color="#7d7d7d" transparent opacity={0.35} />
      </mesh>

      <mesh ref={flowA} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#C5E1A5" emissive="#C5E1A5" emissiveIntensity={1.4} />
      </mesh>
      <mesh ref={flowB} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={flowC} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function TerrainHabitations() {
  const meshRef = useRef();
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const instances = useMemo(() => {
    const data = [];

    for (let i = 0; i < 1176; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.35 + Math.pow(Math.random(), 0.55) * 2.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const coneHeight = Math.max(0.15, 2.8 - radius * 0.85 + (Math.random() - 0.5) * 0.22);
      const y = Math.max(0.08, coneHeight * 0.35 + Math.random() * 0.35);
      const scale = 0.03 + Math.random() * 0.018;

      data.push({ x, y, z, scale });
    }

    return data;
  }, []);

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    instances.forEach((instance, index) => {
      tempObject.position.set(instance.x, instance.y, instance.z);
      tempObject.scale.setScalar(instance.scale);
      tempObject.rotation.set(0, Math.random() * Math.PI * 2, 0);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(index, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instances, tempObject]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, 1176]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#d2b48c" emissive="#fff0c2" emissiveIntensity={0.9} roughness={0.3} metalness={0.1} />
    </instancedMesh>
  );
}

function TerrainMountain({ activeZone, onSelect }) {
  return (
    <group
      position={[3, 0, 3]}
      onClick={() => onSelect('terrain')}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <coneGeometry args={[2.55, 3.6, 7]} />
        <meshStandardMaterial color="#7d6748" roughness={1} metalness={0.02} wireframe={activeZone === 'terrain'} />
      </mesh>
      <mesh position={[0.2, 2.0, -0.1]} castShadow receiveShadow>
        <coneGeometry args={[1.3, 1.7, 6]} />
        <meshStandardMaterial color="#8f7350" roughness={1} metalness={0.02} wireframe={activeZone === 'terrain'} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <circleGeometry args={[2.85, 48]} />
        <meshStandardMaterial color="#1f1f1f" roughness={1} metalness={0} />
      </mesh>
      {activeZone === 'terrain' ? <TerrainHabitations /> : null}
    </group>
  );
}

function UnifiedLandscape({ activeZone, setActiveZone, controlsRef }) {
  const handleSelectZone = (zone) => {
    setActiveZone(zone);
    const target = cameraTargets[zone];
    controlsRef.current?.setLookAt(
      target.camera[0],
      target.camera[1],
      target.camera[2],
      target.target[0],
      target.target[1],
      target.target[2],
      true,
    );
  };

  useEffect(() => {
    controlsRef.current?.setLookAt(10, 10, 10, 0, 0, 0, false);
  }, [controlsRef]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#2c2c2c" roughness={1} metalness={0} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[4.2, 8.1, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>

      <CityGrid activeZone={activeZone} onSelect={handleSelectZone} />
      <LakeBowl activeZone={activeZone} onSelect={handleSelectZone} />
      <MobilityGrid activeZone={activeZone} onSelect={handleSelectZone} />
      <TerrainMountain activeZone={activeZone} onSelect={handleSelectZone} />

      {activeZone === 'air' ? <SmogParticles /> : null}

      {activeZone ? <ZoneOverlay activeZone={activeZone} onClose={() => setActiveZone(null)} /> : null}
    </group>
  );
}

export default function SmartLandscape3D() {
  const [activeZone, setActiveZone] = useState(null);
  const controlsRef = useRef();

  const resetView = () => {
    setActiveZone(null);
    controlsRef.current?.setLookAt(10, 10, 10, 0, 0, 0, true);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-stone-950">
      <button
        type="button"
        onClick={resetView}
        className="absolute left-4 top-4 z-50 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 hover:text-olive-400"
      >
        Reset View
      </button>

      <Canvas
        shadows
        camera={{ position: [10, 10, 10], fov: 35, near: 0.1, far: 100 }}
        className="h-full w-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 12, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <fog attach="fog" args={['#0b0f0d', 18, 30]} />

        <UnifiedLandscape
          activeZone={activeZone}
          setActiveZone={setActiveZone}
          controlsRef={controlsRef}
        />

        <CameraControls ref={controlsRef} makeDefault />
      </Canvas>
    </div>
  );
}
