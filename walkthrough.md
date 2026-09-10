# Fracspace Website Redesign & Static Build Walkthrough

## 1. Overview
The Fracspace website has been completely redesigned in accordance with the designs from the `RedesignFsWebsite/` package, while strictly keeping the **Each Property** page (`app/eachproperty/page.jsx`) in its original design and interactive API-driven architecture.

The site is configured for static export (`output: "export"`) with Netlify drop compatibility in the `out/` folder.

---

## 2. Redesigned Pages & Components

### A. Global Layout & Header / Footer
- **Navbar** ([`Navbar.jsx`](file:///c:/Users/vishn/OneDrive/Documents/FracspaceAdminDashboard/FracspaceMain/fracspace/components/layouts/Navbar.jsx)):
  - Redesigned matching `Site Nav.dc.html` with deep navy background (`#0B2452`), active link route detection (`usePathname()`), mobile slide drawer, and "Download App" action modal trigger.
- **Footer** ([`Footer.jsx`](file:///c:/Users/vishn/OneDrive/Documents/FracspaceAdminDashboard/FracspaceMain/fracspace/components/layouts/Footer.jsx)):
  - Redesigned 4-column navy gradient layout matching design specifications with quick navigation, social links, contact numbers, email, address, and legal links.
- **Floating Widgets & App Modal** ([`FloatingWidgets.jsx`](file:///c:/Users/vishn/OneDrive/Documents/FracspaceAdminDashboard/FracspaceMain/fracspace/components/ui/FloatingWidgets.jsx), [`FracspaceAppModal.jsx`](file:///c:/Users/vishn/OneDrive/Documents/FracspaceAdminDashboard/FracspaceMain/fracspace/components/ui/FracspaceAppModal.jsx)):
  - Floating circular buttons with quick investment enquiry form, interactive WhatsApp helper popup, and modal with QR code scanner and App Store / Google Play buttons.

### B. Homepage (`/`)
- Matching `Fracspace Home.dc.html`:
  1. **Hero Section**: Radial-gradient luxury hero with live metrics (`200+ Properties`, `15+ Locations`, `300+ Investors`, `8–12% Target ROI`).
  2. **In The News**: "Recognised. Reported. Growing." featuring Forbes India, Deccan Chronicle, and The Interview World.
  3. **Concept of Co-Ownership**: "What if you didn't have to own it all?" featuring the 100% property fractional shares breakdown visualization (`Investor A 25%`, `Investor B 28%`, `Investor C 22%`, `Investor D 25%`).
  4. **How It Works**: 4-step cards (`01 Choose property`, `02 Invest in fraction`, `03 Earn rental income`, `04 Exit anytime`).
  5. **Places Worth Owning (Featured Properties)**: Filter tabs by region with real-time property cards linking to `/eachproperty?id=...`.
  6. **Why Invest with Fracspace**: Benefits breakdown (`Secure legal structure`, `Fully managed assets`, `Dual income stream`, `Complimentary stays`).
  7. **How To Invest**: 4-step investor onboarding timeline with app download CTA.
  8. **Testimonials**: Verified investor reviews (Mahesh Kothari, Mitali Dewal, Bhargav Ram).
  9. **Investor Video Stories**: Video cards with play triggers.
  10. **Ideas for Smarter Ownership**: Blog highlights linking to `/blogs`.
  11. **FAQ Accordion**: 5 expandable questions and answers.
  12. **App Download Banner**: QR code and store links.

### C. About Us (`/about`)
- Matching `Fracspace About.dc.html`:
  1. **About Hero**: "Redefining how India invests in real estate" with direct CTAs.
  2. **Who We Are**: Detailed narrative with statistical milestones.
  3. **Our Vision**: "Ownership defined by trust, not by capital".
  4. **Our Mission**: 4 core pillars (`Transparency`, `Security`, `Accessibility`, `Long-term value`).
  5. **Visionary in Chief**: Feature on Founder **Unnath Reddy** with photo and bio.
  6. **Our Team**: Department tabs (`All`, `Business & Sales`, `Marketing`, `Tech`, `Hospitality`, `House`) with team member cards and LinkedIn profile links.

### D. Properties Listing (`/properties`)
- Matching `Fracspace Properties.dc.html`:
  1. **Properties Hero**: Live metrics and overview.
  2. **Filter & Sort Toolbar**: Destination tabs (`View All`, `Kerala`, `Karnataka`, `Varanasi`, `Hyderabad`, `Goa`) with counts and sort controls (`Newest`, `Price`, `Yield`).
  3. **Property Cards**: Showing fraction prices, yields, tags, and subscription progress bars, each linking directly to `/eachproperty?id=...`.
  4. **Vetting Process**: 4 selection criteria (`Destination demand`, `Title & legal`, `Yield modelling`, `Operator quality`).
  5. **Reserve Fraction CTA**: Consultation and app download banner.

### E. Contact Us (`/contact`)
- Matching `Fracspace Contact.dc.html`:
  1. **Hero**: Response time stats (`< 24h`, `15+ Locations`, `100% Human support`).
  2. **3 Contact Channels**: Direct phone call, email, and Google Maps direction cards.
  3. **Interactive Form**: Inquiry form with topic selection connected to backend API.
  4. **Headquarters Card**: Jubilee Hills Hyderabad office details, operating hours, and visit policy.
  5. **Pre-contact FAQs**: Common queries before reaching out.

### F. Blogs Page (`/blogs`)
- Matching `Fracspace Blogs.dc.html`:
  1. **Hero**: Category filter tabs (`All topics`, `Guides`, `Co-ownership`, `Market trends`, `Tax & Legal`, `Destinations`).
  2. **Lead Featured Guide**: "What is fractional real estate investment? A complete guide for Indian investors".
  3. **Articles Grid**: Rich cards with tags, read times, and summaries.
  4. **Newsletter Subscription Banner**: Email subscription box.

### G. Each Property Page (`/eachproperty?id=...`)
- **Maintained without changes** per requirement, ensuring existing API integration, image sliders, fraction calculator, and enquiry flows remain intact.

---

## 3. Build & Deployment Verification
- **Build Command**: `npm run build`
- **Build Status**: **SUCCESS (Code 0)**
- **Static Output Folder**: `out/`
- **Netlify Drag-and-Drop Ready**:
  - `out/index.html` (Home)
  - `out/about/index.html` (About)
  - `out/properties/index.html` (Properties)
  - `out/contact/index.html` (Contact)
  - `out/blogs/index.html` (Blogs)
  - `out/eachproperty/index.html` (Each Property)
  - `out/_redirects` (Contains 301 redirects for `/about-us`, `/aboutus`, `/contact-us`, `/contactus`, etc.)
