const RouteCard = ({ route, onSelect }) => (
  <button
    onClick={() => onSelect(route)}
    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-brand"
  >
    <p className="text-lg font-semibold text-slate-800">{route.route_name}</p>
    <p className="text-sm text-slate-500">{route.start_point} → {route.end_point}</p>
  </button>
);

export default RouteCard;
