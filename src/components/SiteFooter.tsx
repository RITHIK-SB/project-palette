const links = ["Privacy Policy", "Terms of Service", "Safety Standards", "Expo 2026"];

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="max-w-sm">
            <h2 className="font-sans text-xl font-bold leading-snug text-white">
              MAHA BINU FIRE FIGHTERS.PVT.LTD
            </h2>
            <p className="mt-4 text-pretty font-sans text-sm leading-relaxed text-footer-foreground/80">
              Engineering safer environments through rigorous standards and unwavering commitment to
              protection.
            </p>
          </div>

          <div>
            <h3 className="font-label text-sm font-bold text-white">Legal &amp; Resources</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {links.map((link, i) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`font-sans text-sm transition-colors hover:text-white ${
                      i === links.length - 1
                        ? "font-semibold text-white underline underline-offset-4"
                        : "text-footer-foreground/80"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="font-sans text-xs leading-relaxed text-footer-foreground/70">
            &copy; 2026 MAHA BINU FIRE FIGHTERS.PVT.LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
