import { useEffect, useRef } from "react";

const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        script.remove();
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
};

export function TurnstileWidget({ siteKey, onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | null = null;
    let cancelled = false;
    const container = containerRef.current;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !container || !window.turnstile) return;
        widgetId = window.turnstile.render(container, {
          sitekey: siteKey,
          callback: (token: string) => onTokenChange(token),
          "expired-callback": () => onTokenChange(""),
          "error-callback": () => onTokenChange(""),
        });
      })
      .catch(() => onTokenChange(""));

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      onTokenChange("");
    };
  }, [siteKey, onTokenChange]);

  return <div ref={containerRef} className="flex min-h-[65px] justify-center" />;
}
