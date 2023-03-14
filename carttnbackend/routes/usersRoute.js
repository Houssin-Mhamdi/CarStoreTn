const router = require('express').Router()
const { getAllUsersCtrl } = require('../controllers/usersController')


router.get('/profile', getAllUsersCtrl)
module.exports = router