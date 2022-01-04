const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String, required: [true, 'Please provide a email']
        , unique: true
    },
    password: { type: String, required: [true, 'Please provide a valid email'] },
    isAdmin: {
        type: Boolean,
        default: false,
    }

},
    { timestamps: true }
) 

module.exports = mongoose.model('User',UserSchema)