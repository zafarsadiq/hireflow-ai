type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary"
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">{description}</p>
    </article>
  );
}
