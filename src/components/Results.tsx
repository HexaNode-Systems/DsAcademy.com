import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../config/site';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal, usePrefersReducedMotion } from './ui/motion';
import { SampleNote, SectionHeader } from './ui/primitives';

const SLIDE_MS = 6500;

export const Results: React.FC = () => {
  const toppers = siteConfig.results;
  const reduced = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Auto-advance is driven by the progress bar's CSS animation, so pausing the
  // bar (hover, keyboard focus, manual pause) also pauses the carousel.
  const autoplay = !reduced && !userPaused;
  const paused = hovered || focused;

  const go = (idx: number) => setCurrentIndex((idx + toppers.length) % toppers.length);
  const current = toppers[currentIndex];

  return (
    <section id="results" aria-labelledby="results-title" className="section on-dark bg-night text-white">
      <div className="shell">
        <SectionHeader
          id="results-title"
          tone="dark"
          index="04"
          eyebrow="Results"
          title="Our achievers in JEE & NEET 2024"
          intro="Consistent top ranks across engineering and medical examinations are the clearest test of a teaching method."
        />

        <Reveal
          className="grid grid-cols-1 border border-night-line lg:grid-cols-12"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Topper spotlight"
        >
          {/* Spotlight */}
          <div className="relative min-h-[26rem] p-6 sm:p-10 lg:col-span-8 lg:border-r lg:border-night-line">
            <div aria-live={autoplay && !paused ? 'off' : 'polite'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  aria-roledescription="slide"
                  aria-label={`${currentIndex + 1} of ${toppers.length}`}
                  className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start"
                >
                  <div className="relative h-40 w-40 shrink-0 overflow-hidden bg-night-2 sm:h-48 sm:w-48">
                    {current.photoUrl ? (
                      <img src={current.photoUrl} alt={current.name} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid-paper flex h-full w-full items-end p-4" aria-hidden="true">
                        <span className="font-display text-5xl font-extrabold tracking-[-0.04em] text-slate-200">
                          {current.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="type-eyebrow text-slate-400">
                      {current.exam} · Batch of {current.year}
                    </p>
                    <p className="mt-3 font-display text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] text-white tabular">
                      {current.scoreOrRank}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">{current.name}</h3>
                    <p className="mt-1 text-[15px] text-slate-300">
                      Admitted to {current.institutionJoined}
                      {current.percentile && <span className="text-slate-400"> · {current.percentile}</span>}
                    </p>
                    {current.quote && (
                      <blockquote className="mt-6 max-w-[52ch] border-l-2 border-accent pl-5 text-lg leading-relaxed text-slate-200">
                        “{current.quote}”
                      </blockquote>
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(currentIndex - 1)}
                aria-label="Previous topper"
                className="inline-flex h-11 w-11 items-center justify-center border border-night-line text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(currentIndex + 1)}
                aria-label="Next topper"
                className="inline-flex h-11 w-11 items-center justify-center border border-night-line text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  className="ml-2 inline-flex min-h-11 items-center px-3 text-sm font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
                >
                  {userPaused ? 'Resume rotation' : 'Pause rotation'}
                </button>
              )}
              <span className="ml-auto font-mono text-sm text-slate-400 tabular" aria-hidden="true">
                {String(currentIndex + 1).padStart(2, '0')} / {String(toppers.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Index of toppers — doubles as navigation */}
          <ol className="border-t border-night-line lg:col-span-4 lg:border-t-0" aria-label="All toppers">
            {toppers.map((t, idx) => {
              const active = idx === currentIndex;
              return (
                <li key={t.id} className="border-b border-night-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => go(idx)}
                    aria-current={active ? 'true' : undefined}
                    className={`relative flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors duration-200 ${
                      active ? 'bg-night-2' : 'hover:bg-night-2/60'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className={`block truncate text-[15px] font-semibold ${active ? 'text-white' : 'text-slate-300'}`}>
                        {t.name}
                      </span>
                      <span className="block truncate text-sm text-slate-400">{t.exam}</span>
                    </span>
                    <span className={`shrink-0 font-mono text-sm tabular ${active ? 'text-white' : 'text-slate-400'}`}>
                      {t.scoreOrRank}
                    </span>
                    {active && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" aria-hidden="true" />
                    )}
                    {active && autoplay && (
                      <span
                        key={`progress-${currentIndex}`}
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-0.5 bg-slate-500"
                        style={{
                          animation: `results-progress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                        onAnimationEnd={() => go(currentIndex + 1)}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* <SampleNote tone="dark" className="mt-8">
          Topper names, ranks and quotes are placeholders. Publish only verified results.
        </SampleNote> */}
      </div>
    </section>
  );
};
