const asyncHandler = require('express-async-handler')
const path = require('path')
const fs = require('fs')
const { cloudinaryUploadImage } = require('../utils/cloudinary.js')
const { CarPost, validateCreateCar } = require('../models/CarPost.js')


/**----------------------------------------------------------------
 * @desc Get all Users
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 ---------------------------------------------------------------**/