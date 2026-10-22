import React from 'react';
import { Reveal, useRevealClass } from './motion';

/* Editorial section header: index number, eyebrow, title, intro, drawn rule. */
export const SectionHeader: React.FC<{
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: 'light' | 'dark';
  aside?: React.ReactNode;
  id?: string;
}> = ({ index, eyebrow, title, intro, tone = 'light', aside, id }) => {
  const ruleRef = useRevealClass<HTMLDivElement>();
  const dark = tone === 'dark';
  return (
    <header className="mb-12 lg:mb-16">
      <div ref={ruleRef} className={`flex items-center gap-4 mb-8 ${dark ? 'text-white' : 'text-ink'}`}>
        <span className={`type-eyebrow tabular ${dark ? 'text-slate-400' : 'text-ink-3'}`}>{index}</span>
        <div className="section-rule flex-1" />
        <span className={`type-eyebrow ${dark ? 'text-[#93b4ff]' : 'text-accent'}`}>{eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal as="h2" id={id} className={`type-section max-w-[18ch] ${dark ? 'text-white' : 'text-ink'}`}>
            {title}
          </Reveal>
          {intro && (
            <Reveal
              as="p"
              delay={90}
              className={`type-lead mt-5 max-w-[60ch] ${dark ? 'text-slate-300' : 'text-ink-2'}`}
            >
              {intro}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={160} className="lg:col-span-4 lg:justify-self-end">
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
};

/* Square segmented filter. Buttons expose aria-pressed for screen readers. */
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  label,
  tone = 'light',
}: {
  options: { id: T; label: string; count?: number }[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex max-w-full overflow-x-auto border ${dark ? 'border-night-line' : 'border-line'} [scrollbar-width:none]`}
    >
      {options.map((opt, i) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={`relative shrink-0 min-h-11 px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
              i > 0 ? (dark ? 'border-l border-night-line' : 'border-l border-line') : ''
            } ${
              active
                ? dark
                  ? 'bg-white text-ink'
                  : 'bg-ink text-white'
                : dark
                ? 'text-slate-300 hover:text-white hover:bg-night-2'
                : 'text-ink-2 hover:text-ink hover:bg-alt'
            }`}
          >
            {opt.label}
            {typeof opt.count === 'number' && (
              <span className={`ml-2 font-mono text-xs tabular ${active ? 'opacity-70' : 'opacity-60'}`}>
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* Small "sample data" marker so template placeholders are never mistaken for real claims. */
export const SampleNote: React.FC<{ children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }> = ({
  children,
  tone = 'light',
  className = '',
}) => (
  <p
    className={`font-mono text-xs leading-relaxed ${tone === 'dark' ? 'text-slate-400' : 'text-ink-3'} ${className}`}
  >
    <span
      className={`mr-2 inline-block border px-1.5 py-0.5 uppercase tracking-wider ${
        tone === 'dark' ? 'border-night-line text-slate-300' : 'border-line text-ink-2'
      }`}
    >
      Sample
    </span>
    {children}
  </p>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);
