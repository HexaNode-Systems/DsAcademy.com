import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { Courses } from './components/Courses';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Faculty } from './components/Faculty';
import { Results } from './components/Results';
import { Testimonials } from './components/Testimonials';
import { BatchSchedule } from './components/BatchSchedule';
import { DemoBookingForm } from './components/DemoBookingForm';
import { FAQ } from './components/FAQ';
import { ContactFooter } from './components/ContactFooter';
import { MobileBottomBar } from './components/MobileBottomBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CourseLaunchPopup } from './components/CourseLaunchPopup';
import { ExitIntentModal } from './components/ExitIntentModal';
import { RecentEnquiryToast } from './components/RecentEnquiryToast';
import { track } from './utils/analytics';

export default function App() {
  const [selectedCourseForForm, setSelectedCourseForForm] = useState<string>('');
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const scrollToDemoForm = (courseName?: string) => {
    if (courseName) {
      setSelectedCourseForForm(courseName);
    }
    const element = document.getElementById('demo-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Exit intent on desktop (mouse leaving top of viewport) & 60-second inactivity check
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    try {
      if (window.sessionStorage.getItem('abc_exit_intent_dismissed') === 'true') {
        return;
      }
    } catch (e) {
      console.debug('sessionStorage error', e);
    }

    let triggered = false;

    const triggerExitIntent = () => {
      if (triggered) return;
      triggered = true;
      setIsExitModalOpen(true);
      track('popup_open', { type: 'exit_intent' });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerExitIntent();
      }
    };

    const inactivityTimeout = setTimeout(() => {
      triggerExitIntent();
    }, 60000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  const handleCloseExitModal = () => {
    setIsExitModalOpen(false);
    track('popup_close', { type: 'exit_intent' });
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('abc_exit_intent_dismissed', 'true');
      }
    } catch (e) {
      console.debug('sessionStorage error', e);
    }
  };

  return (
    <ToastProvider>
      <div className="relative flex min-h-screen flex-col bg-paper pb-16 text-ink md:pb-0">
        
        {/* Announcement Bar at very top */}
        <AnnouncementBar />

        {/* 1. Sticky Navbar */}
        <Navbar onBookClick={() => scrollToDemoForm()} />

        <main className="flex-grow">
          {/* 2. Hero Section with Compact Desktop Lead Form */}
          <Hero onBookClick={(c) => scrollToDemoForm(c)} />

          {/* 3. Animated Stats Strip */}
          <StatsStrip />

          {/* 4. Redesigned Courses & Programs with Details Modal */}
          <Courses onSelectCourse={(courseName) => scrollToDemoForm(courseName)} />

          {/* 5. Why Choose Us */}
          <WhyChooseUs onBookClick={() => scrollToDemoForm()} />

          {/* 6. Faculty */}
          <Faculty />

          {/* 7. Results / Toppers Carousel */}
          <Results />

          {/* 8. Student & Parent Testimonials Carousel */}
          <Testimonials />

          {/* 9. Batch Schedule & Fee Overview */}
          <BatchSchedule onSelectBatch={(batchName) => scrollToDemoForm(batchName)} />

          {/* 10. Free Demo Class Booking Section (Main Lead Form) */}
          <DemoBookingForm initialCourse={selectedCourseForForm} />

          {/* 11. FAQ Accordion */}
          <FAQ />

          {/* 12. Contact + Google Maps Embed + Footer */}
          <ContactFooter onBookClick={() => scrollToDemoForm()} />
        </main>

        {/* Persistent Floating WhatsApp & Mobile Action Bar */}
        <FloatingWhatsApp />
        <MobileBottomBar onBookClick={() => scrollToDemoForm()} />

        {/* Notification Widgets */}
        <CourseLaunchPopup
          onReserveCourse={(courseName) => scrollToDemoForm(courseName)}
          isOtherModalOpen={isExitModalOpen}
        />

        <ExitIntentModal
          isOpen={isExitModalOpen}
          onClose={handleCloseExitModal}
          onClaimDemo={() => scrollToDemoForm()}
        />

        <RecentEnquiryToast />
      </div>
    </ToastProvider>
  );
}
