import React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scrollama, Step } from 'react-scrollama';
import Act1Atmosphere from './Act1Atmosphere';
import Act2Hydrosphere from './Act2Hydrosphere';
import Act3Streetscape from './Act3Streetscape';
import Act4Terrain from './Act4Terrain';
import ResearchConstellation from './ResearchConstellation';

const acts = [
  {
    id: 1,
    eyebrow: 'Act 1',
    title: 'Seasonal Dynamics of Air Quality',
    body:
      'Investigating traffic-dominant particulate matter in the Indo-Gangetic Plain. Using multi-scale wavelet analysis and rolling PMF, this research reveals how winter atmospheric stagnation causes vehicle-induced PM2.5 to surge. Proposed targeted interventions can reduce annual PM by 40-50%.',
  },
  {
    id: 2,
    eyebrow: 'Act 2',
    title: 'AI-Driven Lake Restoration',
    body:
      'Addressing eutrophication at Sukhna Lake, Chandigarh. By integrating satellite remote sensing (Landsat-7, ASTER) with predictive AI modeling, this framework tracks critical water quality parameters like Chlorophyll-a and LST to propose scalable, nature-based bioremediation solutions.',
  },
  {
    id: 3,
    eyebrow: 'Act 3',
    title: 'Urban Mobility & Pedestrian Safety',
    body:
      'Evaluating sustainable transport infrastructure to meet SDG-11 targets. This research develops a Linear Walkability Index (LWI) and analyzes gender-specific barriers in non-motorized transport (NMT), highlighting the need for context-specific urban traffic planning.',
  },
  {
    id: 4,
    eyebrow: 'Act 4',
    title: 'Terrain-Sensitive Accessibility',
    body:
      'Conventional proximity models fail in mountainous regions. This GIS-AHP framework, applied to 1,176 habitations in the West Garo Hills, integrates high-resolution SRTM elevation data with participatory stakeholder calibration to map actual rural mobility constraints.',
  },
];

const visualizationThemes = {
  1: 'bg-[#efe7d8] text-stone-900',
  2: 'bg-[#e7ddc9] text-stone-900',
  3: 'bg-[#dce3cd] text-stone-900',
  4: 'bg-[#d2debf] text-stone-900',
};

export default function ScrollytellingPortfolio() {
  const [currentAct, setCurrentAct] = useState(1);
  const [scrollContainer, setScrollContainer] = useState(null);
  const [show3D, setShow3D] = useState(false);

  const renderRightPanel = () => {
    if (currentAct === 1) {
      return (
        <motion.div
          key={currentAct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full max-w-3xl"
        >
          <Act1Atmosphere />
        </motion.div>
      );
    }

    if (currentAct === 2) {
      return (
        <motion.div
          key={currentAct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full max-w-4xl overflow-y-auto py-8"
        >
          <Act2Hydrosphere />
        </motion.div>
      );
    }

    if (currentAct === 3) {
      return (
        <motion.div
          key={currentAct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full max-w-4xl overflow-y-auto py-8"
        >
          <Act3Streetscape />
        </motion.div>
      );
    }

    if (currentAct === 4) {
      return (
        <motion.div
          key={currentAct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full max-w-4xl overflow-y-auto py-8"
        >
          <Act4Terrain />
        </motion.div>
      );
    }

    return null;
  };

  if (show3D) {
    return (
      <div className="relative h-screen w-full bg-stone-950">
        <button
          type="button"
          onClick={() => setShow3D(false)}
          className="absolute left-4 top-4 z-50 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 hover:text-olive-400"
        >
          Back to Narrative
        </button>
        <ResearchConstellation />
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f7f3eb] text-stone-900">
      <section className="flex min-h-screen flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-olive-800">
            Research Portfolio
          </p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-stone-900 sm:text-6xl lg:text-8xl">
            Ayush Chauhan
          </h1>
          <p className="mt-6 text-lg font-medium text-stone-700 sm:text-xl lg:text-2xl">
            Research Portfolio | Civil Engineering
          </p>
          <p className="mt-8 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
            Final-year researcher at Punjab Engineering College specializing in Sustainable Urban Systems, AI-driven Transport Planning, Environmental Data Modeling, and Spatial Analytics aligned with UN SDGs-2030.
          </p>
        </div>
      </section>

      <section className="min-h-screen border-t border-stone-200 bg-[#fbf8f1]">
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          <section
            ref={setScrollContainer}
            className="h-screen w-full overflow-y-auto border-r border-stone-200 bg-[#fbf8f1] lg:w-[40%]"
          >
            <div className="px-5 py-8 sm:px-8 lg:px-12">
              <div className="sticky top-0 z-10 -mx-5 mb-8 border-b border-stone-200 bg-[#fbf8f1]/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-olive-800">
                  Thesis Narrative
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                  Four linked acts across climate, water, mobility, and terrain
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-stone-600 sm:text-base">
                  Scroll through the narrative to keep each visualization synchronized with the current research act.
                </p>
              </div>

              <Scrollama
                container={scrollContainer}
                offset={0.58}
                onStepEnter={({ data }) => setCurrentAct(data)}
                progress={false}
              >
                {acts.map((act) => {
                  const isActive = currentAct === act.id;

                  return (
                    <Step data={act.id} key={act.id}>
                      <article
                        className={`mb-8 rounded-[1.75rem] border p-6 shadow-sm backdrop-blur-md transition-all duration-300 sm:p-8 ${
                          isActive
                            ? 'border-olive-500 bg-white/90 shadow-[0_18px_40px_rgba(84,96,51,0.12)]'
                            : 'border-white/70 bg-white/70'
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
                          {act.eyebrow}
                        </p>
                        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                          {act.title}
                        </h3>
                        <p className="mt-4 max-w-prose text-sm leading-7 text-stone-700 sm:text-base">
                          {act.body}
                        </p>
                      </article>
                    </Step>
                  );
                })}
              </Scrollama>
            </div>
          </section>

          <aside
            className={`sticky top-0 flex h-screen w-full items-center justify-center px-4 py-6 transition-colors duration-500 sm:px-8 lg:w-[60%] lg:px-16 ${
              visualizationThemes[currentAct]
            }`}
          >
            <AnimatePresence mode="wait">{renderRightPanel()}</AnimatePresence>
          </aside>
        </div>
      </section>

      <footer className="border-t border-stone-800 bg-stone-900 px-6 py-8 text-[#f7f3eb] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium tracking-wide">
            Ayush Chauhan | Punjab Engineering College
          </p>
          <div className="flex flex-col gap-5 sm:items-end">
            <button
              type="button"
              onClick={() => setShow3D(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-[#f7f3eb] shadow-lg backdrop-blur-md transition hover:border-olive-400/40 hover:bg-white/15 hover:text-olive-400"
            >
              Explore 3D Research Constellation
            </button>
            <div className="flex flex-wrap gap-4 text-sm text-stone-300">
              <a
                href="/Ayush_Chauhan_Research_Portfolio.pdf"
                download
                className="transition-colors hover:text-olive-400"
              >
                Download Full Portfolio (PDF)
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-olive-400"
              >
                LinkedIn
              </a>
              <a
                href="mailto:chauhanayush485@gmail.com"
                className="transition-colors hover:text-olive-400"
              >
                Email: chauhanayush485@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}