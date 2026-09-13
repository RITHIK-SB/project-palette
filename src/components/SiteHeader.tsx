"use client";

const navItems = [
  { id: "about", label: "About", href: "#about" },
];

export function SiteHeader() {

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-1.5 px-2 md:h-16 md:gap-4 md:px-4">
        <a href="#" className="flex items-center gap-1" aria-label="MAHA BINU Fire Fighters home">
          <img
            src="/WhatsApp_Image_2026-08-15_at_10.34.51_PM.jpeg"
            alt="MAHA BINU Fire Fighters logo"
            className="h-8 w-8 shrink-0 object-contain md:h-12 md:w-12"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-sans text-[11px] font-extrabold tracking-tight text-primary md:text-base md:tracking-tight lg:text-lg">
              MAHA BINU FIRE FIGHTERS PVT LTD
            </span>
            <span className="font-sans text-[9px] font-medium uppercase tracking-[0.15em] text-foreground/60 md:text-[11px] lg:text-xs">
              Your trusted fire safety partner
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="border-b-2 border-transparent pb-0.5 font-sans text-[15px] font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://www.mahabinufirefighters.com/contact-us/#wpcf7-f184-p22-o1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-secondary px-3 py-1.5 font-sans text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/90 md:px-5 md:py-2.5 md:text-sm"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
