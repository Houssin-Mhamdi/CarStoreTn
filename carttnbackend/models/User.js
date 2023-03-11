const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    lastname: {
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
        minlength: 3,
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
    createdAt: {
        type: Date,

    },
}, {
    timestamps: true,
})

//User Model
const User = mongoose.model("User", UserSchema)

module.exports = {
    User
}