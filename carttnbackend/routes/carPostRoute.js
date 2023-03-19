const router = require('express').Router();
const { createCarPostCrtl, getAllCarPostCrtl, getSingleCarPostCtrl, getCarPostCountCtrl } = require('../controllers/carPostController');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');



router.route('/')
      .post(verifyToken, photoUpload.single('image'), createCarPostCrtl)
      .get(getAllCarPostCrtl)


router.route('/count')
      .get(getCarPostCountCtrl)


router.route('/:id')
      .get(validateObjectId, getSingleCarPostCtrl)

module.exports = router;