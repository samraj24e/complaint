export default function PatientPage() {
  const items = ["Book appointment", "View schedule", "View prescriptions", "View and pay bills", "AI self dosha check"];
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="font-heading text-2xl mb-4">Patient Module</h2>
      <ul className="list-disc pl-6 space-y-2">{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
