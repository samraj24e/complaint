const StatCard = ({ title, value }) => (
  <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

export default StatCard;
