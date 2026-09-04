# Plan: Update Contact Us CTA link

## What we're changing
Update the "Contact Us" button in the nav bar so it navigates to the external MAHA BINU website instead of scrolling to the registration section.

## Files to edit
- `src/components/SiteHeader.tsx` — change the `href` on the "Contact Us" anchor from `#register` to `https://www.mahabinufirefighters.com`, and add `target="_blank" rel="noopener noreferrer"` so it opens in a new tab.

## Outcome
Clicking "Contact Us" opens the company's main website in a new tab. The "About" nav item continues to highlight only on click.