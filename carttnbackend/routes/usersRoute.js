const router = require('express').Router()
const { getAllUsersCtrl, getUserProfileCtrl, getUsersCountCtrl } = require('../controllers/usersController')
const validateObjectId = require('../middlewares/validateObjectId')


router.get('/profile', getAllUsersCtrl)
//router.get('/profile/:id', getUserProfileCtrl)
router.route('/profile/:id').get(validateObjectId,getUserProfileCtrl)
router.route('/count').get(getUsersCountCtrl)
module.exports = router