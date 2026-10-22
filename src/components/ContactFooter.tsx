import React from 'react';
import { siteConfig } from '../config/site';
import { ArrowRight, ArrowUpRight, Youtube, Instagram, Facebook, Send } from 'lucide-react';
import { Reveal } from './ui/motion';
import { SampleNote, WhatsAppIcon } from './ui/primitives';

interface ContactFooterProps {
  onBookClick: () => void;
}

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  const el = document.querySelector(href);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export const ContactFooter: React.FC<ContactFooterProps> = ({ onBookClick }) => {
  const { contact, socialLinks } = siteConfig;

  const contactRows: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Address',
      value: (
        <>
          {contact.address}
          <span className="mt-1 block text-slate-400">Landmark: {contact.landmark}</span>
        </>
      ),
    },
    { label: 'Counselling hours', value: contact.timings },
    {
      label: 'Admissions',
      value: (
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={`tel:${contact.phoneRaw}`} className="font-semibold text-white underline-offset-4 hover:underline tabular">
            {contact.phone}
          </a>
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#6ee7a0] underline-offset-4 hover:underline"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </span>
      ),
    },
    {
      label: 'Email',
      value: (
        <a href={`mailto:${contact.email}`} className="text-white underline-offset-4 hover:underline break-all">
          {contact.email}
        </a>
      ),
    },
  ];

  const socials = [
    { href: socialLinks.youtube, label: 'YouTube', Icon: Youtube },
    { href: socialLinks.instagram, label: 'Instagram', Icon: Instagram },
    { href: socialLinks.facebook, label: 'Facebook', Icon: Facebook },
    { href: socialLinks.telegram, label: 'Telegram', Icon: Send },
  ];

  return (
    <footer id="contact" aria-labelledby="contact-title" className="on-dark bg-night text-white">
      <div className="shell section">
        <div className="mb-10 flex items-center gap-4">
          <span className="type-eyebrow text-slate-400 tabular">09</span>
          <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
          <span className="type-eyebrow text-[#93b4ff]">Visit us</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="h2" id="contact-title" className="type-section max-w-[14ch] text-white">
              Walk in for free diagnostic counselling
            </Reveal>
            <Reveal as="p" delay={90} className="type-lead mt-5 text-slate-300">
              Parents and students are welcome during counselling hours to see the classrooms and library and meet senior
              faculty in person.
            </Reveal>

            <Reveal as="dl" delay={160} className="mt-10 divide-y divide-night-line border-y border-night-line">
              {contactRows.map((row) => (
                <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="type-eyebrow pt-0.5 text-slate-400">{row.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-slate-200">{row.value}</dd>
                </div>
              ))}
            </Reveal>

            <Reveal delay={220} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onBookClick} className="btn btn-primary">
                Book free demo
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
              </button>
              <a href={`tel:${contact.phoneRaw}`} className="btn btn-outline-light">
                Call a counsellor
              </a>
            </Reveal>
          </div>

          <Reveal variant="clip" delay={120} className="lg:col-span-7">
            <div className="relative h-[340px] border border-night-line bg-night-2 sm:h-[460px] lg:h-full lg:min-h-[480px]">
              <iframe
                title={`${siteConfig.name} location map`}
                src={contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[35%]"
              />
              <span className="absolute left-0 top-0 bg-white px-3 py-2 text-xs font-semibold text-ink">
                Sector 14 campus
              </span>
            </div>
          </Reveal>
        </div>

        {/* <SampleNote tone="dark" className="mt-8">
          Address, phone numbers and map are placeholders. Replace them in <code className="text-slate-200">config/site.ts</code>.
        </SampleNote> */}
      </div>

      {/* Footer navigation */}
      <div className="border-t border-night-line">
        <div className="shell grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-white font-display text-sm font-extrabold text-ink">
                {siteConfig.logo.text}
              </span>
              <span className="font-display text-lg font-bold tracking-tight">{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-slate-400">{siteConfig.subTagline}</p>
            <ul className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${label}`}
                    className="flex h-11 w-11 items-center justify-center border border-night-line text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer: explore" className="lg:col-span-2">
            <h3 className="type-eyebrow text-slate-400">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ['#courses', 'Courses & fees'],
                ['#why-us', 'Why choose us'],
                ['#faculty', 'Faculty'],
                ['#results', 'Results'],
                ['#batches', 'Batch timetable'],
                ['#faqs', 'FAQs'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} onClick={(e) => scrollTo(e, href)} className="text-slate-300 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer: programs" className="lg:col-span-3">
            <h3 className="type-eyebrow text-slate-400">Programs</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.courses.map((c) => (
                <li key={c.id}>
                  <a href="#courses" onClick={(e) => scrollTo(e, '#courses')} className="text-slate-300 transition-colors hover:text-white">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="type-eyebrow text-slate-400">Admissions</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button type="button" onClick={onBookClick} className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                  Book a free demo <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </li>
              <li>
                <a href={`tel:${contact.phoneRaw}`} className="text-slate-300 hover:text-white">
                  Call admissions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-night-line">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName.replace(/\.$/, '')}. All rights reserved.
          </p>
          <p>Design and development by Appnix Technologies</p>
        </div>
      </div>
    </footer>
  );
};
