const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodSchema = new Schema({
    codeProduct: {
        type: String,
        required: true,
    },

    productName: {
        type: String,
        required: true,
    },

    priceCapital: {
        type: Number,
        required: true,
    },

    priceSell: {
        type: Number,
        required: true
    },

    inventory: {
        type: Number,
        required: true
    },

    filePath: {
        type: String,
        default: 'defaultProduct.jpg'
    }
})

module.exports = mongoose.model('goods', GoodSchema)