const asyncHandler = require('express-async-handler')
const path = require('path')
const fs = require('fs')
const { cloudinaryUploadImage } = require('../utils/cloudinary.js')
const { CarPost, validateCreateCar } = require('../models/CarPost.js')


/**----------------------------------------------------------------
 * @desc Ceate car post
 * @route /api/carposts
 * @method POST
 * @access private (only logedin users)
 ---------------------------------------------------------------**/

module.exports.createCarPostCrtl = asyncHandler(async (req, res) => {
    //1.validation for images
    if (!req.file) {
        return res.status(400).json({ message: 'no image provided' })
    }
    //2.validation for data
    const { error } = validateCreateCar(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    //3.Upload photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUploadImage(imagePath)
    //4.Create Car Post and save it to db
    const carPost = await CarPost.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        mileage: req.body.mileage,
        price: req.body.price,
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        category: req.body.category,
        discription: req.body.discription,
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })
    //5.send response to the client
    res.status(201).json(carPost)
    //6.remove image from the server
    fs.unlinkSync(imagePath)
})
/**-----------------------------------------------
 * @desc    Get All Posts
 * @route   /api/posts
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllCarPostCrtl = asyncHandler(async (req, res) => {
    const POST_PER_PAGE = 3
    const { pageNumber, category } = req.query
    let carposts
    if (pageNumber) {
        carposts = await CarPost.find()
            .skip((pageNumber - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({ createdAt: -1 })
            .populate('user', ['-password'])
    } else if (category) {
        carposts = await CarPost.find({ category })
            .sort({ createdAt: -1 })
            .populate('user', ['-password'])
    } else {
        carposts = await CarPost.find()
            .sort({ createdAt: -1 })
            .populate('user', ['-password'])
    }
    res.status(200).json(carposts)
}) 

/**-----------------------------------------------
 * @desc    Get Single Post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/

 module.exports.getSingleCarPostCtrl = asyncHandler(async (req, res) => {
    const carpost = await CarPost.findById(req.params.id)
    .populate("user", ["-password"])
    
    
    if (!carpost) {
      return res.status(404).json({ message: "post not found" });
    }
  
    res.status(200).json(carpost);
  });
  
  /**-----------------------------------------------
   * @desc    Get Posts Count
   * @route   /api/posts/count
   * @method  GET
   * @access  public
   ------------------------------------------------*/
  module.exports.getCarPostCountCtrl = asyncHandler(async (req, res) => {
    const count = await CarPost.count();
    res.status(200).json(count);
  });