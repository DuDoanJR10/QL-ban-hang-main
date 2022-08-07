const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    codeInvoice: {
        type: String,
        required: true,
    },

    nameSeller: {
        type: String,
        required: true
    },

    nameGuest: {
        type: String,
    },

    addressGuest: {
        type: String,
    },

    phoneGuest: {
        type: String,
    },

    paymentType: {
        type: String,
        required: true
    },

    productsBuying: {
        type: Array,
        required: true
    },

    totalMoney: {
        type: String,
        required: true
    },

    createAt: {
        type: String,
        default: new Date().toLocaleString()
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('invoices', InvoiceSchema)