const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const { User, validateUpdateUser } = require('../models/User.js')

/**----------------------------------------------------------------
 * @desc Get all Users
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 ---------------------------------------------------------------**/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({message: "not allowed, only admin"})
    }
    const users = await User.find().select("-password")
    res.status(200).json(users)
})

/**----------------------------------------------------------------
* @desc Get User by id
* @route /api/users/profile/:id
* @method GET
* @access public
---------------------------------------------------------------**/
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    res.status(200).json(user)
})

/**----------------------------------------------------------------
* @desc Get User by id
* @route /api/users/profile/:id
* @method GET
* @access public
---------------------------------------------------------------**/
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            street: req.body.street,
            country: req.body.country,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
        }
    },{new:true}).select('-password')

    res.status(200).json(updatedUser)
})
/**----------------------------------------------------------------
 * @desc Get Users Count
 * @route /api/users/count
 * @method GET
 * @access private (only admin)
 ---------------------------------------------------------------**/
 module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
    const count = await User.count()
    res.status(200).json(count)
})