const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 15,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: object,
        default: {
            url: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
            publicId: null,
        },
    },
    country: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    street: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    phonenumber: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 100,
    },

}, {
    timestamps: true,
})

//User Model
const User = mongoose.model("User", UserSchema)


//validate register user
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().trim().min(3).max(100).required().email(),
        password: Joi.string().trim().min(8).max(100).required(),
    })
    return schema.validate(obj)
}
module.exports = {
    User,
    validateRegisterUser
}