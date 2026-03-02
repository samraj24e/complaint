const express = require('express');
const {
  getAssignedBusAndRoute,
  startTrip,
  endTrip,
  updateLocation,
  markStopCompleted
} = require('../controllers/driverController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('driver'));

router.get('/assignment', getAssignedBusAndRoute);
router.post('/trip/start', startTrip);
router.put('/trip/:tripId/end', endTrip);
router.put('/location', updateLocation);
router.post('/stop/completed', markStopCompleted);

module.exports = router;
