const asyncHandler = require('express-async-handler')
const { Vehicle } = require('../models/Vehicle.js')

/**----------------------------------------------------------------
 * @desc Ceate Vehicle
 * @route /api/Vehicle
 * @method POST
 * @access private (only logedin users)
 ---------------------------------------------------------------**/

 module.exports.createVehicleController = asyncHandler( async(req,res)=>{

    const vehicle = await Vehicle.create({
        name:req.body.name,
    })
    res.status(201).json(vehicle)

 })