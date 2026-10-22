import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/site';
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { Reveal, Scribble, useRevealClass } from './ui/motion';
import { WhatsAppIcon } from './ui/primitives';
import { useToast } from '../context/ToastContext';
import { track, getUtmParams } from '../utils/analytics';

interface DemoBookingFormProps {
  initialCourse?: string;
}

export const DemoBookingForm: React.FC<DemoBookingFormProps> = ({ initialCourse }) => {
  const { showToast } = useToast();
  const journeyRef = useRevealClass<HTMLOListElement>();
  const trackWhatsApp = () => track('whatsapp_click', { source: 'demo_form_fallback', course });

  const [studentName, setStudentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [course, setCourse] = useState(initialCourse || siteConfig.courses[0].name);
  const [preferredTime, setPreferredTime] = useState('Evening (4:30 PM – 7:30 PM)');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync if initialCourse changes from another section
  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
    }
  }, [initialCourse]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!studentName.trim() || studentName.trim().length < 2) {
      errs.studentName = 'Please enter student full name (at least 2 characters)';
    }

    const cleanedPhone = parentPhone.replace(/\D/g, '');
    if (!cleanedPhone) {
      errs.parentPhone = 'Parent contact number is required';
    } else if (cleanedPhone.length !== 10) {
      errs.parentPhone = 'Please enter a valid 10-digit Indian mobile number';
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      errs.parentPhone = 'Please enter a valid Indian mobile number starting with 6, 7, 8, or 9';
    }

    if (!course) {
      errs.course = 'Please choose a target course';
    }

    if (!preferredTime) {
      errs.preferredTime = 'Please select your preferred demo slot';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Builds the pre-filled wa.me link. (Tracking now happens on click, not on every render.)
  const buildWhatsAppMessage = () => {
    const text =
      `*Free Demo Class Booking - ${siteConfig.name}*\n\n` +
      `*Student Name:* ${studentName.trim() || 'Prospective Student'}\n` +
      `*Parent Phone:* ${parentPhone.trim() || 'Not provided'}\n` +
      `*Target Course:* ${course}\n` +
      `*Preferred Slot:* ${preferredTime}\n` +
      (notes.trim() ? `*Student Doubts/Notes:* ${notes.trim()}\n` : '') +
      `\nPlease confirm the upcoming free trial batch schedule.`;

    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      showToast('Please check the form for errors', 'error');
      return;
    }

    setIsSubmitting(true);
    track('form_start', { location: 'main_demo_form', course });

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const utms = getUtmParams();

    try {
      if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Free Demo Class Booking: ${studentName} (${course})`,
            from_name: `${siteConfig.name} Lead System`,
            student_name: studentName,
            parent_phone: parentPhone,
            target_course: course,
            preferred_slot: preferredTime,
            additional_notes: notes || 'None',
            submission_source: 'main_demo_form',
            ...utms,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Submission could not be completed.');
        }
      } else {
        // Simulated latency for demo / evaluation environment
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSuccess(true);
      track('form_submit_success', { location: 'main_demo_form', course });
      showToast('Demo seat reserved! Check your phone for confirmation.', 'success');

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#0B1220', '#F59E0B'],
      });
    } catch (err: unknown) {
      const error = err as Error;
      const msg = error.message || 'Failed to submit form. Please use the WhatsApp button below for instant confirmation.';
      setSubmitError(msg);
      track('form_submit_error', { location: 'main_demo_form', error: msg });
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStudentName('');
    setParentPhone('');
    setNotes('');
    setIsSuccess(false);
    setErrors({});
  };

  const fieldError = (key: string) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-sm font-medium text-danger">
        {errors[key]}
      </p>
    ) : null;

  return (
    <section id="demo-form" aria-labelledby="demo-title" className="section on-dark relative bg-night text-white">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left: invitation + what happens next */}
        <div className="lg:col-span-5">
          <div className="mb-8 flex items-center gap-4">
            <span className="type-eyebrow text-slate-400 tabular">07</span>
            <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
            <span className="type-eyebrow text-[#93b4ff]">Free demo</span>
          </div>

          <Reveal as="h2" id="demo-title" className="type-section max-w-[14ch] text-white">
            Book a <Scribble variant="oval">free</Scribble> 1-day demo class
          </Reveal>
          <Reveal as="p" delay={100} className="type-lead mt-5 text-slate-300">
            Let your child sit in an actual batch of 30 students, experience the teaching of our ex-IITian mentors, and
            review our printed modules first-hand.
          </Reveal>

          <ol ref={journeyRef} className="relative mt-10" aria-label="What happens after you book">
            <span className="journey-line absolute left-[15px] top-2 bottom-2 w-px bg-white/25" aria-hidden="true" />
            {siteConfig.demoJourney.map((step, i) => (
              <Reveal as="li" key={step.title} delay={200 + i * 110} className="relative flex gap-5 pb-7 last:pb-0">
                <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center border border-white/30 bg-night font-mono text-xs text-white tabular">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-[15px] text-slate-400">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={300} className="mt-10 flex items-start gap-3 border-t border-white/15 pt-6 text-sm text-slate-300">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6ee7a0]" aria-hidden="true" />
            <p>
              <strong className="text-white">No spam.</strong> We do not sell or share student data. A senior academic
              counsellor calls only once, within 24 hours.
            </p>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={150} className="lg:col-span-7">
          <div className="relative border border-white/10 bg-white p-6 text-ink sm:p-10">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />

            {isSuccess ? (
              <div className="py-6 text-center" role="status">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-success" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold text-ink">Free demo seat reserved</h3>
                <p className="mx-auto mt-2 mb-6 max-w-md text-ink-2">
                  Thank you, <strong className="text-ink">{studentName}</strong>. Our counsellor will call{' '}
                  <strong className="text-ink">{parentPhone}</strong> within 24 hours to confirm your reporting time.
                </p>

                <dl className="mx-auto mb-8 max-w-md divide-y divide-line border border-line text-left text-sm">
                  {[
                    ['Course', course],
                    ['Preferred slot', preferredTime],
                    ['Campus', siteConfig.contact.address],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-3">
                      <dt className="text-ink-2">{k}</dt>
                      <dd className="font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsApp}
                    className="btn btn-whatsapp w-full sm:w-auto"
                  >
                    <WhatsAppIcon />
                    Confirm faster on WhatsApp
                  </a>
                  <button type="button" onClick={handleReset} className="btn btn-outline w-full sm:w-auto">
                    Book another seat
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-line pb-5">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">Reserve your free demo session</h3>
                  <p className="mt-1 text-sm text-ink-2">Four quick fields, or connect directly on WhatsApp.</p>
                </div>

                {submitError && (
                  <div role="alert" className="flex items-start gap-2 border border-danger/30 bg-red-50 p-3.5 text-sm text-danger">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="studentName" className="field-label">
                      Student full name <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="studentName"
                      type="text"
                      autoComplete="name"
                      required
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        if (errors.studentName) setErrors({ ...errors, studentName: '' });
                      }}
                      placeholder="e.g. Aryan Sharma"
                      aria-invalid={errors.studentName ? 'true' : 'false'}
                      aria-describedby={errors.studentName ? 'studentName-error' : undefined}
                      className="field"
                    />
                    {fieldError('studentName')}
                  </div>

                  <div>
                    <label htmlFor="parentPhone" className="field-label">
                      Parent / guardian mobile <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="parentPhone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      required
                      value={parentPhone}
                      onChange={(e) => {
                        setParentPhone(e.target.value);
                        if (errors.parentPhone) setErrors({ ...errors, parentPhone: '' });
                      }}
                      placeholder="10-digit number"
                      maxLength={12}
                      aria-invalid={errors.parentPhone ? 'true' : 'false'}
                      aria-describedby={errors.parentPhone ? 'parentPhone-error' : 'parentPhone-hint'}
                      className="field tabular"
                    />
                    {errors.parentPhone ? (
                      fieldError('parentPhone')
                    ) : (
                      <p id="parentPhone-hint" className="mt-1.5 text-sm text-ink-3">
                        Used only to confirm your demo timing.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="course" className="field-label">
                      Target course / exam <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="course"
                      value={course}
                      onChange={(e) => {
                        setCourse(e.target.value);
                        if (errors.course) setErrors({ ...errors, course: '' });
                      }}
                      className="field"
                    >
                      {siteConfig.courses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.targetExam})
                        </option>
                      ))}
                      {/* Keep any batch / counselling name passed in from other sections selectable. */}
                      {course &&
                        !siteConfig.courses.some((c) => c.name === course) &&
                        course !== 'Crash Course / Test Series' &&
                        course !== 'Free Diagnostic Counseling' && <option value={course}>{course}</option>}
                      <option value="Crash Course / Test Series">Crash Course &amp; Test Series</option>
                      <option value="Free Diagnostic Counseling">General Admission Counseling</option>
                    </select>
                    {fieldError('course')}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="field-label">
                      Preferred demo slot <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="field"
                    >
                      <option value="Morning (8:30 AM – 11:30 AM)">Morning (8:30 AM – 11:30 AM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Evening (4:30 PM – 7:30 PM)">Evening (4:30 PM – 7:30 PM)</option>
                      <option value="Weekend Special (Saturday / Sunday)">Weekend (Saturday / Sunday)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="field-label">
                    Specific doubts or goals <span className="font-normal text-ink-3">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Currently in Class 10 CBSE, interested in a Physics mechanics demo."
                    className="field resize-y"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1">
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin border-2 border-white border-t-transparent" aria-hidden="true" />
                        Reserving demo seat…
                      </>
                    ) : (
                      <>
                        Reserve my free demo
                        <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsApp}
                    className="btn btn-whatsapp"
                  >
                    <WhatsAppIcon />
                    Prefer WhatsApp?
                  </a>
                </div>
                <p className="text-sm text-ink-3">Free demo, no fees to attend · We call within 24 hours</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
