import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { Reveal } from './ui/motion';
import { FilterTabs, SampleNote, SectionHeader } from './ui/primitives';

type Who = 'all' | 'parent' | 'student';

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<Who>('all');
  const all = siteConfig.testimonials;
  const testimonials = all.filter((t) => filter === 'all' || t.type === filter);
  const [lead, ...rest] = testimonials;

  return (
    <section aria-labelledby="voices-title" className="section bg-paper border-b border-line">
      <div className="shell">
        <SectionHeader
          id="voices-title"
          index="05"
          eyebrow="Voices"
          title="What students and parents tell us"
          intro="Feedback about mentorship, classroom discipline and personal doubt support."
          aside={
            <FilterTabs
              label="Filter feedback"
              value={filter}
              onChange={setFilter}
              options={[
                { id: 'all', label: 'All', count: all.length },
                { id: 'parent', label: 'Parents', count: all.filter((t) => t.type === 'parent').length },
                { id: 'student', label: 'Students', count: all.filter((t) => t.type === 'student').length },
              ]}
            />
          }
        />

        {lead && (
          <div key={filter}>
            {/* Lead quote */}
            <Reveal as="figure" className="grid gap-8 border-t-2 border-ink pt-8 lg:grid-cols-12">
              <figcaption className="lg:col-span-4">
                <p className="type-eyebrow text-accent">{lead.type === 'parent' ? 'Parent' : 'Student'}</p>
                <p className="mt-3 font-display text-lg font-bold text-ink">{lead.author}</p>
                <p className="mt-1 text-sm text-ink-2">{lead.role}</p>
              </figcaption>
              <blockquote className="lg:col-span-8">
                <p className="font-display text-[clamp(1.5rem,1.15rem+1.2vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                  “{lead.highlight}”
                </p>
                <p className="type-lead mt-5 max-w-[62ch] text-ink-2">{lead.quote}</p>
              </blockquote>
            </Reveal>

            {/* Remaining quotes */}
            {rest.length > 0 && (
              <ul className={`mt-14 grid gap-x-10 gap-y-12 ${rest.length > 1 ? 'md:grid-cols-2' : ''} ${rest.length > 2 ? 'lg:grid-cols-3' : ''}`}>
                {rest.map((t, i) => (
                  <Reveal as="li" key={t.id} delay={i * 80} className="border-t border-line pt-6">
                    <figure>
                      <blockquote>
                        <p className="font-display text-lg font-bold leading-snug tracking-tight text-ink">“{t.highlight}”</p>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{t.quote}</p>
                      </blockquote>
                      <figcaption className="mt-5 text-sm">
                        <span className="font-semibold text-ink">{t.author}</span>
                        <span className="block text-ink-2">{t.role}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* <SampleNote className="mt-12">
          These testimonials are placeholders. Replace them with genuine, attributable feedback in{' '}
          <code>config/site.ts</code>.
        </SampleNote> */}
      </div>
    </section>
  );
};
