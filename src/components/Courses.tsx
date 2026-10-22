import React, { useMemo, useState } from 'react';
import { siteConfig, Course } from '../config/site';
import { ArrowRight, Check } from 'lucide-react';
import { CourseDetailsModal } from './CourseDetailsModal';
import { track } from '../utils/analytics';
import { Reveal, Scribble } from './ui/motion';
import { FilterTabs, SectionHeader } from './ui/primitives';

interface CoursesProps {
  onSelectCourse: (courseName: string) => void;
}

type CourseFilter = 'all' | 'jee' | 'neet' | 'foundation';

const matchesFilter = (course: Course, filter: CourseFilter) => {
  if (filter === 'all') return true;
  if (filter === 'jee') return course.category === 'jee' || course.targetExam.toLowerCase().includes('jee');
  if (filter === 'neet') return course.category === 'neet' || course.targetExam.toLowerCase().includes('neet');
  if (filter === 'foundation') return course.category === 'class9-10' || course.category === 'foundation';
  return true;
};

/* Typographic cover used when a course has no photo. */
const CourseCover: React.FC<{ course: Course; index: number }> = ({ course, index }) => (
  <div className="relative aspect-[2/1] overflow-hidden bg-night">
    {course.image ? (
      <img
        src={course.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="course-cover-inner h-full w-full object-cover"
      />
    ) : (
      <div className="course-cover-inner grid-paper absolute inset-0 flex flex-col justify-between p-5 text-white sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="type-eyebrow text-slate-400 tabular">P/{String(index + 1).padStart(2, '0')}</span>
          <span className="type-eyebrow text-slate-300">{course.badge}</span>
        </div>
        <div>
          <span className="block font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em]">
            {course.coverLabel ?? course.category.toUpperCase()}
          </span>
          <span className="mt-3 block text-sm text-slate-300">{course.targetExam}</span>
        </div>
      </div>
    )}
    {course.tagBadge && (
      <span
        className={`type-eyebrow absolute right-0 bottom-0 z-[1] px-2.5 py-1.5 ${
          course.tagBadge === 'Popular' ? 'bg-accent text-white' : 'bg-white text-ink'
        }`}
      >
        {course.tagBadge}
      </span>
    )}
  </div>
);

export const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  const [filter, setFilter] = useState<CourseFilter>('all');
  const [activeCourseDetails, setActiveCourseDetails] = useState<Course | null>(null);

  const filterOptions = useMemo(
    () =>
      (
        [
          { id: 'all', label: 'All programs' },
          { id: 'jee', label: 'IIT-JEE' },
          { id: 'neet', label: 'NEET' },
          { id: 'foundation', label: 'Class 9–10' },
        ] as { id: CourseFilter; label: string }[]
      ).map((o) => ({ ...o, count: siteConfig.courses.filter((c) => matchesFilter(c, o.id)).length })),
    []
  );

  const filteredCourses = siteConfig.courses.filter((course) => matchesFilter(course, filter));

  const handleFilterClick = (newFilter: CourseFilter) => {
    setFilter(newFilter);
    track('course_filter_change', { category: newFilter });
  };

  const handleEnrollClick = (courseName: string) => {
    track('cta_click', { action: 'enroll_course', course: courseName });
    onSelectCourse(courseName);
  };

  const handleDetailsClick = (course: Course) => {
    track('course_details_view', { course: course.name });
    setActiveCourseDetails(course);
  };

  return (
    <section id="courses" aria-labelledby="courses-title" className="section bg-alt border-b border-line">
      <div className="shell">
        <SectionHeader
          id="courses-title"
          index="01"
          eyebrow="Programs"
          title="Structured classroom courses for serious aspirants"
          intro="From early foundations in Class 9–10 to intensive IIT-JEE and NEET preparation. Every course includes small batches, ex-IITian mentors and weekly test analytics."
        />

        <Reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs label="Filter courses by exam" options={filterOptions} value={filter} onChange={handleFilterClick} />
          <p className="text-sm text-ink-2" aria-live="polite">
            Showing <span className="font-semibold text-ink tabular">{filteredCourses.length}</span> of{' '}
            <span className="tabular">{siteConfig.courses.length}</span> programs
          </p>
        </Reveal>

        {filteredCourses.length === 0 ? (
          <div className="border border-dashed border-line-strong bg-white px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-ink">No programs in this category yet</p>
            <p className="mx-auto mt-2 text-ink-2">
              Ask our counsellor about upcoming batches, or browse all programs.
            </p>
            <button type="button" onClick={() => handleFilterClick('all')} className="btn btn-outline btn-sm mt-6">
              Show all programs
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {filteredCourses.map((course, i) => (
              <Reveal as="li" key={course.id} delay={i * 80} className="flex">
                <article
                  data-featured={course.popular ? 'true' : 'false'}
                  className="course-card group flex w-full flex-col border border-line bg-white"
                  aria-labelledby={`course-${course.id}`}
                >
                  <CourseCover course={course} index={siteConfig.courses.indexOf(course)} />

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 id={`course-${course.id}`} className="type-card text-ink">
                      {course.name}
                    </h3>
                    <p className="mt-2 text-[15px] text-ink-2">
                      <span className="font-semibold text-ink">{course.targetExam}</span> · {course.eligibility}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 border-y border-line text-sm">
                      {[
                        ['Duration', course.duration],
                        ['Timing', course.batchTiming],
                        ['Mode', course.mode],
                      ].map(([k, v], j) => (
                        <div key={k} className={`py-3 ${j > 0 ? 'border-l border-line pl-3' : 'pr-3'}`}>
                          <dt className="type-eyebrow text-[11px] text-ink-3">{k}</dt>
                          <dd className="mt-1 font-medium leading-snug text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-5 space-y-2.5">
                      {course.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-7">
                      <div className="flex items-baseline justify-between border-t border-line pt-5">
                        <span className="text-sm text-ink-2">Starting at</span>
                        <span className="font-display text-xl font-bold text-ink tabular">{course.startingFee}</span>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => handleEnrollClick(course.name)}
                          className="btn btn-dark btn-sm"
                          aria-label={`Book a free demo for ${course.name}`}
                        >
                          Book free demo
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDetailsClick(course)}
                          className="link-arrow min-h-10"
                          aria-label={`View course details for ${course.name}`}
                        >
                          View course
                          <ArrowRight className="link-arrow-icon h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        {/* Counselling CTA */}
        <Reveal className="mt-12 grid gap-6 border border-ink bg-white p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="type-eyebrow text-accent">Not sure where to start?</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
              Get help choosing the{' '}
              <Scribble variant="underline">right program</Scribble>
            </h3>
            <p className="mt-2 text-ink-2">
              Book a 15-minute diagnostic evaluation with our Academic Director. Free, with no fees to attend.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <button
              type="button"
              onClick={() => handleEnrollClick('Free Diagnostic Counseling')}
              className="btn btn-primary w-full sm:w-auto"
            >
              Get free counselling
              <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>

      <CourseDetailsModal
        course={activeCourseDetails}
        onClose={() => setActiveCourseDetails(null)}
        onEnroll={(cName) => {
          setActiveCourseDetails(null);
          handleEnrollClick(cName);
        }}
      />
    </section>
  );
};
