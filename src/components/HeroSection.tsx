import { ArrowRight } from "lucide-react";
import firePanelAsset from "@/assets/fire-panel.png.asset.json";

export function HeroSection() {
  return (
    <section id="plans" className="bg-surface-container">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-12 md:py-20">
        <div>
          <h1 className="text-balance font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            <span className="text-primary">Secure Your Facility.</span>
            <br />
            <span className="text-foreground">FREE FIRE SAFTEY HEALTH CHECK UP</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty font-sans text-lg leading-relaxed text-on-surface-variant">
            Our certified technicians will visit your facility to perform a thorough, complimentary
            inspection of your fire protection systems
          </p>
          <a
            href="#register"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 font-sans text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Claim Free Inspection
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src={firePanelAsset.url}
            alt="Fire safety alarm control panel mounted in a modern commercial building corridor"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
