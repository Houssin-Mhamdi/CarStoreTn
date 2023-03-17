const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const { User, validateRegisterUser, validateLoginUser } = require('../models/User.js')

/**----------------------------------------------------------------
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 ---------------------------------------------------------------**/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    //validation
    const { error } = validateRegisterUser(req.body)
    if (error) {
        //400 bad request user give wrong information problem form user not from server
        return res.status(400).json({ message: error.details[0].message })
    }
    //is user already exist
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ message: 'User already exists' })
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // new user and save it to database
    user = new User({
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: hashedPassword,
    })
    await user.save()
    //send a response to client
    //201 created successfully
    res.status(201).json({ message: 'you registered successfully , please log in' })
})

/**----------------------------------------------------------------
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 ---------------------------------------------------------------**/
module.exports.loginUserCtrl = asyncHandler(async (req,res) => {
    // 1, validation|
    const { error } = validateLoginUser(req.body)
    if (error) {
        //400 bad request user give wrong information problem form user not from server
        return res.status(400).json({ message: error.details[0].message })
    }
    // 2. is user exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // 3. check the password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' })
    }

    // 4. generate token (jwt)
    const token = user.generateAuthToken()
    // 5. response to client
    res.status(200).json({
        _id: user.id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token: token
    })

})

