const router = require('express').Router();
const { createCarPostCrtl } = require('../controllers/carPostController');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');


 
router.route('/')
      .post(verifyToken,photoUpload.single('image'),createCarPostCrtl)

module.exports = router;