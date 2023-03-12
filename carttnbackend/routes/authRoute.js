const router = require('express').Router()
const { registerUserCtrl } = require('../controllers/authController.js')

// api/auth/register

router.post('/register',registerUserCtrl)


module.exports = router