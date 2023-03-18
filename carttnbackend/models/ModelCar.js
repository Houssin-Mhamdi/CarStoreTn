const mongoose = require('mongoose');

const ModelCarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    carpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarPost',
        required: true
    },
}, { timestamps: true })

const ModelCar = mongoose.model('ModelCar', ModelCarSchema)

module.exports = {
    ModelCar
} 