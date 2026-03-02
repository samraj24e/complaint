const express = require('express');
const {
  dashboardStats,
  createBus,
  getBuses,
  updateBus,
  deleteBus,
  createRoute,
  addStopToRoute,
  getActiveTrips
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', dashboardStats);
router.route('/buses').get(getBuses).post(createBus);
router.route('/buses/:id').put(updateBus).delete(deleteBus);
router.post('/routes', createRoute);
router.post('/stops', addStopToRoute);
router.get('/trips/active', getActiveTrips);

module.exports = router;
