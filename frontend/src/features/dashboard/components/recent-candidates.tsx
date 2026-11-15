
import Badge from "@/components/ui/badge";
import DataTable, { type Column } from "@/components/ui/data-table";

type Candidate = {
  id: string;
  name: string;
  position: string;
  appliedDate: string;
  status: "Shortlisted" | "Interview" | "Under Review";
};

const candidates: Candidate[] = [
  {
    id: "CAN-001",
    name: "Sarah Johnson",
    position: "Frontend Developer",
    appliedDate: "Nov 12, 2026",
    status: "Shortlisted",
  },
  {
    id: "CAN-002",
    name: "Michael Chen",
    position: "Product Designer",
    appliedDate: "Nov 11, 2026",
    status: "Interview",
  },
  {
    id: "CAN-003",
    name: "Emily Davis",
    position: "Backend Developer",
    appliedDate: "Nov 10, 2026",
    status: "Under Review",
  },
];

const columns: Column<Candidate>[] = [
  {
    key: "candidate",
    header: "Candidate",
    render: (candidate) => (
      <span className="font-semibold text-foreground">
        {candidate.name}
      </span>
    ),
  },
  {
    key: "position",
    header: "Position",
    render: (candidate) => candidate.position,
  },
  {
    key: "date",
    header: "Applied Date",
    render: (candidate) => candidate.appliedDate,
  },
  {
    key: "status",
    header: "Status",
    render: (candidate) => {
      const variant =
        candidate.status === "Shortlisted"
          ? "success"
          : candidate.status === "Interview"
            ? "info"
            : "warning";

      return <Badge variant={variant}>{candidate.status}</Badge>;
    },
  },
];

export default function RecentCandidates() {
  return (
    <section className="mt-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">Recent Candidates</h3>
          <p className="mt-1 text-sm text-muted">
            A preview of your latest candidate applications.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={candidates}
        getRowKey={(candidate) => candidate.id}
      />
    </section>
  );
}
