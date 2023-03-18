const router = require('express').Router();
const { createVehicleController } = require('../controllers/vehicleController');




router.route('/vehicle').post(createVehicleController)

module.exports = router;