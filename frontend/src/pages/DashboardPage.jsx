import StatCard from "../components/StatCard";

const stats = [
  { title: "Total Users", value: 128 },
  { title: "Patients", value: 84, tone: "success" },
  { title: "Doctors", value: 12, tone: "info" },
  { title: "Therapists", value: 18, tone: "warning" },
];

const monthly = [
  { month: "Jan", appointments: 32 },
  { month: "Feb", appointments: 41 },
  { month: "Mar", appointments: 45 },
  { month: "Apr", appointments: 38 },
];

const therapies = [
  { name: "Abhyanga", value: 120, color: "bg-blue-600" },
  { name: "Shirodhara", value: 97, color: "bg-green-600" },
  { name: "Udvartana", value: 109, color: "bg-sky-500" },
];

export default function DashboardPage() {
  const maxAppointments = Math.max(...monthly.map((m) => m.appointments));
  const totalTherapies = therapies.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-3xl font-semibold">Admin Analytics Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => <StatCard key={item.title} {...item} />)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-lg">
          <h3 className="font-heading mb-4">Monthly Appointments</h3>
          <div className="space-y-3">
            {monthly.map((row) => (
              <div key={row.month}>
                <div className="mb-1 flex justify-between text-sm"><span>{row.month}</span><span>{row.appointments}</span></div>
                <div className="h-2 rounded bg-slate-100">
                  <div className="h-2 rounded bg-medicalBlue" style={{ width: `${(row.appointments / maxAppointments) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-lg">
          <h3 className="font-heading mb-4">Therapy Distribution</h3>
          <div className="space-y-3">
            {therapies.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex justify-between text-sm"><span>{item.name}</span><span>{item.value}</span></div>
                <div className="h-3 rounded bg-slate-100">
                  <div className={`h-3 rounded ${item.color}`} style={{ width: `${(item.value / totalTherapies) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
