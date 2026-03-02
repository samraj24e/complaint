import { useEffect, useState } from 'react';
import api from '../services/api';

const DriverPage = () => {
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    api
      .get('/driver/assignment')
      .then((res) => setAssignment(res.data))
      .catch((err) => console.error(err));
  }, []);

  const simulateLocation = async () => {
    if (!assignment?.trip_id) return;
    await api.put('/driver/location', {
      trip_id: assignment.trip_id,
      current_lat: (Math.random() * 90).toFixed(6),
      current_lng: (Math.random() * 90).toFixed(6)
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-4">
      <h2 className="text-2xl font-bold">Driver Console</h2>
      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <p><span className="font-semibold">Assigned Bus:</span> {assignment?.bus_number || 'N/A'}</p>
        <p><span className="font-semibold">Route:</span> {assignment?.route_name || 'N/A'}</p>
        <p><span className="font-semibold">Trip Status:</span> {assignment?.status || 'No trip'}</p>
        <div className="mt-4 flex gap-3">
          <button onClick={simulateLocation} className="rounded bg-brand px-4 py-2 text-white">Update Live Location</button>
        </div>
      </div>
      <p className="text-sm text-slate-500">Tip: integrate a timer to auto-send GPS updates every 5 seconds in production mode.</p>
    </div>
  );
};

export default DriverPage;
