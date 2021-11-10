const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const issueSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    bookId: { type: Schema.Types.ObjectId, ref: 'book' },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    dateOfIsuue: { type: Date, default: Date.now },
    dueDate: { type: Date }
})
module.exports = mongoose.model('bookIssued', issueSchema)
