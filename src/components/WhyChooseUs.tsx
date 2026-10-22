import React from 'react';
import { siteConfig } from '../config/site';
import { Users, GraduationCap, HelpCircle, BarChart3, BookOpen, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/motion';
import { SectionHeader } from './ui/primitives';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  GraduationCap,
  HelpCircle,
  BarChart3,
  BookOpen,
  ShieldCheck,
};

interface WhyChooseUsProps {
  onBookClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onBookClick }) => {
  return (
    <section id="why-us" aria-labelledby="why-title" className="section bg-paper border-b border-line">
      <div className="shell">
        <SectionHeader
          id="why-title"
          index="02"
          eyebrow={`The ${siteConfig.name} approach`}
          title="A focused learning environment, by design"
          intro="We intentionally refuse the mass-coaching model. This is how a high-accountability system protects your child's preparation."
        />

        <ul className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.whyChooseUs.map((pillar, i) => {
            const Icon = iconMap[pillar.iconName] || CheckCircle;
            return (
              <Reveal
                as="li"
                key={pillar.id}
                delay={(i % 3) * 80}
                className="edge-line bg-white p-7 transition-colors duration-200 hover:bg-alt sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <span className="type-eyebrow text-ink-3 tabular">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-ink">{pillar.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{pillar.description}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="on-dark mt-12 flex flex-col gap-5 bg-night p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-lg font-medium text-slate-200">
            See the difference yourself before taking an admission decision.
          </p>
          <button type="button" onClick={onBookClick} className="btn btn-light shrink-0">
            Attend 1 free trial class
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};
