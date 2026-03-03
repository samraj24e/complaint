const workflows = [
  "View appointments",
  "Enter symptoms and diagnosis",
  "Run AI dosha analysis",
  "Recommend therapy + therapist",
  "Generate prescription and bill",
];

export default function DoctorPage() {
  return <Section title="Doctor Module" items={workflows} />;
}

function Section({ title, items }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="font-heading text-2xl mb-4">{title}</h2>
      <ul className="list-disc pl-6 space-y-2">{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
