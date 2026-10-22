import React, { useRef, useState } from 'react';
import { siteConfig } from '../config/site';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { Reveal } from './ui/motion';
import { SectionHeader, WhatsAppIcon } from './ui/primitives';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const faqs = siteConfig.faqs;

  const toggle = (idx: number) => setOpenIndex((cur) => (cur === idx ? null : idx));

  // Arrow keys / Home / End move between questions (WAI-ARIA accordion pattern).
  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const last = faqs.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = idx === last ? 0 : idx + 1;
    if (e.key === 'ArrowUp') next = idx === 0 ? last : idx - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      buttonsRef.current[next]?.focus();
    }
  };

  return (
    <section id="faqs" aria-labelledby="faq-title" className="section bg-paper border-b border-line">
      <div className="shell">
        <SectionHeader
          id="faq-title"
          index="08"
          eyebrow="FAQs"
          title="Questions parents ask before admission"
          intro="Clear answers about admissions, batch sizes, faculty availability, tests and fees."
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border-t border-ink">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <Reveal key={faq.question} delay={idx * 60} className="border-b border-line">
                    <h3>
                      <button
                        ref={(el) => {
                          buttonsRef.current[idx] = el;
                        }}
                        id={`faq-q-${idx}`}
                        type="button"
                        onClick={() => toggle(idx)}
                        onKeyDown={(e) => onKeyDown(e, idx)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${idx}`}
                        className="group flex w-full items-start gap-5 py-5 text-left sm:py-6"
                      >
                        <span className="mt-1 w-8 shrink-0 font-mono text-xs text-ink-3 tabular">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">
                          <span className="type-eyebrow block text-ink-3">{faq.category}</span>
                          <span className="mt-1 block font-display text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent sm:text-xl">
                            {faq.question}
                          </span>
                        </span>
                        <span
                          className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center border transition-[background-color,border-color,color] duration-200 ${
                            isOpen ? 'border-ink bg-ink text-white' : 'border-line-strong text-ink group-hover:border-ink'
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-a-${idx}`}
                      role="region"
                      aria-labelledby={`faq-q-${idx}`}
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-[3.25rem] pr-12 text-[16px] leading-relaxed text-ink-2">{faq.answer}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal as="aside" delay={120} className="lg:col-span-4">
            <div className="border border-line bg-alt p-6 lg:sticky lg:top-24">
              <p className="font-display text-lg font-bold text-ink">Still have a question?</p>
              <p className="mt-2 text-[15px] text-ink-2">
                Ask about admissions, syllabus or hostel facilities. A counsellor replies on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${siteConfig.name}, I have a specific question about your courses.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-5 w-full"
              >
                <WhatsAppIcon />
                Ask a counsellor
              </a>
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="link-arrow mt-4 text-[15px]">
                Or call {siteConfig.contact.phone}
                <ArrowRight className="link-arrow-icon h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
