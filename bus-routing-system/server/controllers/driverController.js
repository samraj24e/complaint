const pool = require('../config/db');

exports.getAssignedBusAndRoute = async (req, res) => {
  try {
    const driverId = req.user.id;
    const [rows] = await pool.query(
      `SELECT b.bus_id, b.bus_number, b.capacity, t.trip_id, t.status, r.route_id, r.route_name, r.start_point, r.end_point
       FROM buses b
       LEFT JOIN trips t ON t.bus_id = b.bus_id AND t.status IN ('active', 'scheduled')
       LEFT JOIN routes r ON t.route_id = r.route_id
       WHERE b.driver_id = ?`,
      [driverId]
    );

    return res.json(rows[0] || null);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch assignment', error: error.message });
  }
};

exports.startTrip = async (req, res) => {
  try {
    const { bus_id, route_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO trips (bus_id, route_id, status, current_lat, current_lng) VALUES (?, ?, 'active', 0, 0)",
      [bus_id, route_id]
    );

    return res.status(201).json({ message: 'Trip started', trip_id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to start trip', error: error.message });
  }
};

exports.endTrip = async (req, res) => {
  try {
    await pool.query("UPDATE trips SET status = 'completed' WHERE trip_id = ?", [req.params.tripId]);
    return res.json({ message: 'Trip ended successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to end trip', error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { trip_id, current_lat, current_lng } = req.body;
    await pool.query('UPDATE trips SET current_lat = ?, current_lng = ? WHERE trip_id = ?', [current_lat, current_lng, trip_id]);

    const io = req.app.get('io');
    io.emit('bus:location:update', { trip_id, current_lat, current_lng, updatedAt: new Date().toISOString() });

    return res.json({ message: 'Location updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update location', error: error.message });
  }
};

exports.markStopCompleted = async (req, res) => {
  try {
    const { trip_id, stop_id } = req.body;
    await pool.query('INSERT INTO trip_stop_logs (trip_id, stop_id, completed_at) VALUES (?, ?, NOW())', [trip_id, stop_id]);
    return res.json({ message: 'Stop marked as completed' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to mark stop', error: error.message });
  }
};
