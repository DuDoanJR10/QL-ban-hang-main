const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    codeStaff: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    nameStaff: {
        type: String,
        required: true,
    },

    phoneStaff: {
        type: String,
    }
})

module.exports = mongoose.model('users', UserSchema)