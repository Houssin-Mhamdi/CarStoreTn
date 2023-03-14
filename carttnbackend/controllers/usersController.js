const asyncHandler = require('express-async-handler')
const { User } = require('../models/User.js')

/**----------------------------------------------------------------
 * @desc Get all Users
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 ---------------------------------------------------------------**/
 module.exports.getAllUsersCtrl = asyncHandler(async(req, res)=>{
    const users = await User.find().select("-password")
    res.status(200).json(users)
  })

  /**----------------------------------------------------------------
 * @desc Get User by id
 * @route /api/users/profile/:id
 * @method GET
 * @access public
 ---------------------------------------------------------------**/
 module.exports.getUserProfileCtrl = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select("-password")
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    res.status(200).json(user)
  })