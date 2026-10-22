import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/site';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { track } from '../utils/analytics';
import { WhatsAppIcon } from './ui/primitives';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { href: '#courses', label: 'Courses', mobileLabel: 'Courses & programs' },
  { href: '#why-us', label: 'Why us', mobileLabel: `Why ${siteConfig.name}` },
  { href: '#faculty', label: 'Faculty', mobileLabel: 'Faculty' },
  { href: '#results', label: 'Results', mobileLabel: 'Results & toppers' },
  { href: '#batches', label: 'Batches & fees', mobileLabel: 'Batch timings & fees' },
  { href: '#faqs', label: 'FAQs', mobileLabel: 'Frequently asked questions' },
];

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the link for the section crossing the middle of the viewport.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const ids = [...NAV_LINKS.map((l) => l.href.slice(1)), 'contact', 'demo-form'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-[border-color,box-shadow] duration-200 ${
        isScrolled ? 'border-line shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.25)]' : 'border-transparent'
      }`}
    >
      <div className="shell h-16 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 shrink-0" aria-label={`${siteConfig.name} home`}>
          <span className="w-9 h-9 bg-ink text-white font-display font-extrabold text-sm tracking-tight flex items-center justify-center">
            {siteConfig.logo.text}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-bold tracking-tight text-ink">{siteConfig.name}</span>
            <span className="type-eyebrow text-[10px] text-ink-3 mt-1 max-[400px]:hidden">IIT-JEE · NEET · Boards</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1 h-full" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative h-full inline-flex items-center px-3 text-[15px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-3 right-3 bottom-0 h-0.5 bg-accent origin-left transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            onClick={() => track('cta_click', { button: 'nav_phone' })}
            className="inline-flex items-center gap-2 min-h-10 px-3 text-sm font-medium text-ink-2 hover:text-ink transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="tabular">{siteConfig.contact.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              track('cta_click', { button: 'nav_demo_button' });
              onBookClick();
            }}
            className="btn btn-primary btn-sm"
          >
            Book free demo
            <ArrowRight className="btn-arrow w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile / tablet actions */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => {
              track('cta_click', { button: 'nav_mobile_demo' });
              onBookClick();
            }}
            className="btn btn-primary btn-sm px-3"
          >
            Free demo
          </button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="w-11 h-11 inline-flex items-center justify-center border border-line text-ink hover:bg-alt transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!mobileMenuOpen}
        className="lg:hidden border-t border-line bg-white max-h-[calc(100dvh-4rem)] overflow-y-auto"
      >
        <nav aria-label="Mobile navigation" className="shell py-2">
          <ul>
            {[...NAV_LINKS, { href: '#contact', label: 'Contact', mobileLabel: 'Centre location & contact' }].map(
              (link, i) => (
                <li key={link.href} className="border-b border-line last:border-b-0">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between min-h-13 py-3 text-base font-medium ${
                      active === link.href ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    <span>
                      <span className="font-mono text-xs text-ink-3 mr-3 tabular">{String(i + 1).padStart(2, '0')}</span>
                      {link.mobileLabel}
                    </span>
                    <ArrowRight className="w-4 h-4 text-ink-3" aria-hidden="true" />
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="shell pb-5 pt-2 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="btn btn-primary w-full"
          >
            Book free demo class
          </button>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
              `Hi ${siteConfig.name}, I want to enquire about admissions.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { location: 'mobile_menu' })}
            className="btn btn-whatsapp w-full"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
};
