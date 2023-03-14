const router = require('express').Router()
const { getAllUsersCtrl, getUserProfileCtrl, getUsersCountCtrl } = require('../controllers/usersController')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyToken } = require('../middlewares/verifyToken')


//router.get('/profile/:id', getUserProfileCtrl)
router.route('/profile').get(verifyToken, getAllUsersCtrl)
router.route('/profile/:id').get(validateObjectId, getUserProfileCtrl)
router.route('/count').get(getUsersCountCtrl)

module.exports = router