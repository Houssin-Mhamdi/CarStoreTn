const router = require('express').Router();
const modelCarController = require('../controllers/modelCarController');


router.route('/model').post(modelCarController)

module.exports = router;