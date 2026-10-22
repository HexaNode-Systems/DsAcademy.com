/**
 * ==============================================================================
 * ABC CLASSES - MASTER CONFIGURATION FILE
 * ==============================================================================
 * To re-brand this website for any coaching center in under 10 minutes:
 * 1. Update the institute name, contact details, and location below.
 * 2. Replace the course list, batch timings, and fee structures.
 * 3. Update the faculty members and testimonials.
 * 4. Configure announcements, launch popups, and demoMode.
 * 5. NOTE: Every topper name, score, and testimonial below is SAMPLE DEMO DATA
 *    prepared specifically for prospective coaching clients.
 * ==============================================================================
 */

// Images are imported (not referenced by "/src/..." strings) so Vite fingerprints
// and copies them into the production build. Drop new photos into
// src/assets/images and import them the same way.
import facultyMentorPhoto from '../assets/images/faculty-mentor.webp';
import courseJeeImg from '../assets/images/course-jee.webp';
import courseNeetImg from '../assets/images/course-neet.webp';
import courseFoundationImg from '../assets/images/course-foundation.webp';
import courseDropperImg from '../assets/images/course-dropper.webp';
// Subject illustrations: stand-ins until real faculty / topper photos are supplied.
import facultyBiologyArt from '../assets/images/faculty-biology.svg';
import facultyMathsArt from '../assets/images/faculty-maths.svg';
import facultyChemistryArt from '../assets/images/faculty-chemistry.svg';
import topperJeeArt from '../assets/images/topper-jee.svg';
import topperNeetArt from '../assets/images/topper-neet.svg';
import topperBoardsArt from '../assets/images/topper-boards.svg';

export interface Course {
  id: string;
  name: string;
  category: 'jee' | 'neet' | 'foundation' | 'class9-10';
  badge: string;
  tagBadge?: 'New' | 'Limited Seats' | 'Popular';
  targetExam: string;
  eligibility: string;
  duration: string;
  batchTiming: string;
  mode: string;
  startingFee: string;
  annualFee: string;
  highlights: [string, string, string];
  features: string[];
  syllabusOverview: string[];
  startingDate: string;
  popular?: boolean;
  /** Short code printed on the course cover panel, e.g. "JEE". */
  coverLabel?: string;
  /** Optional real course photo (imported asset). Falls back to the typographic cover. */
  image?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  experience: string;
  photoUrl: string;
  specialization: string;
}

export interface ResultTopper {
  id: string;
  name: string;
  exam: string;
  scoreOrRank: string;
  percentile?: string;
  institutionJoined: string;
  year: string;
  photoUrl: string;
  quote?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  type: 'student' | 'parent';
  rating: number;
  highlight: string;
}

