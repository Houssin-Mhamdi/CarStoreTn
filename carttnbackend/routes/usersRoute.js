const router = require('express').Router()
const { getAllUsersCtrl, getUserProfileCtrl, getUsersCountCtrl, updateUserProfileCtrl } = require('../controllers/usersController')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require('../middlewares/verifyToken')


//router.get('/profile/:id', getUserProfileCtrl)
router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl)
router.route('/profile/:id')
    .get(validateObjectId, getUserProfileCtrl)
    .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl)

module.exports = router