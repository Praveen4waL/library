const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    allocId: { type: String },
    dateOfMembership: { type: Date, default: Date.now }
})

module.exports = mongoose.model('user', userSchema)