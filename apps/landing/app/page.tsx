"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";

const defaultCalendlyUrl = "https://calendly.com/your-team/demo";

const landingContent = {
  brand: "Digital Entrepreneur",
  badge: "AI Growth System",
  headline: "Scale your business faster with practical AI systems.",
  subheadline:
    "I help coaches, consultants, agency owners, and digital marketers use AI to grow revenue, save time, and build a smarter business.",
  primaryCta: "Book a Strategy Call",
  secondaryCta: "See How It Works",
  trustLine: "Generated 100+ Crores for business",
  problemsTitle: "Your growth is stuck because your systems are manual.",
  problems: [
    "Sales follow-ups are slow and inconsistent",
    "Content and outreach take too much time",
    "Teams aren’t using AI in a scalable way"
  ],
  solutionTitle: "A clear AI growth system built for your business.",
  solutionCopy:
    "We design AI workflows for lead gen, follow-ups, content creation, and operational speed — tailored to your niche and audience.",
  outcomesTitle: "Outcomes you can expect",
  outcomes: [
    "More qualified leads without extra ad spend",
    "Faster execution with less effort",
    "Consistent messaging and conversions",
    "Team workflows that scale"
  ],
  proofTitle: "Proven results, real growth.",
  proofCopy: "Generated 100+ Crores for business through CRO and AI-driven marketing systems.",
  howTitle: "How it works",
  steps: [
    {
      title: "Audit & Strategy",
      body: "Understand your offer, funnel, and growth bottlenecks."
    },
    {
      title: "AI System Design",
      body: "Build tailored AI workflows + conversion structure."
    },
    {
      title: "Execution & Optimization",
      body: "Launch and iterate for measurable growth."
    }
  ],
  finalTitle: "Ready to scale with AI?",
  finalCopy: "20-minute call. No fluff. Just clarity."
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
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-white">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
          {landingContent.brand}
        </div>
        <button
          type="button"
          onClick={handleBookCall}
          className="hidden rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100 md:inline-flex"
        >
          {landingContent.primaryCta}
        </button>
      </header>

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-start justify-center gap-10 px-6 py-10 md:flex-row md:items-center">
        <div className="flex w-full flex-1 flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
            {landingContent.badge}
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            {landingContent.headline}
          </h1>
          <p className="max-w-2xl text-base text-slate-300 md:text-lg">
            {landingContent.subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleBookCall}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {landingContent.primaryCta}
            </button>
            <button
              type="button"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:border-white/40"
            >
              {landingContent.secondaryCta}
            </button>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            {landingContent.trustLine}
          </p>
        </div>
        <div className="flex w-full flex-1 flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI Growth Snapshot</p>
          <div className="h-40 w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="flex w-full flex-col gap-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Lead Response Time</span>
              <span className="text-white">&lt; 5 mins</span>
            </div>
            <div className="flex items-center justify-between">
              <span>AI Content Velocity</span>
              <span className="text-white">4x faster</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Conversion Focus</span>
              <span className="text-white">Weekly tests</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          {landingContent.problemsTitle}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {landingContent.problems.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {landingContent.solutionTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            {landingContent.solutionCopy}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          {landingContent.outcomesTitle}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {outcomes.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">{landingContent.proofTitle}</p>
          <h3 className="mt-4 text-4xl font-semibold text-white">100+ Crores</h3>
          <p className="mt-2 text-sm text-emerald-100">{landingContent.proofCopy}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          {landingContent.howTitle}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {landingContent.steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Step {index + 1}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <h2 className="text-3xl font-semibold text-white">{landingContent.finalTitle}</h2>
          <p className="mt-3 text-sm text-slate-300">{landingContent.finalCopy}</p>
          <button
            type="button"
            onClick={handleBookCall}
            className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            {landingContent.primaryCta}
          </button>
          {hasBooked ? (
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-200">
              Booking confirmed — check your email for next steps.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
