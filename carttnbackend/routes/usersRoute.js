const router = require('express').Router()
const { getAllUsersCtrl, getUserProfileCtrl, getUsersCountCtrl, updateUserProfileCtrl, profilePhotoUploadCtrl, deleteUserProfileCtrl } = require('../controllers/usersController')
const photoUpload = require('../middlewares/photoUpload')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require('../middlewares/verifyToken')


//router.get('/profile/:id', getUserProfileCtrl)
router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl)
router
    .route('/profile/:id')
    .get(validateObjectId, getUserProfileCtrl)
    .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
    .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl)

router.route('/profile/profile-photo-upload')
    .post(verifyToken, photoUpload.single('image'), profilePhotoUploadCtrl)

router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl)

module.exports = router 