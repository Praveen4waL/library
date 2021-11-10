const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const librarianSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    created: { type: Date, default: Date.now }
})

librarianSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('librarian', librarianSchema)