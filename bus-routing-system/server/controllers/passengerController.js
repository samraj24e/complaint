const pool = require('../config/db');

const toRad = (value) => (value * Math.PI) / 180;
const haversineKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.getRoutes = async (_req, res) => {
  try {
    const [routes] = await pool.query('SELECT route_id, route_name, start_point, end_point FROM routes');
    return res.json(routes);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch routes', error: error.message });
  }
};

exports.getStopsByRoute = async (req, res) => {
  try {
    const [stops] = await pool.query(
      'SELECT stop_id, stop_name, stop_order, latitude, longitude FROM stops WHERE route_id = ? ORDER BY stop_order ASC',
      [req.params.routeId]
    );
    return res.json(stops);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch stops', error: error.message });
  }
};

exports.trackLiveBus = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.trip_id, t.current_lat, t.current_lng, t.status, b.bus_number, r.route_name
       FROM trips t
       JOIN buses b ON t.bus_id = b.bus_id
       JOIN routes r ON t.route_id = r.route_id
       WHERE t.route_id = ? AND t.status = 'active'`,
      [req.params.routeId]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to track bus', error: error.message });
  }
};

exports.getEtaToStop = async (req, res) => {
  try {
    const { tripId, stopId } = req.params;

    const [[trip]] = await pool.query('SELECT current_lat, current_lng FROM trips WHERE trip_id = ?', [tripId]);
    const [[stop]] = await pool.query('SELECT latitude, longitude FROM stops WHERE stop_id = ?', [stopId]);

    if (!trip || !stop) {
      return res.status(404).json({ message: 'Trip or stop not found' });
    }

    const km = haversineKm(Number(trip.current_lat), Number(trip.current_lng), Number(stop.latitude), Number(stop.longitude));
    const avgBusSpeedKmH = 30;
    const etaMinutes = Math.max(1, Math.round((km / avgBusSpeedKmH) * 60));

    return res.json({ tripId, stopId, distanceKm: km.toFixed(2), etaMinutes });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to calculate ETA', error: error.message });
  }
};
