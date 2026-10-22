# ABC Classes — High-Converting Coaching Institute Demo Template

A premium, production-grade website template designed specifically for coaching institutes in India preparing students for **IIT-JEE (Main + Advanced)**, **NEET-UG**, **CBSE Boards**, and **Junior Olympiad Foundations**.

Built as a live, client-ready sales demo to showcase to coaching institute owners, academic directors, and founders.

---

## ⚡ Key Highlights

- **Re-Skinnable in Under 10 Minutes**: All institute branding, faculty, results, courses, batch schedules, fees, FAQs, contact details, notifications, and theme colors are centralized in a single file: `src/config/site.ts`.
- **Zero-Backend Architecture**: Lead capture form submits directly to [Web3Forms](https://web3forms.com) (free key) with zero server maintenance.
- **WhatsApp Click-to-Chat Fallback**: Pre-fills the prospective student's details, selected course, and demo slot dynamically on `wa.me`.
- **Notification & Conversion Engine**:
  - **Announcement Bar**: Top banner with real countdown timer (`endsAt`), smooth dismissal, and `sessionStorage` memory.
  - **New Course Launch Slide-in**: Triggers after ~8s or 40% scroll, showing seats remaining, one-click pre-fill demo booking, with typing guards and Esc handling.
  - **Exit-Intent / Inactivity Prompt**: Desktop modal capturing abandoning users with a 1-day free trial pass.
  - **Recent Enquiry Toast**: Controlled by `demoMode: true/false`. Displays sample enquiries marked with an explicit "Sample" badge. When `demoMode: false`, completely disabled for production.
- **Equal-Height Course Cards**: 3 short bullet highlights, "Starting at" fees, "Enroll / Book Demo" pre-fill, and interactive "Details" modal showing complete syllabus breakdown.
- **Desktop Compact Hero Lead Form**: Instant name + 10-digit mobile + course selector directly above the fold.
- **Strict Anti-Slop Design**: Domain-native typography (Plus Jakarta Sans headings + Inter body), 3-zone top bar contract, WCAG AA contrast, unboxed metadata, and high-impact visual assets.
- **Mobile-First Conversion Engine**: Capped mobile sticky bottom bar (`<15%` screen height) with one-tap Call and WhatsApp actions.
- **Built-in UTM & Click Tracking**: Automatically captures `utm_source`, `utm_medium`, `utm_campaign` with lead submissions, and logs events via `track()`.

---

## 🚀 How to Rebrand & Configure in 10 Minutes

Open `src/config/site.ts`. All options are organized cleanly in the exported `siteConfig` object:

### 1. Notification System

```typescript
// a) Announcement Bar (Top of page)
announcement: {
  enabled: true,                       // Set false to hide completely
  badge: "Phase 1 Admissions",
  text: "Early Bird 90% Scholarship Aptitude Test registrations close soon.",
  ctaLabel: "Enroll Now",
  ctaHref: "#demo-form",
  endsAt: "2026-11-15T23:59:59+05:30", // ISO date string for real countdown timer
},

// b) Course Launch Slide-in Card
launchCourse: {
  enabled: true,                       // Set false to disable popup
  badge: "New Intensive Batch",
  title: "NEET 2027 Medical Achievers Fast-Track",
  startDate: "April 20, 2026",
  seatsLeft: 7,
  benefit: "Direct mentoring by ex-AIIMS doctors with daily OMR speed & accuracy drilling.",
  targetExam: "NEET-UG & AIIMS",
  courseName: "NEET-UG Medical Achievers", // Automatically pre-fills form
},

// c) Social Proof Enquiries
// Set to false for client production if no real live stream data is configured
demoMode: true,
sampleEnquiries: [
  { studentName: "Pooja S.", city: "Delhi", course: "IIT-JEE 2-Year Program", timeAgo: "8m ago" },
  ...
]
```

### 2. Basic Brand Identity & Contact

```typescript
name: "Your Coaching Center Name",
legalName: "Your Registered Company Pvt. Ltd.",
tagline: "Your Punchy Outcome-Focused Headline",

contact: {
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsappNumber: "919876543210", // 10-12 digits without '+' or spaces
  email: "admissions@yourinstitute.com",
  address: "Your Center Full Address, City, State - PIN",
  timings: "Mon - Sat: 8:00 AM – 8:00 PM",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=..."
}
```

### 3. Courses, Batches, Faculty & Results

```typescript
courses: [...],        // Equal-height cards with duration, timing, startingFee, 3 highlights & syllabusOverview
faculty: [...],        // Faculty names, degrees (IIT/AIIMS), and experience
results: [...],        // Verified toppers (AIR ranks, scores) - currently sample data
testimonials: [...],   // Parent and student reviews with 5-star ratings
batchSchedules: [...], // Batch dates, time slots, and seats remaining
faqs: [...]            // Institute-specific admission FAQs
```

---

## 🛠️ Environment Variables

Create a `.env` file or set in your hosting provider's dashboard:

```env
# Optional: Web3Forms access key for real email lead delivery.
# Get your free key at https://web3forms.com in 30 seconds.
# If left empty, the website runs in Demo Mode with graceful simulated submissions.
VITE_WEB3FORMS_ACCESS_KEY="your-access-key-here"
```

---

## 📦 Local Development & Verification

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle (dist/ folder)
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Cloudflare Pages or Netlify

### Cloudflare Pages
1. Push your repository to GitHub / GitLab.
2. In Cloudflare Dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select this repository.
4. Set Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Under Environment variables, add `VITE_WEB3FORMS_ACCESS_KEY`.
6. Click **Save and Deploy**.

### Netlify
1. Go to **Netlify** → **Add new site** → **Import an existing project**.
2. Set Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add `VITE_WEB3FORMS_ACCESS_KEY` under Site configuration → Environment variables.
4. Click **Deploy Site**.
