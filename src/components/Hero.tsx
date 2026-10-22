import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { ArrowRight, Check, CheckCircle2, ArrowDown } from 'lucide-react';
import heroImage from '../assets/images/hero-classroom.webp';
import { Scribble, ScribbleArrow, useParallax } from './ui/motion';
import { WhatsAppIcon } from './ui/primitives';
import { useToast } from '../context/ToastContext';
import { track, getUtmParams } from '../utils/analytics';
import confetti from 'canvas-confetti';

interface HeroProps {
  onBookClick: (courseName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { showToast } = useToast();
  const parallaxRef = useParallax<HTMLImageElement>(0.07);

  // Compact Hero Lead Form States
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroCourse, setHeroCourse] = useState(siteConfig.courses[0].name);
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroPhoneError, setHeroPhoneError] = useState('');

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to book a free demo class for IIT-JEE/NEET coaching.`
  )}`;

  const handleCompactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroPhoneError('');

    if (!heroName.trim() || heroName.trim().length < 2) {
      showToast('Please enter your full name (at least 2 letters)', 'error');
      return;
    }

    const cleaned = heroPhone.replace(/\D/g, '');
    if (!cleaned || cleaned.length !== 10 || !/^[6-9]\d{9}$/.test(cleaned)) {
      setHeroPhoneError('Please enter a valid 10-digit Indian mobile number');
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    setHeroSubmitting(true);
    track('form_start', { location: 'hero_compact' });

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const utms = getUtmParams();

      if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Fast Demo Lead: ${heroName} (${heroCourse})`,
            from_name: `${siteConfig.name} Lead System`,
            student_name: heroName,
            parent_phone: heroPhone,
            target_course: heroCourse,
            submission_source: 'hero_compact_form',
            ...utms,
          }),
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message || 'Submission error');
      } else {
        await new Promise((res) => setTimeout(res, 700));
      }

      setHeroSubmitted(true);
      track('form_submit_success', { location: 'hero_compact', course: heroCourse });
      showToast('Demo seat reserved! Our counselor will call you within 24 hours.', 'success');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#0B1220', '#F59E0B'],
      });
    } catch (err: unknown) {
      const error = err as Error;
      track('form_submit_error', { location: 'hero_compact', error: error.message });
      showToast(error.message || 'Error booking demo. Please chat on WhatsApp.', 'error');
    } finally {
      setHeroSubmitting(false);
    }
  };

  const scrollToCourses = () => {
    track('cta_click', { button: 'hero_explore_courses' });
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative overflow-hidden border-b border-line bg-paper">
      {/* Faint ruled-paper texture, right side only */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 grid-paper-light lg:block"
        aria-hidden="true"
      />

      <div className="shell relative grid grid-cols-1 gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-14 lg:pb-20">
        {/* Left: proposition */}
        <div className="flex flex-col lg:col-span-7 lg:pr-6 lg:pt-6">
          <div className="hero-seq mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" style={{ ['--seq' as string]: '0ms' }}>
            <span className="type-eyebrow bg-ink px-2 py-1 text-white">Admissions 2026–27 open</span>
            <span className="text-ink-2">Strict max 30 students per batch</span>
          </div>

          <h1 className="hero-seq type-hero text-ink max-w-[15ch] text-balance" style={{ ['--seq' as string]: '80ms' }}>
            Crack <span className="headline-mark">IIT-JEE&nbsp;&amp;&nbsp;NEET</span> with confident clarity, not rote learning.
          </h1>

          <p className="hero-seq type-lead mt-6 max-w-[56ch] text-ink-2" style={{ ['--seq' as string]: '220ms' }}>
            Personalised classroom coaching with strict batch caps of 30. Learn directly from ex-IITian and AIIMS
            mentors, clear doubts daily at physical counters, and build rank-producing exam temperament.
          </p>

          <div className="hero-seq mt-9" style={{ ['--seq' as string]: '380ms' }}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  track('cta_click', { button: 'hero_primary_demo' });
                  onBookClick();
                }}
                className="btn btn-primary"
              >
                Book free demo class
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={scrollToCourses} className="btn btn-outline">
                Explore courses
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* CTA caption with the hand-drawn arrow + oval */}
            <div className="mt-4 flex items-start gap-2 text-[15px] text-ink-2">
              <ScribbleArrow className="-mt-1 hidden sm:inline-block" />
              <p>
                Your first class is <Scribble variant="oval"><strong className="font-semibold text-ink">free</strong></Scribble>.
                No fees to attend, and we call within 24&nbsp;hours.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'hero_cta' })}
              className="link-arrow mt-5 text-[15px] text-whatsapp hover:text-whatsapp"
            >
              <WhatsAppIcon />
              Talk to a counsellor on WhatsApp
              <ArrowRight className="link-arrow-icon h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Trust markers */}
          <div className="hero-seq mt-12 border-t border-line pt-6" style={{ ['--seq' as string]: '520ms' }}>
            <p className="type-eyebrow mb-4 text-ink-3">Why families choose {siteConfig.name}</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-[15px] text-ink sm:grid-cols-2">
              {siteConfig.trustChips.map((chip) => (
                <li key={chip} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{chip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: image + quick booking form */}
        <div className="relative lg:col-span-5">
          <figure className="relative">
            <div className="hero-clip relative aspect-[16/10] overflow-hidden bg-alt sm:aspect-[16/9] lg:aspect-[4/5]">
              <img
                ref={parallaxRef}
                src={heroImage}
                alt="Students studying at long wooden tables in a bright library with tall bookshelves"
                width={726}
                height={768}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover will-change-transform"
              />
            </div>
            <figcaption className="absolute left-0 top-0 bg-white px-3 py-2 text-xs font-medium text-ink">
              Study library &amp; doubt wing
              <span className="text-ink-3"> · Sector 14 campus</span>
            </figcaption>
          </figure>

          {/* Quick booking card overlaps the image on desktop */}
          <div
            className="hero-seq relative z-10 mt-4 border border-line bg-white p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.45)] sm:p-7 lg:-mt-36 lg:ml-10 lg:mr-0"
            style={{ ['--seq' as string]: '460ms' }}
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />

            <div className="mb-5">
              <div className="flex items-center justify-between gap-2">
                <span className="type-eyebrow text-accent">Quick admission pass</span>
                <span className="type-eyebrow border border-success/30 bg-success-soft px-2 py-0.5 text-success">Free trial</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-ink">Claim 1 free demo session</h2>
              <p className="mt-1 text-sm text-ink-2">Experience a 2-hour lecture and meet ex-IITian mentors.</p>
            </div>

            {heroSubmitted ? (
              <div className="py-6 text-center" role="status">
                <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-success" aria-hidden="true" />
                <h3 className="text-lg font-bold text-ink">Demo seat confirmed</h3>
                <p className="mx-auto mt-1 mb-5 max-w-xs text-sm text-ink-2">
                  Thank you, {heroName}. Our counsellor will call you at {heroPhone} to confirm your slot.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    `Hi ${siteConfig.name}, I just reserved a demo for ${heroName} (${heroCourse}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <WhatsAppIcon />
                  WhatsApp confirmation
                </a>
              </div>
            ) : (
              <form onSubmit={handleCompactFormSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="heroName" className="field-label">Student full name</label>
                  <input
                    id="heroName"
                    type="text"
                    autoComplete="name"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="heroPhone" className="field-label">Parent mobile number</label>
                  <input
                    id="heroPhone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={heroPhone}
                    onChange={(e) => {
                      setHeroPhone(e.target.value);
                      if (heroPhoneError) setHeroPhoneError('');
                    }}
                    placeholder="10-digit mobile number"
                    maxLength={12}
                    aria-invalid={heroPhoneError ? 'true' : 'false'}
                    aria-describedby={heroPhoneError ? 'heroPhoneError' : undefined}
                    className="field tabular"
                  />
                  {heroPhoneError && (
                    <p id="heroPhoneError" className="mt-1.5 text-sm font-medium text-danger">{heroPhoneError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="heroCourse" className="field-label">Target program</label>
                  <select
                    id="heroCourse"
                    value={heroCourse}
                    onChange={(e) => setHeroCourse(e.target.value)}
                    className="field"
                  >
                    {siteConfig.courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" disabled={heroSubmitting} className="btn btn-dark w-full">
                  {heroSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin border-2 border-white border-t-transparent" aria-hidden="true" />
                      Reserving…
                    </>
                  ) : (
                    <>
                      Get free demo slot
                      <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-ink-3">No spam · Verified academic counselling</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
