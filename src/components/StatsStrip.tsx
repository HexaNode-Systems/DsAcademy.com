import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/site';
import { Reveal, useOnceInView, usePrefersReducedMotion } from './ui/motion';
import { SampleNote } from './ui/primitives';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const CountUpNumber: React.FC<CounterProps> = ({ target, suffix = '', duration = 1400 }) => {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useOnceInView<HTMLSpanElement>(() => setHasStarted(true));

  useEffect(() => {
    if (!hasStarted) return;
    if (reduced) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    let frame = 0;
    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setCount(target);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hasStarted, target, duration, reduced]);

  return (
    <span ref={ref} className="tabular">
      {/* Screen readers get the final value straight away. */}
      <span aria-hidden="true">
        {count.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="sr-only">
        {target.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
};

export const StatsStrip: React.FC = () => {
  return (
    <section aria-label="Track record" className="on-dark bg-night text-white">
      <div className="shell py-14 lg:py-16">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((stat, idx) => (
            <Reveal
              key={stat.label}
              delay={idx * 80}
              className={`flex flex-col gap-2 py-6 pr-4 sm:pr-8 lg:py-2 ${
                idx % 2 === 1 ? 'pl-4 sm:pl-8 border-l border-night-line' : ''
              } ${idx >= 2 ? 'border-t border-night-line lg:border-t-0' : ''} ${
                idx === 2 ? 'lg:pl-8 lg:border-l' : ''
              }`}
            >
              <dt className="order-2 text-[15px] font-semibold text-white">{stat.label}</dt>
              <dd className="order-1 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <CountUpNumber target={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="order-3 max-w-[30ch] text-sm leading-relaxed text-slate-400">{stat.description}</dd>
            </Reveal>
          ))}
        </dl>

        {/* <SampleNote tone="dark" className="mt-8 border-t border-night-line pt-6">
          Placeholder metrics. Replace them in <code className="text-slate-200">config/site.ts</code> with the
          institute&apos;s verified record before going live.
        </SampleNote> */}
      </div>
    </section>
  );
};
