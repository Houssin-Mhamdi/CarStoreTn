const asyncHandler = require('express-async-handler')
const { ModelCar} = require('../models/ModelCar')


/**----------------------------------------------------------------
 * @desc Ceate car post
 * @route /api/carposts
 * @method POST
 * @access private (only logedin users)
 ---------------------------------------------------------------**/

module.exports = createCarmodelCrtl = asyncHandler(async (req, res) => {
    const modelcar = await ModelCar.create({
        make:req.body.make,
        model:req.body.model,
        carpost:req.body.carpost,
    })
    res.status(201).json(modelcar)
    console.log(modelcar);
})