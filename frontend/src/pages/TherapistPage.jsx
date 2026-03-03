export default function TherapistPage() {
  const items = ["View assigned therapies", "Update progress %", "Add treatment notes", "Mark completed"];
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="font-heading text-2xl mb-4">Therapist Module</h2>
      <ul className="list-disc pl-6 space-y-2">{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
