import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from './ui/motion';
import { FilterTabs, SampleNote, SectionHeader } from './ui/primitives';

interface BatchScheduleProps {
  onSelectBatch: (courseName: string) => void;
}

type Tab = 'all' | 'jee' | 'neet' | 'foundation';

export const BatchSchedule: React.FC<BatchScheduleProps> = ({ onSelectBatch }) => {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const batches = siteConfig.batchSchedules;
  const filteredBatches = batches.filter((b) => activeTab === 'all' || b.category === activeTab);
  const count = (t: Tab) => batches.filter((b) => t === 'all' || b.category === t).length;

  return (
    <section id="batches" aria-labelledby="batches-title" className="section bg-alt border-b border-line">
      <div className="shell">
        <SectionHeader
          id="batches-title"
          index="06"
          eyebrow="Batches & fees"
          title="Upcoming batch timings and fee structure"
          intro="A transparent fee schedule with no hidden charges. Installments and merit scholarships are available through our weekly entrance test."
        />

        <Reveal className="mb-6">
          <FilterTabs
            label="Filter batches"
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { id: 'all', label: 'All batches', count: count('all') },
              { id: 'jee', label: 'IIT-JEE', count: count('jee') },
              { id: 'neet', label: 'NEET', count: count('neet') },
              { id: 'foundation', label: 'Foundation 9–10', count: count('foundation') },
            ]}
          />
        </Reveal>

        {/* Column headings (desktop) */}
        <div className="hidden border-b border-ink pb-3 lg:grid lg:grid-cols-12 lg:gap-6" aria-hidden="true">
          <span className="type-eyebrow col-span-5 text-ink-3">Batch</span>
          <span className="type-eyebrow col-span-3 text-ink-3">Schedule</span>
          <span className="type-eyebrow col-span-2 text-ink-3">Annual tuition</span>
          <span className="col-span-2" />
        </div>

        {filteredBatches.length === 0 ? (
          <p className="border border-dashed border-line-strong bg-white px-6 py-12 text-center text-ink-2">
            No batches are scheduled in this category right now. Call or WhatsApp us to hear about the next intake.
          </p>
        ) : (
          <ul className="border-t border-line lg:border-t-0">
            {filteredBatches.map((batch, i) => (
              <Reveal
                as="li"
                key={batch.id}
                delay={i * 70}
                className="edge-line grid gap-5 border-b border-line bg-white px-5 py-6 transition-colors duration-200 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-6 lg:bg-transparent lg:hover:bg-white"
              >
                <div className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="type-eyebrow text-ink-3">{batch.target}</span>
                    {batch.seatsLeft <= 8 && (
                      <span className="type-eyebrow border border-danger/30 px-1.5 py-0.5 text-danger">
                        {batch.seatsLeft} seats left
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{batch.name}</h3>
                  <p className="mt-1 text-sm text-ink-2">{batch.scholarshipAvailable}</p>
                </div>

                <dl className="grid grid-cols-2 gap-4 text-sm lg:col-span-3 lg:grid-cols-1 lg:gap-1.5">
                  <div>
                    <dt className="sr-only">Starts</dt>
                    <dd className="font-semibold text-ink">Starts {batch.startDate}</dd>
                    <dd className="text-ink-2">{batch.days}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Time and mode</dt>
                    <dd className="font-medium text-ink tabular">{batch.timeSlot}</dd>
                    <dd className="text-ink-2">{batch.mode}</dd>
                  </div>
                </dl>

                <div className="flex items-end justify-between gap-4 border-t border-line pt-4 lg:col-span-4 lg:border-t-0 lg:pt-0">
                  <div>
                    <p className="font-display text-xl font-bold text-ink tabular">{batch.feePerYear}</p>
                    <p className="text-sm text-ink-2">
                      {batch.installmentAvailable ? 'Easy 3 installments' : 'One-time payable'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectBatch(batch.name)}
                    className="btn btn-dark btn-sm shrink-0"
                    aria-label={`Book a demo seat for ${batch.name}`}
                  >
                    Book demo seat
                    <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
            {['14-day full refund policy', 'Zero admission processing fees', 'Free study kit included'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <SampleNote>
            Batch dates and fees are placeholders. Edit them in <code>config/site.ts</code>.
          </SampleNote>
        </Reveal>
      </div>
    </section>
  );
};
