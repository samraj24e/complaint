const pool = require('../config/db');

exports.dashboardStats = async (_req, res) => {
  try {
    const [[busCount]] = await pool.query('SELECT COUNT(*) AS totalBuses FROM buses');
    const [[driverCount]] = await pool.query("SELECT COUNT(*) AS totalDrivers FROM users WHERE role = 'driver'");
    const [[routeCount]] = await pool.query('SELECT COUNT(*) AS totalRoutes FROM routes');
    const [[tripCount]] = await pool.query("SELECT COUNT(*) AS activeTrips FROM trips WHERE status = 'active'");

    return res.json({ ...busCount, ...driverCount, ...routeCount, ...tripCount });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};

exports.createBus = async (req, res) => {
  try {
    const { bus_number, capacity, driver_id } = req.body;
    const [result] = await pool.query('INSERT INTO buses (bus_number, capacity, driver_id) VALUES (?, ?, ?)', [bus_number, capacity, driver_id || null]);
    return res.status(201).json({ message: 'Bus created', bus_id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create bus', error: error.message });
  }
};

exports.getBuses = async (_req, res) => {
  try {
    const [buses] = await pool.query(
      `SELECT b.bus_id, b.bus_number, b.capacity, b.driver_id, u.name AS driver_name
       FROM buses b
       LEFT JOIN users u ON b.driver_id = u.id`
    );
    return res.json(buses);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch buses', error: error.message });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { bus_number, capacity, driver_id } = req.body;
    await pool.query('UPDATE buses SET bus_number = ?, capacity = ?, driver_id = ? WHERE bus_id = ?', [bus_number, capacity, driver_id || null, id]);
    return res.json({ message: 'Bus updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update bus', error: error.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    await pool.query('DELETE FROM buses WHERE bus_id = ?', [req.params.id]);
    return res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete bus', error: error.message });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const { route_name, start_point, end_point } = req.body;
    const [result] = await pool.query('INSERT INTO routes (route_name, start_point, end_point) VALUES (?, ?, ?)', [route_name, start_point, end_point]);
    return res.status(201).json({ message: 'Route created', route_id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create route', error: error.message });
  }
};

exports.addStopToRoute = async (req, res) => {
  try {
    const { route_id, stop_name, stop_order, latitude, longitude } = req.body;
    const [result] = await pool.query(
      'INSERT INTO stops (route_id, stop_name, stop_order, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
      [route_id, stop_name, stop_order, latitude, longitude]
    );
    return res.status(201).json({ message: 'Stop added', stop_id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add stop', error: error.message });
  }
};

exports.getActiveTrips = async (_req, res) => {
  try {
    const [trips] = await pool.query(
      `SELECT t.trip_id, t.status, t.current_lat, t.current_lng, b.bus_number, r.route_name
       FROM trips t
       JOIN buses b ON t.bus_id = b.bus_id
       JOIN routes r ON t.route_id = r.route_id
       WHERE t.status = 'active'`
    );
    return res.json(trips);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active trips', error: error.message });
  }
};
