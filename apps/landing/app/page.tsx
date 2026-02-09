"use client";

import Script from "next/script";
import { useCallback } from "react";

const defaultCalendlyUrl = "https://calendly.com/your-team/demo";

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

export default function LandingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? defaultCalendlyUrl;

  const handleBookCall = useCallback(() => {
    trackEvent("cta_book_call_click");
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  }, [calendlyUrl]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(43,97,255,0.3),_transparent_55%)]">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => trackEvent("scheduler_loaded")}
      />
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-start justify-center gap-10 px-6 py-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
          Conversion Sprint
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            Turn your landing page into a pipeline engine.
          </h1>
          <p className="max-w-2xl text-base text-slate-300 md:text-lg">
            We redesign, message, and test your top entry page so qualified demos roll in.
            Book a short strategy call to see your first test plan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleBookCall}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Book a call
          </button>
          <span className="text-sm text-slate-400">
            20-min consult, no pitch deck.
          </span>
        </div>
        <div className="grid w-full gap-6 pt-12 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Signal</p>
            <p className="mt-3 text-lg font-semibold">CTA clarity that converts.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Velocity</p>
            <p className="mt-3 text-lg font-semibold">Weekly test cadence.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Insight</p>
            <p className="mt-3 text-lg font-semibold">Real-time learnings.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
