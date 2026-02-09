export default function DashboardPage() {
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
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Login</h2>
            <p className="mt-2 text-sm text-slate-600">
              Access existing workspaces and active experiments.
            </p>
            <form className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  placeholder="you@agency.com"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <button
                type="button"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
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
            <form className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Full name
                <input
                  type="text"
                  placeholder="Jordan Lee"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Work email
                <input
                  type="email"
                  placeholder="jordan@agency.com"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <button
                type="button"
                className="rounded-lg border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900"
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
            <form className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Offer name
                <input
                  type="text"
                  placeholder="Conversion Sprint"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Promise
                <textarea
                  rows={3}
                  placeholder="Double qualified demos in 30 days"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Audience
                <input
                  type="text"
                  placeholder="Series A B2B SaaS marketers"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Calendly URL
                <input
                  type="url"
                  placeholder="https://calendly.com/your-team/demo"
                  className="rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
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
