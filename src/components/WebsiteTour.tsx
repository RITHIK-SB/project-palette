import { useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";

type TourStep = {
  target: string;
  title: string;
  description: string;
};

type TargetRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const TOUR_STORAGE_KEY = "hasSeenWebsiteTour";

const steps: TourStep[] = [
  {
    target: "register",
    title: "Register Now",
    description: "Start your registration here.",
  },
  {
    target: "payment",
    title: "Payment",
    description: "Complete your registration securely through Razorpay.",
  },
  {
    target: "status",
    title: "Registration Status",
    description: "Check your registration status and details here.",
  },
  {
    target: "contact",
    title: "Contact Us",
    description: "Need help? Reach our team directly.",
  },
];

function getTarget(target: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-tour="${target}"]`);
}

function getTargetRect(element: HTMLElement): TargetRect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export function WebsiteTour() {
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const previousTargetRef = useRef<HTMLElement | null>(null);
  const previousTargetStylesRef = useRef({ position: "", zIndex: "", scrollMarginTop: "" });

  const isActive = stepIndex !== null;
  const currentStep = stepIndex === null ? null : steps[stepIndex];

  const closeTour = () => {
    window.localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setStepIndex(null);
  };

  const startTour = () => {
    window.localStorage.removeItem(TOUR_STORAGE_KEY);
    setStepIndex(0);
  };

  useEffect(() => {
    try {
      if (window.localStorage.getItem(TOUR_STORAGE_KEY) !== "true") {
        const timer = window.setTimeout(() => setStepIndex(0), 350);
        return () => window.clearTimeout(timer);
      }
    } catch {
      const timer = window.setTimeout(() => setStepIndex(0), 350);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeTour();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !currentStep) return;

    let retryCount = 0;
    let retryTimer: number | undefined;

    const updatePosition = () => {
      const target = getTarget(currentStep.target);
      if (!target) {
        if (retryCount < 10) {
          retryCount += 1;
          retryTimer = window.setTimeout(updatePosition, 100);
        }
        return;
      }

      if (previousTargetRef.current !== target) {
        if (previousTargetRef.current) {
          previousTargetRef.current.style.position = previousTargetStylesRef.current.position;
          previousTargetRef.current.style.zIndex = previousTargetStylesRef.current.zIndex;
          previousTargetRef.current.style.scrollMarginTop = previousTargetStylesRef.current.scrollMarginTop;
        }

        previousTargetStylesRef.current = {
          position: target.style.position,
          zIndex: target.style.zIndex,
          scrollMarginTop: target.style.scrollMarginTop,
        };
        previousTargetRef.current = target;
        target.style.position = target.style.position || "relative";
        target.style.zIndex = "60";
        target.style.scrollMarginTop = "96px";
      }

      const rect = getTargetRect(target);
      setTargetRect(rect);
      target.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      if (retryTimer) window.clearTimeout(retryTimer);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [currentStep, isActive]);

  useEffect(() => {
    if (!isActive || !targetRect || !tooltipRef.current) return;

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const gap = 16;
    const margin = 16;
    const belowTop = targetRect.top + targetRect.height + gap;
    const aboveTop = targetRect.top - tooltip.height - gap;
    const top = belowTop + tooltip.height <= window.innerHeight - margin
      ? belowTop
      : aboveTop >= margin
        ? aboveTop
        : Math.max(margin, window.innerHeight - tooltip.height - margin);
    const left = Math.min(
      Math.max(margin, targetRect.left + targetRect.width / 2 - tooltip.width / 2),
      window.innerWidth - tooltip.width - margin,
    );

    setTooltipStyle({ top, left });
  }, [targetRect, stepIndex]);

  useEffect(() => {
    return () => {
      if (previousTargetRef.current) {
        previousTargetRef.current.style.position = previousTargetStylesRef.current.position;
        previousTargetRef.current.style.zIndex = previousTargetStylesRef.current.zIndex;
        previousTargetRef.current.style.scrollMarginTop = previousTargetStylesRef.current.scrollMarginTop;
      }
    };
  }, [isActive]);

  if (!isActive || !currentStep || !targetRect) return null;

  const goBack = () => setStepIndex((current) => (current === null ? null : Math.max(0, current - 1)));
  const goNext = () => {
    if (stepIndex === steps.length - 1) {
      closeTour();
      return;
    }
    setStepIndex((current) => (current === null ? 0 : current + 1));
  };

  return (
    <div className="fixed inset-0 z-40" aria-label="Website tour">
      <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute rounded-lg ring-2 ring-white/90 transition-[top,left,width,height] duration-200 motion-reduce:transition-none"
        style={{ top: targetRect.top - 8, left: targetRect.left - 8, width: targetRect.width + 16, height: targetRect.height + 16, boxShadow: "0 0 0 9999px rgb(0 0 0 / 0.58)" }}
        aria-hidden="true"
      />
      <div
        ref={tooltipRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="website-tour-title"
        className="absolute w-[min(360px,calc(100vw-32px))] rounded-xl border border-border bg-card p-5 text-foreground shadow-2xl transition-[top,left] duration-200 motion-reduce:transition-none"
        style={tooltipStyle}
      >
        <button
          type="button"
          onClick={closeTour}
          aria-label="Close website tour"
          className="absolute right-3 top-3 rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="pr-6 font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary">
          {stepIndex + 1} of {steps.length}
        </p>
        <h2 id="website-tour-title" className="mt-2 font-sans text-xl font-bold leading-tight">
          {currentStep.title}
        </h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-on-surface-variant">
          {currentStep.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={closeTour}
            className="rounded-md px-2 py-2 font-sans text-sm font-semibold text-on-surface-variant transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Skip Tour
          </button>
          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="rounded-md border border-border px-3 py-2 font-sans text-sm font-bold text-foreground transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              className="rounded-md bg-primary px-4 py-2 font-sans text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {stepIndex === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
