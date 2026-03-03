export default function StatCard({ title, value, tone = "info" }) {
  const toneClass = {
    success: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500",
    info: "text-blue-500",
  }[tone];

  return (
    <div className="rounded-xl bg-white p-5 shadow-lg">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`mt-2 text-2xl font-heading font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}
