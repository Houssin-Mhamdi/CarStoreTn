const asyncHandler = require('express-async-handler')
const { User } = require('../models/User.js')
/**----------------------------------------------------------------
 * @desc Get all Users
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 ---------------------------------------------------------------**/
 module.exports.getAllUsersCtrl = asyncHandler(async(req, res)=>{
   const users = await User.find()
   res.status(200).json(users)
 })