const express = require('express');
const {
  getRoutes,
  getStopsByRoute,
  trackLiveBus,
  getEtaToStop
} = require('../controllers/passengerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('passenger', 'admin'));

router.get('/routes', getRoutes);
router.get('/routes/:routeId/stops', getStopsByRoute);
router.get('/routes/:routeId/live', trackLiveBus);
router.get('/eta/:tripId/:stopId', getEtaToStop);

module.exports = router;
