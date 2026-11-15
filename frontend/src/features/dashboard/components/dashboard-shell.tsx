import Link from "next/link";
import Button from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import RecentCandidates from "@/features/dashboard/components/recent-candidates";
import Input from "@/components/ui/input";
import FeedbackState from "@/components/ui/feedback-state";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: "▦" },
  { label: "Jobs", href: "/jobs", icon: "▤" },
  { label: "Candidates", href: "/candidates", icon: "♙" },
  { label: "Interviews", href: "/interviews", icon: "▣" },
  { label: "Settings", href: "/settings", icon: "⚙" },
];

export default function DashboardShell() {
  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col">
        <div className="border-b border-border px-6 py-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            HireFlow<span className="text-primary"> AI</span>
          </Link>
          <p className="mt-1 text-xs text-muted">Recruitment Workspace</p>
        </div>

        <nav
          className="flex-1 space-y-2 px-4 py-6"
          aria-label="Main navigation"
        >
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">Workspace</p>

          {navigationItems.map((item) => {
            const isActive = item.href === "/dashboard";

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-white" : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="w-5 text-center text-base"
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4 py-6">
          <p className="text-xs text-muted">HireFlow AI</p>
          <p className="mt-1 text-xs text-muted">Recruitment operations</p>
        </div>
      </aside>

      {/* Main application area */}
      <div className="min-w-0 flex-1">
        {/* Top header */}
        <header className="border-b border-border bg-surface">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Dashboard</h1>
              <p className="mt-1 text-sm text-muted">Welcome back. Here is your recruitment workspace.</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                aria-label="Notifications"
                title="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-lg"
              >
                ♧
              </span>

              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
                >
                  AM
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">Alex Morgan</p>
                  <p className="text-xs text-muted">Recruiter</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile navigation */}
        <nav
          className="overflow-x-auto border-b border-border bg-surface px-4 py-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex min-w-max gap-2">
            {navigationItems.map((item) => {
              const isActive = item.href === "/dashboard";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-primary text-white" : "text-muted hover:bg-background"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Dashboard content */}
        <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recruitment Overview</h2>
            <p className="mt-2 text-sm text-muted">Monitor your hiring activities and manage your recruitment workflow from one place.</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Active Jobs"
              value={18}
              description="Currently open positions"
              icon="▤"
            />

            <StatCard
              title="Total Candidates"
              value={248}
              description="Candidates in your pipeline"
              icon="♙"
            />

            <StatCard
              title="Interviews"
              value={12}
              description="Scheduled this week"
              icon="▣"
            />

            <StatCard
              title="Offers Sent"
              value={6}
              description="Awaiting candidate responses"
              icon="✉"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Post a Job</Button>
            <Button variant="outline">View Candidates</Button>
          </div>
          <div className="mt-8 max-w-md">
            <Input
              label="Search candidates"
              name="candidate-search"
              placeholder="Enter a candidate name..."
              type="search"
            />
          </div>
          <RecentCandidates />
          <section className="mt-8">
            <h3 className="mb-4 text-lg font-bold">Interface Feedback States</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <FeedbackState
                variant="loading"
                title="Loading candidates"
                message="Please wait while candidate records are loaded."
              />

              <FeedbackState
                variant="empty"
                title="No candidates found"
                message="New candidate applications will appear here."
              />

              <FeedbackState
                variant="error"
                title="Unable to load candidates"
                message="Something went wrong. Please try again."
              />

              <FeedbackState
                variant="success"
                title="Candidate added"
                message="The candidate record was successfully saved."
              />
            </div>
          </section>
          <section
            aria-label="Dashboard workspace"
            className="mt-8 rounded-xl border border-border bg-surface p-8 sm:p-12"
          >
            <div className="mx-auto max-w-lg text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary"
              >
                ▦
              </div>

              <h3 className="mt-5 text-lg font-semibold">Your dashboard workspace</h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Your recruitment metrics, job activity, and candidate pipeline will appear here as we build the dashboard components.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
