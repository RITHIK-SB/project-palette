import { TriangleAlert, ClipboardCheck, Lock, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block font-label text-[13px] font-bold text-foreground">
      {children} <span className="text-primary">*</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-md border-2 border-input bg-card px-4 py-3 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary";

export function RegistrationSection() {
  return (
    <section id="register" className="bg-surface-container">
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-4 py-16 md:grid-cols-2 md:px-12 md:py-20">
        {/* Left copy */}
        <div className="md:pt-8">
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-[32px]">
            Activate Your Free Maintenance Assessment
          </h2>
          <p className="mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-on-surface-variant">
            Complete the registration form to lock in your exclusive Synergy 2026 Expo offer. Our
            engineering team will contact you at the earliest to schedule the initial baseline
            assessment.
          </p>

          <div className="mt-8 max-w-md border border-border border-l-4 border-l-alert-amber bg-card p-5">
            <div className="flex items-center gap-2">
              <TriangleAlert className="h-5 w-5 text-alert-amber" />
              <h3 className="font-sans text-base font-bold text-foreground">Limited Time Offer</h3>
            </div>
            <p className="mt-2 text-pretty font-sans text-[15px] leading-relaxed text-on-surface-variant">
              Registration closes strictly at the conclusion of the Expo 2026 event on November
              30th. Late submissions will not qualify for the fee waiver.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="h-1.5 w-full bg-primary" aria-hidden="true" />
          <form className="flex flex-col gap-6 p-6 md:p-8">
            <div>
              <FieldLabel>Company Name</FieldLabel>
              <input
                type="text"
                className={inputClass}
                placeholder="Enter your registered company name"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel>Contact Person Name</FieldLabel>
                <input type="text" className={inputClass} placeholder="Full Name" />
              </div>
              <div>
                <FieldLabel>Designation</FieldLabel>
                <input type="text" className={inputClass} placeholder="e.g. Facility Manager" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel>Mobile Number</FieldLabel>
                <input type="tel" className={inputClass} placeholder="10-digit number" />
              </div>
              <div>
                <FieldLabel>Email ID</FieldLabel>
                <input type="email" className={inputClass} placeholder="official@company.com" />
              </div>
            </div>

            <div>
              <FieldLabel>Type of Building</FieldLabel>
              <div className="relative">
                <select
                  defaultValue=""
                  className={`${inputClass} appearance-none pr-10 text-on-surface-variant`}
                >
                  <option value="" disabled>
                    Select facility type
                  </option>
                  <option value="commercial">Commercial Complex</option>
                  <option value="industrial">Industrial / Warehouse</option>
                  <option value="residential">Residential High-Rise</option>
                  <option value="hospital">Hospital / Healthcare</option>
                  <option value="hospitality">Hotel / Hospitality</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-sans text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ClipboardCheck className="h-5 w-5" />
              Register for Free AMC
            </button>

            <p className="flex items-center justify-center gap-2 font-sans text-sm text-on-surface-variant">
              <Lock className="h-4 w-4" />
              Your data is securely encrypted.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
