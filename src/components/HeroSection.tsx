import { ArrowRight, Flame } from "lucide-react";
import { useRemainingSpots } from "@/hooks/use-remaining-spots";

export function HeroSection() {
  const { remaining, isFull, MAX_REGISTRATIONS } = useRemainingSpots();

  return (
    <section id="plans" className="bg-surface-container">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-12 md:py-16">
        <div>
          <h1 className="text-balance font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            <span className="text-primary">Secure Your Facility.</span>
            <br />
            <span className="text-foreground">FIRE SAFETY INSPECTION</span>
          </h1>

          <p className="mt-5 max-w-md text-pretty font-sans text-lg leading-relaxed text-on-surface-variant">
            Our certified technicians will visit your facility to perform a thorough, complimentary
            inspection of your fire protection systems
          </p>

          <div className="mt-5 flex w-full max-w-md flex-col gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-alert-amber px-4 py-2 font-sans text-xs font-extrabold uppercase tracking-[0.08em] text-foreground sm:text-sm">
              <Flame className="h-4 w-4 fill-current" aria-hidden="true" />
              Limited to first {MAX_REGISTRATIONS} registrations
            </div>

            <div className="flex min-h-[120px] w-[350px] max-w-full items-center gap-5 rounded-xl border border-border border-t-4 border-t-primary bg-card px-7 py-5 shadow-sm sm:gap-6 sm:px-8">
              {isFull ? (
                <span className="font-sans text-2xl font-extrabold uppercase leading-tight text-primary sm:text-3xl">
                  Registration closed
                </span>
              ) : remaining !== null ? (
                <>
                  <span className="font-sans text-6xl font-extrabold leading-none tracking-tight text-primary sm:text-7xl">
                    {remaining}
                  </span>

                  <span className="font-sans text-base font-extrabold uppercase leading-tight tracking-wide text-on-surface-variant sm:text-lg">
                    Spots remaining
                  </span>
                </>
              ) : (
                <span className="font-sans text-base font-extrabold uppercase tracking-wide text-on-surface-variant sm:text-lg">
                  Loading availability...
                </span>
              )}
            </div>
          </div>

          {isFull ? (
            <button
              disabled
              className="mt-7 inline-flex cursor-not-allowed items-center gap-3 rounded-md bg-primary px-7 py-4 font-sans text-base font-bold text-primary-foreground opacity-60"
            >
              REGISTRATION CLOSED
            </button>
          ) : (
            <a
              href="#register"
              className="mt-7 inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 font-sans text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Claim Your Inspection
              <ArrowRight className="h-5 w-5" />
            </a>
          )}
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src="/Screenshot_2026-09-12_at_4.35.51_PM.png"
            alt="Fire safety alarm control panel mounted in a modern commercial building corridor"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}