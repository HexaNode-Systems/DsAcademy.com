import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/site';
import { Phone, ArrowRight } from 'lucide-react';
import { track } from '../utils/analytics';
import { WhatsAppIcon } from './ui/primitives';

interface MobileBottomBarProps {
  onBookClick: () => void;
}

/**
 * Compact enrolment bar for phones. It stays out of the way while the hero
 * (which has its own CTAs) is on screen, then slides up once the visitor has
 * scrolled past it. The page reserves bottom padding so nothing is obscured.
 */
export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onBookClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: '0px 0px -40% 0px',
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgba(15,23,42,0.35)] transition-transform duration-300 ease-out md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Quick admissions actions"
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-[auto_auto_1fr] gap-2">
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          onClick={() => track('cta_click', { button: 'mobile_bar_call' })}
          className="btn btn-sm border-line px-3 text-ink"
          aria-label="Call the admissions desk"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
            `Hello ${siteConfig.name}, I am interested in a free demo class.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'mobile_bar' })}
          className="btn btn-sm btn-whatsapp px-3"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
          Chat
        </a>
        <button
          type="button"
          onClick={() => {
            track('cta_click', { button: 'mobile_bar_demo' });
            onBookClick();
          }}
          className="btn btn-sm btn-primary"
        >
          Book free demo
          <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
