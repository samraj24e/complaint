import { Link } from "react-router-dom";

export default function Sidebar() {
  const links = [
    ["/", "Dashboard"],
    ["/appointments", "Appointments"],
    ["/doctor", "Doctor"],
    ["/therapist", "Therapist"],
    ["/patient", "Patient"],
    ["/billing", "Billing"],
  ];

  return (
    <aside className="min-h-screen w-64 bg-gradient-to-b from-medicalBlue to-deepBlue text-white p-6">
      <h1 className="font-heading text-xl font-bold">Panchakarma PMS</h1>
      <nav className="mt-8 space-y-2">
        {links.map(([to, label]) => (
          <Link key={to} to={to} className="block rounded-lg px-4 py-2 transition hover:bg-white/20">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
