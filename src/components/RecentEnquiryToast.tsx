import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../config/site';
import { Users, X } from 'lucide-react';

export const RecentEnquiryToast: React.FC = () => {
  const isDemo = siteConfig.demoMode;
  const enquiries = siteConfig.sampleEnquiries;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isDemo || !enquiries || enquiries.length === 0 || dismissed) return;

    // Show first toast after 6 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(initialTimer);
  }, [isDemo, enquiries, dismissed]);

  useEffect(() => {
    if (!isVisible || dismissed) return;

    // Keep visible for 5.5 seconds, then hide
    const hideTimer = setTimeout(() => {
      setIsVisible(false);

      // Re-trigger with next enquiry after 16 seconds
      const nextTimer = setTimeout(() => {
        if (!dismissed) {
          setCurrentIndex((prev) => (prev + 1) % enquiries.length);
          setIsVisible(true);
        }
      }, 16000);

      return () => clearTimeout(nextTimer);
    }, 5500);

    return () => clearTimeout(hideTimer);
  }, [isVisible, dismissed, enquiries.length]);

  if (!isDemo || !enquiries || enquiries.length === 0 || dismissed) return null;

  const current = enquiries[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="pointer-events-auto fixed bottom-6 left-4 z-40 hidden w-full max-w-xs md:block"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-3 border border-line bg-white p-3.5 text-sm text-ink shadow-[0_16px_40px_-24px_rgba(15,23,42,0.5)]"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-accent-soft text-accent">
              <Users className="h-4 w-4" aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="truncate font-semibold text-ink">
                  {current.studentName} ({current.city})
                </span>
                <span className="shrink-0 border border-line px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-wider text-ink-2">
                  Sample
                </span>
              </div>
              <div className="truncate text-[13px] text-ink-2">
                Enquired about <strong className="font-semibold text-ink">{current.course}</strong>
              </div>
              <div className="mt-0.5 text-xs text-ink-3">
                {current.timeAgo}
              </div>
            </div>

            <button
              onClick={() => {
                setIsVisible(false);
                setDismissed(true);
              }}
              className="-mt-1.5 -mr-1.5 inline-flex h-8 w-8 items-center justify-center text-ink-3 hover:text-ink"
              aria-label="Dismiss demo enquiry notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