export interface BatchItem {
  id: string;
  category: 'jee' | 'neet' | 'foundation';
  name: string;
  target: string;
  startDate: string;
  days: string;
  timeSlot: string;
  mode: string;
  feePerYear: string;
  installmentAvailable: boolean;
  seatsLeft: number;
  scholarshipAvailable: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface SampleEnquiry {
  studentName: string;
  city: string;
  course: string;
  timeAgo: string;
}

export const siteConfig = {
  // Brand Basics
  name: "ABC Classes",
  shortName: "ABC",
  legalName: "ABC Career Institute Pvt. Ltd.",
  tagline: "Building Top 100 Ranks with Concept Clarity & Disciplined Practice",
  subTagline:
    "North India's trusted coaching institute for IIT-JEE (Main + Advanced), NEET-UG, CBSE Boards, and Olympiad Foundation. Small batches of 30, ex-IITian faculty, and daily 1-on-1 doubt clinics.",

  // Top Bar Brand Lockup
  logo: {
    text: "ABC",
    suffix: "CLASSES",
    motto: "Excellence in Coaching",
  },

  // ---------------------------------------------------------------------------
  // 1. NOTIFICATION SYSTEM CONFIGURATION
  // ---------------------------------------------------------------------------

  // a) Top Announcement Bar (with optional countdown timer)
  announcement: {
    enabled: true,
    badge: "Phase 1 Admissions",
    text: "Early Bird 90% Scholarship Aptitude Test registrations close soon.",
    ctaLabel: "Enroll Now",
    ctaHref: "#demo-form",
    // ISO date string in the future for countdown timer (e.g. 14 days from current date)
    // When endsAt passes, the announcement bar automatically hides itself
    endsAt: "2026-11-15T23:59:59+05:30",
  },

  // b) Course Launch Slide-in / Popup
  launchCourse: {
    enabled: true,
    badge: "New Intensive Batch",
    title: "NEET 2027 Medical Achievers Fast-Track",
    startDate: "April 20, 2026",
    seatsLeft: 7,
    benefit: "Direct mentoring by ex-AIIMS doctors with daily OMR speed & accuracy drilling.",
    targetExam: "NEET-UG & AIIMS",
    courseName: "NEET-UG Medical Achievers",
  },

  // c) Social Proof Enquiries (demoMode = true shows sample enquiries with "Sample" badge)
  // Set demoMode: false to cleanly disable this widget for production without real data.
  demoMode: true,
  sampleEnquiries: [
    { studentName: "Pooja S.", city: "Delhi", course: "IIT-JEE 2-Year Program", timeAgo: "8m ago" },
    { studentName: "Kartik M.", city: "Noida", course: "NEET Medical Achievers", timeAgo: "21m ago" },
    { studentName: "Ananya R.", city: "Gurugram", course: "Class 10 Foundation & NTSE", timeAgo: "34m ago" },
    { studentName: "Devansh K.", city: "Faridabad", course: "JEE Dropper Repeater", timeAgo: "52m ago" },
  ] as SampleEnquiry[],

  // Trust Markers
  trustChips: [
    "Max 30 Students Per Batch",
    "Ex-IITian & AIIMS Mentor Faculty",
    "Daily 1-on-1 Doubt Counters",
    "All-India Weekly Test Analytics",
    "Up to 90% Merit Scholarships",
  ],

  // Contact Details
  contact: {
    phone: "+91 98765 43210",
    phoneRaw: "+919876543210",
    whatsappNumber: "919876543210",
    whatsappDisplay: "+91 98765 43210",
    email: "admissions@abcclasses.example.in",
    address: "Plot 42, Education Hub, Sector 14, Near Metro Station, New Delhi - 110001",
    landmark: "Opposite City Central Library, Gate No. 2",
    timings: "Mon - Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 2:00 PM",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9962386227926!2d77.216721!3d28.630045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0450897%3A0x8ffdda482a0d922!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },

  // Color Hex references (used across dynamic components)
  // The full token set lives in src/index.css (@theme). Keep these in sync if you rebrand.
  colors: {
    ink: "#111827",
    inkSecondary: "#475569",
    accent: "#2563EB",
    accentStrong: "#1D4ED8",
    night: "#0B1220",
    line: "#E2E8F0",
    surfaceAlt: "#F5F7FA",
    success: "#15803D",
    marker: "#F59E0B",
  },

  // What happens after a family books a demo (shown as the step-by-step journey
  // in the booking section). Every step restates a promise made elsewhere in this file.
  demoJourney: [
    {
      title: "Book in under a minute",
      description: "Use the form or WhatsApp. Pick a course and a preferred time slot.",
    },
    {
      title: "Counsellor confirms within 24 hours",
      description: "One call to the parent number to fix the reporting time. No spam.",
    },
    {
      title: "Full 2-hour classroom lecture",
      description: "Sit in an actual batch and experience the concept-first teaching method.",
    },
    {
      title: "Free diagnostic learning report",
      description: "Our director assesses foundational gaps in math and science.",
    },
    {
      title: "Take home a sample study pack",
      description: "Actual class modules and a solved formula sheet.",
    },
  ],

  // ---------------------------------------------------------------------------
  // SAMPLE DATA NOTICE: All figures below are realistic placeholder metrics.
  // Replace these with your institute's actual verified track record.
  // ---------------------------------------------------------------------------
  stats: [
    {
      label: "Students Trained",
      value: 12500,
      suffix: "+",
      description: "Across classroom and hybrid coaching programs",
    },
    {
      label: "Years of Academic Track Record",
      value: 14,
      suffix: "+",
      description: "Continuous guidance since foundation in 2010",
    },
    {
      label: "Selections in IIT-JEE & NEET",
      value: 3450,
      suffix: "+",
      description: "Admitted into Top IITs, NITs, and Govt. Medical Colleges",
    },
    {
      label: "Top 1000 All India Ranks",
      value: 280,
      suffix: "+",
      description: "Consistently producing city and state toppers",
    },
  ],

  // ---------------------------------------------------------------------------
  // COURSES & PROGRAMS (Redesigned with equal heights, 3 highlights & details)
  // ---------------------------------------------------------------------------
  courses: [
    {
      id: "iit-jee-2yr",
      image: courseJeeImg,
      coverLabel: "JEE",
      name: "IIT-JEE 2-Year Pinnacle Program",
      category: "jee",
      badge: "Class 11 & 12",
      tagBadge: "Popular",
      targetExam: "JEE Main + Advanced",
      eligibility: "Students moving to Class 11",
      duration: "2 Academic Years",
      batchTiming: "Evening (4:00 PM – 7:30 PM)",
      mode: "Offline Classroom",
      startingFee: "₹1,25,000 / yr",
      annualFee: "₹1,25,000 / year",
      highlights: [
        "1,200+ hours of live classroom lectures by ex-IITians",
        "Chapter-wise graded modules (Level 1, Level 2 & JEE Adv)",
        "Daily 2-hour physical doubt clearing counters",
      ],
      features: [
        "Complete coverage of Class 11 & 12 PCM syllabus with board synchronization",
        "Fortnightly CBT-format mock tests with All-India percentile analysis",
        "Exclusive archives of past 15 years chapter-wise solved JEE papers",
        "Personal academic mentor assigned for weekly progress reviews",
      ],
      syllabusOverview: [
        "Physics: Kinematics, Newtonian Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics",
        "Chemistry: Physical Chemistry (Equilibrium, Kinetics), Organic Reaction Mechanisms, Inorganic Periodic Trends",
        "Mathematics: Calculus, Coordinate Geometry, Vectors & 3D, Complex Numbers, Probability",
      ],
      popular: true,
      startingDate: "April 15, 2026",
    },
    {
      id: "neet-ug-2yr",
      image: courseNeetImg,
      coverLabel: "NEET",
      name: "NEET-UG Medical Achievers",
      category: "neet",
      badge: "Class 11 & 12",
      tagBadge: "Limited Seats",
      targetExam: "NEET-UG & AIIMS Eligibility",
      eligibility: "Students moving to Class 11",
      duration: "2 Academic Years",
      batchTiming: "Morning (8:30 AM – 12:30 PM)",
      mode: "Offline Classroom",
      startingFee: "₹1,20,000 / yr",
      annualFee: "₹1,20,000 / year",
      highlights: [
        "100% NCERT line-by-line deconstruction in Biology",
        "High-yield Physics and Chemistry numerical drills",
        "Weekly OMR-based speed and negative marking tests",
      ],
      features: [
        "Specialist doctors and AIIMS mentors for medical guidance",
        "Dedicated botanical & anatomical specimen visual aids",
        "All-India rank predictor and speed-enhancing test software",
        "Stress management and time-allocation workshops",
      ],
      syllabusOverview: [
        "Biology: Diversity in Living World, Human Physiology, Genetics & Evolution, Biotechnology, Ecology",
        "Physics: Units & Measurement, Laws of Motion, Work Energy Power, Waves, Electrostatics, Magnetic Effects",
        "Chemistry: Structure of Atom, Chemical Bonding, States of Matter, Coordination Compounds, Biomolecules",
      ],
      popular: true,
      startingDate: "April 20, 2026",
    },
    {
      id: "foundation-junior",
      image: courseFoundationImg,
      coverLabel: "9–10",
      name: "Pre-Foundation & Olympiad (9th & 10th)",
      category: "class9-10",
      badge: "Class 9 & 10",
      tagBadge: "New",
      targetExam: "CBSE Boards, NTSE, PRMO, Olympiads",
      eligibility: "Students moving to Class 9 & 10",
      duration: "1 or 2 Years",
      batchTiming: "Alternate Days (4:30 PM – 7:00 PM)",
      mode: "Offline Classroom",
      startingFee: "₹75,000 / yr",
      annualFee: "₹75,000 / year",
      highlights: [
        "Rock-solid basic concepts in Math and Sciences",
        "Mental Ability & Logical Reasoning analytical training",
        "Strict board exam subjective answer-writing practice",
      ],
      features: [
        "Early start advantage for future competitive exams",
        "Regular Olympiad workshops for RMO, IOQJS, and NTSE",
        "School syllabus synchronized to ensure 95%+ in school exams",
        "Engaging laboratory demonstration sessions",
      ],
      syllabusOverview: [
        "Science: Motion, Gravitation, Work & Energy, Chemical Reactions, Carbon Compounds, Heredity & Life Processes",
        "Mathematics: Number Systems, Polynomials, Coordinate Geometry, Triangles, Trigonometry, Statistics",
        "Mental Ability: Series Completion, Blood Relations, Syllogisms, Pattern Folding, Coding-Decoding",
      ],
      popular: false,
      startingDate: "May 2, 2026",
    },
    {
      id: "dropper-ranker",
      image: courseDropperImg,
      coverLabel: "12+",
      name: "JEE / NEET Dropper Repeater Batch",
      category: "jee",
      badge: "12th Passed",
      tagBadge: "Limited Seats",
      targetExam: "Target JEE / NEET 2027",
      eligibility: "12th Passed / Drop Year Students",
      duration: "1 Academic Year",
      batchTiming: "Full Day (9:00 AM – 3:30 PM)",
      mode: "Intensive Classroom",
      startingFee: "₹1,15,000 / yr",
      annualFee: "₹1,15,000 / year",
      highlights: [
        "Complete 2-year syllabus revision in 8 disciplined months",
        "3,500+ selected high-probability question drills",
        "Every Sunday CBT/OMR mock tests with micro-analytics",
      ],
      features: [
        "Supervised silent library with dedicated individual study carrels",
        "Daily scheduled doubt hours with lead academic directors",
        "Speed-enhancement and negative-marking mitigation strategies",
        "Bi-weekly motivation and performance calibration sessions",
      ],
      syllabusOverview: [
        "Accelerated Phase 1: Complete Class 11 core principles mastery (April to July)",
        "Accelerated Phase 2: Class 12 advance topics & multi-concept integration (August to November)",
        "Phase 3: All-India Test Series & rigorous full-length simulated drills (December to March)",
      ],
      popular: false,
      startingDate: "June 10, 2026",
    },
  ] as Course[],

  // ---------------------------------------------------------------------------
  // WHY CHOOSE US - 6 CONCRETE PILLARS
  // ---------------------------------------------------------------------------
  whyChooseUs: [
    {
      id: "small-batches",
      title: "Strict Max 30 Batch Cap",
      description:
        "Unlike commercial factories packing 150+ students in a hall, our teachers know every student by name and track individual learning gaps every week.",
      iconName: "Users",
    },
    {
      id: "faculty-pedagogy",
      title: "Ex-IITian & Medico Mentors",
      description:
        "Senior faculties with an average of 12+ years teaching experience who have cracked the exam themselves and know the exact traps students face.",
      iconName: "GraduationCap",
    },
    {
      id: "doubt-counters",
      title: "1-on-1 Daily Doubt Counters",
      description:
        "No question goes unanswered. Faculty stays back 2 hours after every class for personalized doubt clearance on physical blackboards.",
      iconName: "HelpCircle",
    },
    {
      id: "test-analytics",
      title: "National Benchmarking & Analytics",
      description:
        "Computer-based tests identical to actual NTA patterns with deep diagnostic reports on accuracy, question time distribution, and negative marking.",
      iconName: "BarChart3",
    },
    {
      id: "printed-curriculum",
      title: "Researched Comprehensive Material",
      description:
        "Thoroughly revised booklets with theory, solved examples, multi-concept exercises, and previous 15 years' questions segregated chapter-wise.",
      iconName: "BookOpen",
    },
    {
      id: "parent-partnership",
      title: "Bi-Weekly Parent Progress Reports",
      description:
        "Automated attendance alerts, test score SMS updates, and scheduled one-on-one parent-teacher consultations every month.",
      iconName: "ShieldCheck",
    },
  ],

  // ---------------------------------------------------------------------------
  // FACULTY (SAMPLE DATA - Replace with your institute's teachers)
  // ---------------------------------------------------------------------------
  faculty: [
    {
      id: "f1",
      name: "Er. Rameshwar Verma",
      role: "Head of Physics & Academic Director",
      subject: "Physics (Mechanics & Electrodynamics)",
      qualification: "B.Tech, IIT Roorkee",
      experience: "16+ Years Experience",
      photoUrl: facultyMentorPhoto,
      specialization: "Mentored 120+ Top 500 JEE Advanced Rankers",
    },
    {
      id: "f2",
      name: "Dr. Ananya Mukherjee",
      role: "Head of Medical Sciences",
      subject: "Biology (Zoology & Genetics)",
      qualification: "MBBS, AIIMS New Delhi",
      experience: "12+ Years Experience",
      photoUrl: facultyBiologyArt, // Illustration placeholder: swap for a real photo
      specialization: "Specialist in NCERT High-Yield Deconstructions",
    },
    {
      id: "f3",
      name: "Er. Sandeep Agarwal",
      role: "Senior Mathematics Specialist",
      subject: "Mathematics (Calculus & Coordinate Geometry)",
      qualification: "B.Tech, IIT Delhi",
      experience: "14+ Years Experience",
      photoUrl: facultyMathsArt,
      specialization: "Shortcut logic and algebraic visualization",
    },
    {
      id: "f4",
      name: "Dr. Priya Deshmukh",
      role: "Senior Faculty, Chemistry",
      subject: "Organic & Physical Chemistry",
      qualification: "Ph.D., Institute of Chemical Technology (ICT)",
      experience: "11+ Years Experience",
      photoUrl: facultyChemistryArt,
      specialization: "Mechanism-first approach to complex Organic synthesis",
    },
  ] as FacultyMember[],

  // ---------------------------------------------------------------------------
  // RESULTS / TOPPERS (SAMPLE DATA - Replace with your institute's toppers)
  // ---------------------------------------------------------------------------
  results: [
    {
      id: "t1",
      name: "Aarav Singhania",
      exam: "JEE Advanced 2024",
      scoreOrRank: "AIR 47",
      percentile: "99.98 %ile in JEE Main",
      institutionJoined: "IIT Bombay (Computer Science)",
      year: "2024",
      // Subject illustration placeholder. Replace with a real photo of the actual topper.
      photoUrl: topperJeeArt,
      quote: "The small batch size at ABC Classes ensured the teachers pinpointed my silly errors in Physics right from Class 11.",
    },
    {
      id: "t2",
      name: "Kavya Menon",
      exam: "NEET-UG 2024",
      scoreOrRank: "710 / 720",
      percentile: "AIR 112",
      institutionJoined: "AIIMS New Delhi",
      year: "2024",
      photoUrl: topperNeetArt,
      quote: "Daily NCERT line drills in Biology and the doubt clinic after every mock test gave me the confidence to score 710.",
    },
    {
      id: "t3",
      name: "Rohan Kulkarni",
      exam: "JEE Advanced 2024",
      scoreOrRank: "AIR 164",
      percentile: "99.92 %ile in JEE Main",
      institutionJoined: "IIT Delhi (Electrical Engg)",
      year: "2024",
      photoUrl: topperJeeArt,
      quote: "The problem-solving sets for Calculus were unmatched. It felt like solving actual JEE papers months in advance.",
    },
    {
      id: "t4",
      name: "Diya Sharma",
      exam: "CBSE Class 12 Boards + JEE",
      scoreOrRank: "98.4% Boards",
      percentile: "AIR 890 (JEE Adv)",
      institutionJoined: "IIT Roorkee (Data Science)",
      year: "2024",
      photoUrl: topperBoardsArt,
      quote: "Balancing school boards with competitive prep was stress-free thanks to ABC Classes' integrated timetable.",
    },
    {
      id: "t5",
      name: "Tushar Bhatnagar",
      exam: "NEET-UG 2024",
      scoreOrRank: "695 / 720",
      percentile: "AIR 415",
      institutionJoined: "Maulana Azad Medical College (MAMC)",
      year: "2024",
      photoUrl: topperNeetArt,
      quote: "The test analytics showed me I was losing 20 marks in Physics rotational motion. Two doubt sessions fixed it completely.",
    },
  ] as ResultTopper[],

  // ---------------------------------------------------------------------------
  // TESTIMONIALS (SAMPLE DATA - Replace with genuine parent & student feedback)
  // ---------------------------------------------------------------------------
  testimonials: [
    {
      id: "test-1",
      author: "Mr. Rajendra Singhania",
      role: "Father of Aarav Singhania (AIR 47, IIT Bombay)",
      type: "parent",
      rating: 5,
      highlight: "Individual attention makes the true difference",
      quote:
        "When Aarav moved to Class 11, we were terrified by big coaching factories having 200 kids in one classroom. Joining ABC Classes was the best decision. His mentors called us proactively whenever his scores dipped and guided him with genuine empathy.",
    },
    {
      id: "test-2",
      author: "Kavya Menon",
      role: "Student (Scored 710/720 in NEET 2024, now at AIIMS)",
      type: "student",
      rating: 5,
      highlight: "Zero hesitation in asking silly doubts",
      quote:
        "In school, I was always shy to raise my hand. At ABC Classes, the teachers sat with me on the doubt bench until I solved every numerical myself. That personal connection kept me motivated during stressful months.",
    },
    {
      id: "test-3",
      author: "Mrs. Meenakshi Sundaram",
      role: "Mother of Aditya (Class 10 Foundation Batch)",
      type: "parent",
      rating: 5,
      highlight: "Built genuine love for Mathematics and Science",
      quote:
        "Aditya used to cram formulas for school exams. The foundation batch at ABC Classes transformed how he views problem-solving. He qualified for the Regional Mathematical Olympiad this year without feeling overburdened.",
    },
    {
      id: "test-4",
      author: "Nikhil Joshi",
      role: "Student (AIR 640 JEE Adv 2024, IIT Kanpur)",
      type: "student",
      rating: 5,
      highlight: "Realistic mock tests matching NTA standards",
      quote:
        "The computer-based test platform at ABC Classes simulated the real JEE exam pressure. On the actual exam day, it felt like just another Sunday test at the center.",
    },
  ] as Testimonial[],

  // ---------------------------------------------------------------------------
  // BATCH SCHEDULES & FEE OVERVIEW
  // ---------------------------------------------------------------------------
  batchSchedules: [
    {
      id: "b1",
      category: "jee",
      name: "Target JEE Advanced 2026 (Two-Year)",
      target: "Class 11 Moving Students",
      startDate: "April 15, 2026",
      days: "Mon, Wed, Fri + Sun Test",
      timeSlot: "4:00 PM – 7:30 PM",
      mode: "Offline Classroom",
      feePerYear: "₹1,25,000",
      installmentAvailable: true,
      seatsLeft: 7,
      scholarshipAvailable: "Up to 90% via ABC-SAT Test",
    },
    {
      id: "b2",
      category: "jee",
      name: "JEE Crash Course & Test Series",
      target: "Class 12 Appearing",
      startDate: "Nov 10, 2026",
      days: "Daily 4 Hours",
      timeSlot: "3:30 PM – 7:30 PM",
      mode: "Classroom / Hybrid",
      feePerYear: "₹45,000 (Full Course)",
      installmentAvailable: false,
      seatsLeft: 12,
      scholarshipAvailable: "Up to 50% for 90%+ in 10th",
    },
    {
      id: "b3",
      category: "neet",
      name: "NEET Medical Achievers (Two-Year)",
      target: "Class 11 Moving Students",
      startDate: "April 20, 2026",
      days: "Tue, Thu, Sat + Sun Test",
      timeSlot: "8:30 AM – 12:30 PM",
      mode: "Offline Classroom",
      feePerYear: "₹1,20,000",
      installmentAvailable: true,
      seatsLeft: 5,
      scholarshipAvailable: "Up to 90% via ABC-SAT Test",
    },
    {
      id: "b4",
      category: "neet",
      name: "NEET Repeater Dropper Intensive",
      target: "12th Passed Students",
      startDate: "June 10, 2026",
      days: "Mon to Sat (Full-Day)",
      timeSlot: "9:00 AM – 3:30 PM",
      mode: "Offline Classroom",
      feePerYear: "₹1,15,000",
      installmentAvailable: true,
      seatsLeft: 9,
      scholarshipAvailable: "Merit concessions for NEET 550+ scorers",
    },
    {
      id: "b5",
      category: "foundation",
      name: "Class 9 & 10 Olympiad Foundation",
      target: "Class 9th & 10th Students",
      startDate: "May 2, 2026",
      days: "Tue, Thu, Sat",
      timeSlot: "4:30 PM – 7:00 PM",
      mode: "Offline Classroom",
      feePerYear: "₹75,000",
      installmentAvailable: true,
      seatsLeft: 8,
      scholarshipAvailable: "Up to 75% on school marksheet",
    },
  ] as BatchItem[],

  // ---------------------------------------------------------------------------
  // FAQS
  // ---------------------------------------------------------------------------
  faqs: [
    {
      category: "Admissions",
      question: "How do I book a free demo class at ABC Classes?",
      answer:
        "You can book instantly using the free demo booking form on this page or by clicking our WhatsApp chat button. Our academic counselor will reach out within 24 hours to confirm your subject choice and schedule your slot on either a weekday or Saturday.",
    },
    {
      category: "Academics",
      question: "What is your average batch size and how are doubts handled?",
      answer:
        "We strictly cap each batch at 30 students to maintain personal accountability. After every lecture, our teachers remain at the center for 2 full hours of dedicated doubt sessions. Students can also book 1-on-1 slots anytime with their mentors.",
    },
    {
      category: "Scholarships",
      question: "Is there a scholarship test or fee concession available?",
      answer:
        "Yes! We conduct the ABC Scholarship Aptitude Test (ABC-SAT) every Sunday. Depending on your performance, you can qualify for up to 90% fee waiver on tuition. We also offer direct concessions for siblings and children of defense personnel.",
    },
    {
      category: "Study Material",
      question: "Do you provide printed study material and test series?",
      answer:
        "Yes, all enrolled students receive comprehensive printed study modules divided into theory, solved illustrations, graded exercises (Exercise 1 to Exercise 4), and past 15 years' chapter-wise solved papers, along with free access to our online CBT testing portal.",
    },
    {
      category: "Hostel & Transport",
      question: "Do you have hostel facilities for outstation students?",
      answer:
        "We partner with verified, safe boys' and girls' student hostels located within a 500-meter radius of our center. These provide hygienic food, biometric security, air conditioning, and quiet study rooms.",
    },
    {
      category: "Fees & Refund",
      question: "What is the fee payment structure and refund policy?",
      answer:
        "Fees can be paid in convenient 2 to 3 interest-free installments. We also maintain a transparent 14-day cooling-off refund policy from the commencement date of the batch, as per standard consumer educational guidelines.",
    },
  ] as FAQItem[],

  // Social Media Links
  socialLinks: {
    youtube: "https://youtube.com/@abcclasses_demo",
    instagram: "https://instagram.com/abcclasses_demo",
    facebook: "https://facebook.com/abcclasses_demo",
    telegram: "https://t.me/abcclasses_notes",
  },
};
