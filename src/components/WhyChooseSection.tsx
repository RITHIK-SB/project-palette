import { Headphones, ClipboardCheck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Headphones,
    accent: "bg-secondary",
    iconWrap: "bg-secondary/10 text-secondary",
    title: "24/7 Priority Support",
    body: "Immediate dispatch capabilities and round-the-clock technical assistance ensure zero downtime for critical safety infrastructure.",
  },
  {
    icon: ClipboardCheck,
    accent: "bg-primary",
    iconWrap: "bg-primary/10 text-primary",
    title: "Expert Inspections",
    body: "Quarterly exhaustive system audits conducted by certified engineers, adhering strictly to global fire safety codes.",
  },
  {
    icon: ShieldCheck,
    accent: "bg-secondary",
    iconWrap: "bg-secondary/10 text-secondary",
    title: "Total Compliance",
    body: "Automated documentation, certificate generation, and compliance tracking specifically designed to satisfy local authority requirements.",
  },
];

export function WhyChooseSection() {
  return (
    <section id="about" className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 pt-16 md:px-12 md:pt-20">
        <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-[32px]">
          Why choose MAHA BINU&apos;S AMC?
        </h2>
        <p className="mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-on-surface-variant">
          Our preventive maintenance contracts guarantee your fire protection systems operate
          precisely when needed, mitigating risk and ensuring total compliance with national safety
          standards & NFPA standards.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="flex flex-col border border-border bg-card">
              <div className={`h-1 w-full ${f.accent}`} aria-hidden="true" />
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-md ${f.iconWrap}`}
                >
                  <f.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="font-sans text-2xl font-semibold text-foreground">{f.title}</h3>
                <p className="text-pretty font-sans text-base leading-relaxed text-on-surface-variant">
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
