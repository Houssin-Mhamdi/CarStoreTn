const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");


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
        type: Object,
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
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 15,
    },

}, {
    timestamps: true,
})

//generate token
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECTET)
}

//User Model
const User = mongoose.model("User", UserSchema)


//validate register user
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().trim().min(3).max(100).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        phonenumber: Joi.string().min(8).max(15).pattern(new RegExp('^[0-9]*$')).required(),
    })
    return schema.validate(obj)
}

//validate Login user
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
    return schema.validate(obj)
}
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
}