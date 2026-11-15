
type FeedbackVariant = "loading" | "empty" | "error" | "success";

type FeedbackStateProps = {
  variant: FeedbackVariant;
  title: string;
  message: string;
};

const variantStyles: Record<FeedbackVariant, string> = {
  loading: "border-blue-200 bg-blue-50 text-blue-800",
  empty: "border-slate-200 bg-slate-50 text-slate-700",
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const variantIcons: Record<FeedbackVariant, string> = {
  loading: "◌",
  empty: "○",
  error: "!",
  success: "✓",
};

export default function FeedbackState({
  variant,
  title,
  message,
}: FeedbackStateProps) {
  const isLoading = variant === "loading";

  return (
    <div
      role={isLoading ? "status" : variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`flex items-start gap-3 rounded-xl border p-4 ${variantStyles[variant]}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/70 text-lg font-bold ${
          isLoading ? "animate-spin" : ""
        }`}
      >
        {variantIcons[variant]}
      </span>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
}
