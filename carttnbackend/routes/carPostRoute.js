const router = require('express').Router();
const carPostController = require('../controllers/carPostController');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');


 
router.route('/').post(verifyToken,photoUpload.single('image'),carPostController)

module.exports = router;