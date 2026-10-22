import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';
import { X, Check, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './ui/primitives';
import { useDialogFocus } from './CourseDetailsModal';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimDemo: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  isOpen,
  onClose,
  onClaimDemo,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialogFocus(isOpen, closeRef);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-night/70 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg border border-line bg-white p-6 text-ink sm:p-8"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center text-ink-3 transition-colors hover:bg-alt hover:text-ink"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="type-eyebrow text-accent">Before you go</p>
        <h2 id="exit-modal-title" className="mt-3 pr-8 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
          Experience one free class at {siteConfig.name}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          Sit in an actual batch of 30 students, see how ex-IITian mentors simplify tough concepts, and get a free
          diagnostic evaluation with zero financial commitment.
        </p>

        <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
          <li className="flex items-start gap-2.5 py-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            <span>
              <strong className="text-ink">100% free.</strong> <span className="text-ink-2">No registration fees or card details.</span>
            </span>
          </li>
          <li className="flex items-start gap-2.5 py-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            <span>
              <strong className="text-ink">Free study pack.</strong>{' '}
              <span className="text-ink-2">Take home solved formula sheets and modules.</span>
            </span>
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              onClaimDemo();
              onClose();
            }}
            className="btn btn-primary flex-1"
          >
            Reserve free trial pass
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
              `Hi ${siteConfig.name}, I saw the free trial class offer and want to know more.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mx-auto mt-4 block min-h-10 text-sm text-ink-2 underline underline-offset-4 hover:text-ink"
        >
          No thanks, I will browse first
        </button>
      </motion.div>
    </div>
  );
};
