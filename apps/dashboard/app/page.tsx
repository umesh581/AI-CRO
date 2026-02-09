"use client";

import { useCallback, useState } from "react";

import { supabase } from "../lib/supabase/client";

const initialProject = {
  offerName: "",
  promise: "",
  audience: "",
  calendlyUrl: ""
};

export default function DashboardPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [projectForm, setProjectForm] = useState(initialProject);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    setStatus(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword
    });
    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Logged in successfully.");
    }
    setLoading(false);
  }, [loginEmail, loginPassword]);

  const handleSignup = useCallback(async () => {
    setLoading(true);
    setStatus(null);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { full_name: signupName }
      }
    });
    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Signup successful. Check your email for confirmation.");
    }
    setLoading(false);
  }, [signupEmail, signupName, signupPassword]);

  const handleProjectSubmit = useCallback(async () => {
    setLoading(true);
    setStatus(null);
    const { data: userData } = await supabase.auth.getUser();
    const ownerId = userData.user?.id ?? null;

    const { error } = await supabase.from("projects").insert({
      offer_name: projectForm.offerName,
      promise: projectForm.promise,
      audience: projectForm.audience,
      calendly_url: projectForm.calendlyUrl,
      owner_id: ownerId
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Project saved.");
      setProjectForm(initialProject);
    }
    setLoading(false);
  }, [projectForm]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            AI CRO Dashboard
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Manage client onboarding, approvals, and performance in one place.
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            This dashboard is the command center for your CRO agency. Authenticate, intake
            new projects, and keep stakeholders aligned.
          </p>
          {status ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              {status}
            </div>
          ) : null}
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Login</h2>
            <p className="mt-2 text-sm text-slate-600">
              Access existing workspaces and active experiments.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                void handleLogin();
              }}
            >
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  placeholder="you@agency.com"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="••••••••"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                Log in
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Sign up</h2>
            <p className="mt-2 text-sm text-slate-600">
              Invite your team and connect a new client workspace.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSignup();
              }}
            >
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Full name
                <input
                  type="text"
                  value={signupName}
                  onChange={(event) => setSignupName(event.target.value)}
                  placeholder="Jordan Lee"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Work email
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                  placeholder="jordan@agency.com"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(event) => setSignupPassword(event.target.value)}
                  placeholder="Create a password"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
              >
                Create account
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Create project</h2>
            <p className="mt-2 text-sm text-slate-600">
              Capture the promise, target audience, and booking link.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                void handleProjectSubmit();
              }}
            >
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Offer name
                <input
                  type="text"
                  value={projectForm.offerName}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, offerName: event.target.value }))
                  }
                  placeholder="Conversion Sprint"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Promise
                <textarea
                  rows={3}
                  value={projectForm.promise}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, promise: event.target.value }))
                  }
                  placeholder="Double qualified demos in 30 days"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Audience
                <input
                  type="text"
                  value={projectForm.audience}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, audience: event.target.value }))
                  }
                  placeholder="Series A B2B SaaS marketers"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Calendly URL
                <input
                  type="url"
                  value={projectForm.calendlyUrl}
                  onChange={(event) =>
                    setProjectForm((prev) => ({ ...prev, calendlyUrl: event.target.value }))
                  }
                  placeholder="https://calendly.com/your-team/demo"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                Save project
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
