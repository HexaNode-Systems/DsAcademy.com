import React from 'react';
import { siteConfig } from '../config/site';
import { track } from '../utils/analytics';
import { WhatsAppIcon } from './ui/primitives';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I want to speak with an academic counselor regarding course admissions.`
  )}`;

  return (
    <div className="fixed right-6 bottom-6 z-40 hidden md:block">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { location: 'floating_button' })}
        aria-label="Chat with an academic counsellor on WhatsApp"
        className="group flex h-13 items-center gap-0 bg-whatsapp text-white shadow-[0_12px_28px_-12px_rgba(18,140,74,0.7)] transition-colors duration-200 hover:bg-[#0b6434]"
      >
        <span className="flex h-13 w-13 items-center justify-center">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
        {/* Label slides open on hover / focus */}
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
          <span className="overflow-hidden whitespace-nowrap text-sm font-semibold">
            <span className="pr-5">Chat with a counsellor</span>
          </span>
        </span>
      </a>
    </div>
  );
};
