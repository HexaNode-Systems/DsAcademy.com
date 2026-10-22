import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';
import { X, ArrowRight } from 'lucide-react';
import { track } from '../utils/analytics';

interface CourseLaunchPopupProps {
  onReserveCourse: (courseName: string) => void;
  isOtherModalOpen?: boolean;
}

export const CourseLaunchPopup: React.FC<CourseLaunchPopupProps> = ({
  onReserveCourse,
  isOtherModalOpen = false,
}) => {
  const config = siteConfig.launchCourse;

  const [isOpen, setIsOpen] = useState(false);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    track('popup_close', { type: 'course_launch' });
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('abc_course_launch_dismissed', 'true');
      }
    } catch (e) {
      console.debug('sessionStorage error', e);
    }
  }, []);

  useEffect(() => {
    if (!config?.enabled || isOtherModalOpen) return;

    try {
      if (typeof window !== 'undefined') {
        if (window.sessionStorage.getItem('abc_course_launch_dismissed') === 'true') {
          return;
        }
      }
    } catch (e) {
      console.debug('sessionStorage error', e);
    }

    let triggered = false;

    const triggerPopup = () => {
      if (triggered) return;

      // Check if user is actively typing in an input or textarea
      if (typeof document !== 'undefined') {
        const activeEl = document.activeElement;
        if (
          activeEl &&
          (activeEl.tagName === 'INPUT' ||
            activeEl.tagName === 'TEXTAREA' ||
            activeEl.tagName === 'SELECT')
        ) {
          return; // Do not interrupt user input
        }

        // Check if lead form is currently visible in viewport
        const formEl = document.getElementById('demo-form');
        if (formEl) {
          const rect = formEl.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            return; // Don't show while over form
          }
        }
      }

      triggered = true;
      setIsOpen(true);
      track('popup_open', { type: 'course_launch', course: config.title });
    };

    // Trigger after ~8 seconds
    const timer = setTimeout(triggerPopup, 8000);

    // Or after 40% scroll
    const handleScroll = () => {
      if (triggered) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY / docHeight >= 0.4) {
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [config, isOtherModalOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dismiss]);

  if (!config?.enabled || !isOpen || isOtherModalOpen) return null;

  return (
    <div
      className="fixed right-4 bottom-24 z-40 w-[calc(100%-2rem)] max-w-sm sm:right-6 md:bottom-24"
      role="dialog"
      aria-modal="false"
      aria-labelledby="course-launch-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative border border-line bg-white p-5 text-ink shadow-[0_24px_60px_-28px_rgba(15,23,42,0.5)] sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-2 right-2 inline-flex h-10 w-10 items-center justify-center text-ink-3 transition-colors hover:bg-alt hover:text-ink"
          aria-label="Close new batch notification"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-wrap items-center gap-2 pr-8">
          <span className="type-eyebrow text-accent">{config.badge}</span>
          <span className="text-sm text-ink-3">· {config.targetExam}</span>
        </div>

        <h2 id="course-launch-title" className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-ink">
          {config.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{config.benefit}</p>

        <dl className="mt-4 grid grid-cols-2 border border-line text-sm">
          <div className="p-3">
            <dt className="type-eyebrow text-[11px] text-ink-3">Starts</dt>
            <dd className="mt-0.5 font-semibold text-ink">{config.startDate}</dd>
          </div>
          <div className="border-l border-line p-3">
            <dt className="type-eyebrow text-[11px] text-ink-3">Seats left</dt>
            <dd className="mt-0.5 font-semibold text-danger tabular">{config.seatsLeft}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onReserveCourse(config.courseName || config.title);
              dismiss();
            }}
            className="btn btn-dark btn-sm flex-1"
          >
            Reserve my seat
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={dismiss} className="btn btn-sm px-3 text-ink-2 hover:text-ink">
            Later
          </button>
        </div>
      </motion.div>
    </div>
  );
};
