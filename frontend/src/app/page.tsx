import SiteHeader from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                AI-Powered Recruitment Platform
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Recruit Smarter.
                <span className="block text-blue-600">Hire Better.</span>
                Move Faster.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Transform your recruitment operations with intelligent AI
                assistance. Manage candidates, streamline hiring workflows, and
                make informed decisions with HireFlow AI.
              </p>

              {/* CTA Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/signup"
                  className="rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Get Started
                </a>

                <a
                  href="#features"
                  className="rounded-lg border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  Explore Features →
                </a>
              </div>

              <p className="mt-6 text-sm text-slate-500">
                Built for modern recruitment teams and hiring agencies.
              </p>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-xl sm:p-6">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Recruitment Overview
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Your hiring activity at a glance
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Dashboard Preview
                  </span>
                </div>

                {/* Statistics */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Total Candidates</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      248
                    </p>
                    <p className="mt-1 text-xs text-green-600">
                      Candidate pipeline
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Active Jobs</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">18</p>
                    <p className="mt-1 text-xs text-blue-600">Open positions</p>
                  </div>
                </div>

                {/* Candidate Pipeline */}
                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Candidate Pipeline
                  </h3>

                  <div className="mt-5 space-y-4">
                    {[
                      { label: "Applied", count: 120, width: "100%" },
                      { label: "Shortlisted", count: 72, width: "60%" },
                      { label: "Interview", count: 36, width: "30%" },
                      { label: "Selected", count: 20, width: "17%" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-slate-600">{item.label}</span>
                          <span className="font-semibold text-slate-900">
                            {item.count}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: item.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insight */}
                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✦</span>
                    <p className="text-sm font-semibold text-blue-900">
                      AI-Assisted Insights
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    Get explainable candidate insights to support your
                    recruitment team&apos;s decisions.
                  </p>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-indigo-100 blur-3xl" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
