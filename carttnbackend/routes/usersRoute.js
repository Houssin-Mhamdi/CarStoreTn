const router = require('express').Router()
const { getAllUsersCtrl, getUserProfileCtrl } = require('../controllers/usersController')
const validateObjectId = require('../middlewares/validateObjectId')


router.get('/profile', getAllUsersCtrl)
//router.get('/profile/:id', getUserProfileCtrl)
router.route('/profile/:id').get(validateObjectId,getUserProfileCtrl)
module.exports = router