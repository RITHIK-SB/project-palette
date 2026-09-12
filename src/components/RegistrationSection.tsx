import { TriangleAlert, ClipboardCheck, Lock, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { supabase, type RegistrationInput } from "@/lib/supabase";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block font-label text-[13px] font-bold text-foreground">
      {children} <span className="text-primary">*</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-md border-2 border-input bg-card px-4 py-3 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary";

type FormState = {
  company_name: string;
  contact_person: string;
  designation: string;
  mobile_number: string;
  email: string;
  building_type: string;
  building_type_other: string;
};

const initialState: FormState = {
  company_name: "",
  contact_person: "",
  designation: "",
  mobile_number: "",
  email: "",
  building_type: "",
  building_type_other: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function RegistrationSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const isOther = form.building_type === "other";

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!form.company_name || !form.contact_person || !form.designation || !form.mobile_number || !form.email || !form.building_type) {
      setStatus("error");
      setMessage("Please fill in all required fields.");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(form.mobile_number)) {
      setStatus("error");
      setMessage("Mobile number must be exactly 10 digits.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (form.building_type === "other" && !form.building_type_other.trim()) {
      setStatus("error");
      setMessage("Please specify your building type.");
      return;
    }

    const payload: RegistrationInput = {
      company_name: form.company_name.trim(),
      contact_person: form.contact_person.trim(),
      designation: form.designation.trim(),
      mobile_number: form.mobile_number.trim(),
      email: form.email.trim().toLowerCase(),
      building_type: form.building_type,
      building_type_other: form.building_type === "other" ? form.building_type_other.trim() : null,
    };

    const { error } = await supabase.from("registrations").insert(payload);

    if (error) {
      if (error.code === "23505") {
        setStatus("error");
        setMessage("This email has already been registered. Each company email can only register once.");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again or contact us directly.");
      }
      return;
    }

    setStatus("success");
    setMessage("Registration successful! Our engineering team will contact you shortly.");
    setForm(initialState);
  };

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
              Registration closes strictly at the conclusion of the Expo 2026 event on October
              10th. Late submissions will not qualify for the fee waiver.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="h-1.5 w-full bg-primary" aria-hidden="true" />

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-secondary" />
              <h3 className="font-sans text-2xl font-bold text-foreground">Registration Complete!</h3>
              <p className="max-w-sm font-sans text-base leading-relaxed text-on-surface-variant">
                {message}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="mt-2 inline-flex items-center justify-center rounded-md border-2 border-input bg-card px-6 py-3 font-sans text-base font-bold text-foreground transition-colors hover:bg-surface"
              >
                Register Another Company
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-6 p-6 md:p-8" onSubmit={handleSubmit}>
              <div>
                <FieldLabel>Company Name</FieldLabel>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Enter your registered company name"
                  value={form.company_name}
                  onChange={(e) => update("company_name", e.target.value)}
                  disabled={status === "loading"}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <FieldLabel>Contact Person Name</FieldLabel>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Full Name"
                    value={form.contact_person}
                    onChange={(e) => update("contact_person", e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <FieldLabel>Designation</FieldLabel>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Facility Manager"
                    value={form.designation}
                    onChange={(e) => update("designation", e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <FieldLabel>Mobile Number</FieldLabel>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="10-digit number"
                    value={form.mobile_number}
                    onChange={(e) => update("mobile_number", e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <FieldLabel>Email ID</FieldLabel>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="official@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Type of Building</FieldLabel>
                <div className="relative">
                  <select
                    value={form.building_type}
                    onChange={(e) => update("building_type", e.target.value)}
                    className={`${inputClass} appearance-none pr-10 text-on-surface-variant`}
                    disabled={status === "loading"}
                  >
                    <option value="" disabled>
                      Select facility type
                    </option>
                    <option value="institutions">Institutions</option>
                    <option value="hospitals">Hospitals</option>
                    <option value="industries">Industries</option>
                    <option value="warehouses">Warehouses</option>
                    <option value="commercial">Commercial Complex</option>
                    <option value="high-rise-residential">High-rise Residence Buildings</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                </div>
                {isOther && (
                  <input
                    type="text"
                    className={`${inputClass} mt-4`}
                    placeholder="Please specify your building type"
                    aria-label="Specific building type"
                    value={form.building_type_other}
                    onChange={(e) => update("building_type_other", e.target.value)}
                    disabled={status === "loading"}
                  />
                )}
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-3">
                  <TriangleAlert className="h-5 w-5 shrink-0 text-primary" />
                  <p className="font-sans text-sm text-primary">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-sans text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="h-5 w-5" />
                    Register for Free AMC
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-2 font-sans text-sm text-on-surface-variant">
                <Lock className="h-4 w-4" />
                Your data is securely encrypted.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
