const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic', 'CVT'],
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric'],
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    discription: {
        type: String,
        trim: true,
    },
    image: {
        type: Object,
        default: {
            url: '',
            publicId: null,
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['cars', 'motors', 'van'],
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, { timestamps: true })

const CarPost = mongoose.model('CarPost', CarSchema)

// validation creat car
function validateCreateCar(obj) {
    const schema = Joi.object({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().required(),
        color: Joi.string().required(),
        mileage: Joi.number().required(),
        price: Joi.number().required(),
        transmission: Joi.string().valid('Manual', 'Automatic', 'CVT').required(),
        fuelType: Joi.string().valid('Gasoline', 'Diesel', 'Electric').required(),
        category: Joi.string().valid('cars', 'motors', 'van').required(),
        discription: Joi.string().trim().required(),

    })
    return schema.validate(obj)
}

//validate update car
function validateUpdateCar(obj) {
    const schema = Joi.object({
        make: Joi.string(),
        model: Joi.string(),
        year: Joi.number(),
        color: Joi.string(),
        mileage: Joi.number(),
        price: Joi.number(),
        transmission: Joi.string().valid('Manual', 'Automatic', 'CVT'),
        fuelType: Joi.string().valid('Gasoline', 'Diesel', 'Electric'),
        category: Joi.string().valid('cars', 'motors', 'van'),
        discription: Joi.string().trim(),

    })
    return schema.validate(obj)
}


module.exports = {
    CarPost, validateCreateCar, validateUpdateCar
}