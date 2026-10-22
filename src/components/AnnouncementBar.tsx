import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../config/site';
import { ArrowRight, X } from 'lucide-react';
import { track } from '../utils/analytics';

export const AnnouncementBar: React.FC = () => {
  const config = siteConfig.announcement;

  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (!config?.enabled) return false;
    try {
      if (typeof window !== 'undefined') {
        const dismissed = window.sessionStorage.getItem('abc_announcement_dismissed');
        if (dismissed === 'true') return false;
      }
    } catch (e) {
      console.debug('sessionStorage error', e);
    }

    if (config.endsAt) {
      const remaining = new Date(config.endsAt).getTime() - Date.now();
      if (remaining <= 0) return false;
    }
    return true;
  });

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  } | null>(null);

  // Real countdown timer (never resets on reload; derived from real endsAt timestamp)
  useEffect(() => {
    if (!config?.endsAt || !isVisible) return;

    const targetTime = new Date(config.endsAt).getTime();

    const updateTimer = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        setIsVisible(false);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config?.endsAt, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    track('announcement_dismiss');
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('abc_announcement_dismissed', 'true');
      }
    } catch (e) {
      console.debug('sessionStorage error', e);
    }
  };

  const handleCtaClick = () => {
    track('announcement_click', { ctaLabel: config.ctaLabel });
    const target = document.querySelector(config.ctaHref);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!config?.enabled || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="on-dark relative z-[60] overflow-hidden bg-night text-white"
          role="region"
          aria-label="Announcement"
        >
          <div className="shell flex items-center gap-3 py-2.5">
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm">
              {config.badge && (
                <span className="type-eyebrow border border-white/30 px-1.5 py-0.5 text-[11px] text-white">{config.badge}</span>
              )}
              <span className="text-slate-200">{config.text}</span>

              {timeLeft && !timeLeft.expired && (
                <span className="font-mono text-[13px] text-white tabular" aria-label="Time remaining">
                  {timeLeft.days > 0 && `${timeLeft.days}d `}
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              )}

              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1 font-semibold text-[#93b4ff] underline underline-offset-4 hover:text-white"
              >
                {config.ctaLabel}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-white"
              aria-label="Dismiss announcement for this session"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
