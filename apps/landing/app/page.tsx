"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";

const defaultCalendlyUrl = "https://calendly.com/your-team/demo";

const landingContent = {
  badge: "CRO Sprint",
  headline: "Fix the landing page leaks that are costing you demos.",
  subheadline:
    "We rebuild your highest-traffic page with tighter positioning, a cleaner CTA path, and weekly experiments tied to pipeline.",
  primaryCta: "Book a call",
  secondaryCopy: "20-min audit. Bring your current page.",
  trustRow: ["Avg +18% demo rate", "2-week sprint", "Weekly reporting"],
  sections: [
    {
      title: "Signal",
      body: "Sharper offer + audience language that cuts bounce."
    },
    {
      title: "Velocity",
      body: "Weekly test cadence you can ship without delays."
    },
    {
      title: "Insight",
      body: "Clarity, GA4, and custom events wired on day one."
    }
  ],
  outcomeHeadline: "What you get in the first sprint",
  outcomes: [
    "Landing page teardown + opportunity map",
    "New hero + CTA module, ready to ship",
    "Experiment plan with expected lift targets",
    "Analytics dashboard baseline"
  ]
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(event: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cro_event", { detail: { event } }));
  if (window.dataLayer) {
    window.dataLayer.push({ event });
  }
  if (window.gtag) {
    window.gtag("event", event);
  }
}

function isCalendlyMessage(event: MessageEvent) {
  if (!event?.data) return false;
  if (typeof event.data === "string") {
    return event.data.includes("calendly");
  }
  if (typeof event.data === "object") {
    return "event" in event.data && String(event.data.event).includes("calendly");
  }
  return false;
}

export default function LandingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? defaultCalendlyUrl;
  const [hasBooked, setHasBooked] = useState(false);

  const handleBookCall = useCallback(() => {
    trackEvent("cta_book_call_click");
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  }, [calendlyUrl]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!isCalendlyMessage(event)) return;
      if (
        typeof event.data === "object" &&
        event.data &&
        "event" in event.data &&
        String(event.data.event).includes("calendly.event_scheduled")
      ) {
        trackEvent("booking_confirmed");
        setHasBooked(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const outcomes = useMemo(() => landingContent.outcomes, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(43,97,255,0.3),_transparent_55%)]">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => trackEvent("scheduler_loaded")}
      />
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-start justify-center gap-10 px-6 py-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
          {landingContent.badge}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            {landingContent.headline}
          </h1>
          <p className="max-w-2xl text-base text-slate-300 md:text-lg">
            {landingContent.subheadline}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleBookCall}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            {landingContent.primaryCta}
          </button>
          <span className="text-sm text-slate-400">
            {landingContent.secondaryCopy}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
          {landingContent.trustRow.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-3 py-2">
              {item}
            </span>
          ))}
        </div>
        {hasBooked ? (
          <div className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
              Booking confirmed
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              Thanks for booking — we will send prep notes shortly.
            </p>
          </div>
        ) : null}
        <div className="grid w-full gap-6 pt-8 md:grid-cols-3">
          {landingContent.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                {section.title}
              </p>
              <p className="mt-3 text-lg font-semibold">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">{landingContent.outcomeHeadline}</h2>
          <ul className="mt-6 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
