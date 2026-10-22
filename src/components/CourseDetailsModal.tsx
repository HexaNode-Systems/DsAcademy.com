import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Course } from '../config/site';
import { X, Check, ArrowRight } from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseName: string) => void;
}

/** Moves focus into a dialog, restores it on close and locks page scroll. */
export function useDialogFocus(open: boolean, initialRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => initialRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      // preventScroll: closing via "Book demo" scrolls to the form; don't yank the page back.
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, initialRef]);
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ course, onClose, onEnroll }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialogFocus(!!course, closeRef);

  useEffect(() => {
    if (!course) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-night/70 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto border border-line bg-white text-ink"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-6 py-4 sm:px-8">
          <span className="type-eyebrow text-accent">{course.targetExam}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink-2 transition-colors hover:bg-alt hover:text-ink"
            aria-label="Close course details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pt-6 pb-8 sm:px-8">
          <h2 id="course-modal-title" className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-bold leading-tight tracking-tight text-ink">
            {course.name}
          </h2>
          <p className="mt-2 text-ink-2">Eligibility: {course.eligibility}</p>

          <dl className="mt-6 grid grid-cols-2 border border-line sm:grid-cols-4">
            {[
              ['Duration', course.duration],
              ['Batch timings', course.batchTiming],
              ['Starts', course.startingDate],
              ['Indicative tuition', course.annualFee],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`p-4 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line sm:border-t-0' : ''} ${
                  i === 2 ? 'sm:border-l' : ''
                }`}
              >
                <dt className="type-eyebrow text-[11px] text-ink-3">{k}</dt>
                <dd className="mt-1 text-sm font-semibold leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="type-eyebrow mt-8 mb-3 text-ink">Program inclusions &amp; methodology</h3>
          <ul className="space-y-2.5">
            {course.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-[15px] text-ink-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          {course.syllabusOverview?.length > 0 && (
            <>
              <h3 className="type-eyebrow mt-8 mb-3 text-ink">Subject &amp; syllabus coverage</h3>
              <ul className="divide-y divide-line border-y border-line">
                {course.syllabusOverview.map((item) => {
                  const [head, ...rest] = item.split(':');
                  return (
                    <li key={item} className="py-3 text-[15px] leading-relaxed text-ink-2">
                      {rest.length ? (
                        <>
                          <span className="font-semibold text-ink">{head}:</span>
                          {rest.join(':')}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onEnroll(course.name)} className="btn btn-primary flex-1">
              Book free demo for this course
              <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Back to courses
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
