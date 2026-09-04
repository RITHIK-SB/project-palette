"use client";

import { useEffect, useState } from "react";
import logoAsset from "@/assets/maha-binu-logo.png.asset.json";

const navItems = [
  { id: "about", label: "About", href: "#about" },
];

export function SiteHeader() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-2 md:px-4">
        <a href="#" className="flex items-center gap-1" aria-label="MAHA BINU Fire Fighters home">
          <img
            src={logoAsset.url}
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
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActive(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-primary pb-0.5 font-sans text-[15px] font-semibold text-primary"
                    : "border-b-2 border-transparent pb-0.5 font-sans text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground"
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#register"
          className="inline-flex items-center justify-center rounded-md bg-secondary px-5 py-2.5 font-sans text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
