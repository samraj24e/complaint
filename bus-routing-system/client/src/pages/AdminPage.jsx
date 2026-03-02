import { useEffect, useState } from 'react';
import api from '../services/api';
import StatCard from '../components/StatCard';

const AdminPage = () => {
  const [stats, setStats] = useState({ totalBuses: 0, totalDrivers: 0, totalRoutes: 0, activeTrips: 0 });
  const [activeTrips, setActiveTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, tripsRes] = await Promise.all([api.get('/admin/dashboard'), api.get('/admin/trips/active')]);
        setStats(statsRes.data);
        setActiveTrips(tripsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Buses" value={stats.totalBuses} />
        <StatCard title="Total Drivers" value={stats.totalDrivers} />
        <StatCard title="Total Routes" value={stats.totalRoutes} />
        <StatCard title="Active Trips" value={stats.activeTrips} />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <h3 className="mb-3 text-lg font-semibold">Live Trips (Map integration placeholder)</h3>
        <div className="space-y-2 text-sm">
          {activeTrips.map((trip) => (
            <div key={trip.trip_id} className="rounded border p-3">
              Bus {trip.bus_number} on {trip.route_name} ({trip.current_lat}, {trip.current_lng})
            </div>
          ))}
          {!activeTrips.length && <p className="text-slate-500">No active trips right now.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
