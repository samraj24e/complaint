import { useEffect, useState } from 'react';
import api from '../services/api';
import socket from '../services/socket';
import RouteCard from '../components/RouteCard';

const PassengerPage = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [stops, setStops] = useState([]);
  const [liveTrips, setLiveTrips] = useState([]);

  useEffect(() => {
    api.get('/passenger/routes').then((res) => setRoutes(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on('bus:location:update', (payload) => {
      setLiveTrips((prev) => prev.map((trip) => (trip.trip_id === payload.trip_id ? { ...trip, ...payload } : trip)));
    });
    return () => {
      socket.off('bus:location:update');
      socket.disconnect();
    };
  }, []);

  const selectRoute = async (route) => {
    setSelectedRoute(route);
    const [stopsRes, liveRes] = await Promise.all([
      api.get(`/passenger/routes/${route.route_id}/stops`),
      api.get(`/passenger/routes/${route.route_id}/live`)
    ]);
    setStops(stopsRes.data);
    setLiveTrips(liveRes.data);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 p-6 md:grid-cols-2">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Available Routes</h2>
        {routes.map((route) => <RouteCard key={route.route_id} route={route} onSelect={selectRoute} />)}
      </div>
      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold">Route Details</h3>
        {selectedRoute ? (
          <>
            <p className="mt-2 text-sm text-slate-600">Stops</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
              {stops.map((stop) => <li key={stop.stop_id}>{stop.stop_order}. {stop.stop_name}</li>)}
            </ul>
            <p className="mt-4 text-sm text-slate-600">Live Buses</p>
            <div className="space-y-2 text-sm">
              {liveTrips.map((trip) => (
                <div className="rounded border p-2" key={trip.trip_id}>
                  {trip.bus_number} @ ({trip.current_lat}, {trip.current_lng})
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-slate-500">Select a route to view stops, ETA, and bus tracking.</p>
        )}
      </div>
    </div>
  );
};

export default PassengerPage;
