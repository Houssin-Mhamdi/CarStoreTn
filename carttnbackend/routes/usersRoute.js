const router = require('express').Router()
const { getAllUsersCtrl, getUserProfileCtrl } = require('../controllers/usersController')


router.get('/profile', getAllUsersCtrl)
router.get('/profile/:id', getUserProfileCtrl)
//router.route('profile/:id').get(getUserProfileCtrl)
module.exports = router