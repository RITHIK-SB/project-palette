# Recreate the reference UI in this project

Port the uploaded **MAHA BINU FIRE FIGHTERS** landing page (from `safety-core.zip`, originally a Next.js export) into this project, replacing the current landing page. Then apply the hero text changes you asked for earlier.

## What gets built

Single-page landing site, matching the reference exactly:

1. **Header** — MAHA BINU logo + wordmark, nav ("AMC Plans", "About") with scroll-spy active state, navy "Contact Us" button.
2. **Hero** — two-column layout, fire alarm panel image right. With your requested edits:
   - Line 2 of heading: **"FREE FIRE SAFTEY HEALTH CHECK UP"** in black (foreground color, not red)
   - Description: "Our certified technicians will visit your facility to perform a thorough, complimentary inspection of your fire protection systems"
   - Primary CTA button: **"Claim free inspection"**
3. **Why Choose section** — heading + 3 feature cards (24/7 Priority Support, Expert Inspections, Total Compliance) with colored top accents.
4. **Quote banner** — full-width warehouse team image.
5. **Registration section** — "Activate Your Free Maintenance Assessment" copy, limited-time-offer callout, and the registration form card (company, contact, designation, mobile, email, building type, submit). Form is front-end only for now (no backend submission).
6. **Footer** — dark footer with company name, legal links, copyright.

## Technical details

- Components recreated as React/TanStack Start components under `src/components/` (SiteHeader, HeroSection, WhyChooseSection, QuoteBanner, RegistrationSection, SiteFooter), wired into `src/routes/index.tsx`.
- Design tokens from the reference `globals.css` (safety red `#a20513`, emergency blue `#1a237e`, alert amber, surface tones, footer dark) ported into `src/styles.css` as Tailwind v4 theme variables.
- Fonts: Hanken Grotesk (body/headings) + Inter (labels) loaded via `<link>` in `src/routes/__root.tsx`.
- Images (`fire-panel.png`, `team-warehouse.png`, logo) brought in as Lovable CDN assets from the zip's `public/images/`.
- Scroll-spy header logic adapted (IntersectionObserver in a `useEffect`).
- Route `head()` updated with proper title/description for the fire safety page.
