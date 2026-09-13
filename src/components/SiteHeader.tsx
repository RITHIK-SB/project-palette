"use client";

const navItems = [
  { id: "about", label: "About", href: "#about" },
];

export function SiteHeader() {

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-2 md:px-4">
        <a href="#" className="flex items-center gap-1" aria-label="MAHA BINU Fire Fighters home">
          <img
            src="/WhatsApp_Image_2026-08-15_at_10.34.51_PM.jpeg"
            alt="MAHA BINU Fire Fighters logo"
            className="h-12 w-12 object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-sans text-base font-extrabold tracking-tight text-primary md:text-lg">
              MAHA BINU FIRE FIGHTERS PVT LTD
            </span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/60 md:text-xs">
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
          className="inline-flex items-center justify-center rounded-md bg-secondary px-5 py-2.5 font-sans text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
