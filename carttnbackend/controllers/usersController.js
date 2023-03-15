const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary.js')
const { User, validateUpdateUser } = require('../models/User.js')

/**----------------------------------------------------------------
 * @desc Get all Users
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 ---------------------------------------------------------------**/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
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
    }, { new: true }).select('-password')

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

/**----------------------------------------------------------------
 * @desc Profile phot Upload
 * @route /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only logged in user)
 ---------------------------------------------------------------**/
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
    //1. Validation
    if (!req.file) {
        return res.status(400).json({ message: 'no file provided' })
    }

    // 2. Get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

    // 3. Upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath)
    console.log(result);
    // 4. Get the user from DB
    const user = await User.findById(req.user.id)
    // 5. Delete the old profile photo if exist
    if (user.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId)
    }
    // 6. Change the profilePhoto field in the DB
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await user.save()
    //7.  Send response to client
    res.status(200).json({
        message: 'your profile photo uploaded successfully',
        profilePhoto: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })

    //8.Remove image from the server 
    fs.unlinkSync(imagePath)
})