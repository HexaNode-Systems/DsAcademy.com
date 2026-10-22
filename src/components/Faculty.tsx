import React, { useState } from 'react';
import { siteConfig, FacultyMember } from '../config/site';
import { Reveal } from './ui/motion';
import { SampleNote, SectionHeader } from './ui/primitives';

const initials = (name: string) =>
  name
    .replace(/^(Er\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

const Portrait: React.FC<{ member: FacultyMember }> = ({ member }) => {
  const [failed, setFailed] = useState(false);
  if (member.photoUrl && !failed) {
    return (
      <img
        src={member.photoUrl}
        alt={`${member.name}, ${member.role}`}
        loading="lazy"
        decoding="async"
        width={640}
        height={640}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="grid-paper flex h-full w-full flex-col justify-between bg-night p-5 text-white" aria-hidden="true">
      <span className="type-eyebrow text-slate-400">Photo pending</span>
      <span className="font-display text-6xl font-extrabold tracking-[-0.04em]">{initials(member.name)}</span>
    </div>
  );
};

export const Faculty: React.FC = () => {
  return (
    <section id="faculty" aria-labelledby="faculty-title" className="section bg-alt border-b border-line">
      <div className="shell">
        <SectionHeader
          id="faculty-title"
          index="03"
          eyebrow="Faculty"
          title="Learn from ex-IITians and seasoned academic leaders"
          intro="Permanent senior faculty teach every batch themselves, not junior trainees. Their systematic teaching turns complex problems into intuitive solutions."
        />

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.faculty.map((member, i) => (
            <Reveal as="li" key={member.id} delay={i * 80} className="group flex flex-col border border-line bg-white">
              <div className="zoom-frame aspect-square bg-alt">
                <Portrait member={member} />
              </div>
              <div className="edge-line flex flex-1 flex-col p-6">
                <p className="type-eyebrow text-accent">{member.subject}</p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-ink-2">{member.role}</p>
                <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="sr-only">Qualification</dt>
                    <dd className="font-semibold text-ink">{member.qualification}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Experience</dt>
                    <dd className="text-ink-2">{member.experience}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Specialisation</dt>
                    <dd className="text-ink-2">{member.specialization}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* <SampleNote className="mt-8">
          Faculty names, credentials and photos are placeholders. Edit them in <code>config/site.ts</code>.
        </SampleNote> */}
      </div>
    </section>
  );
};
