const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuerySchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    pnr: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,

    },
    solutionbyai: {
        type: String,
        required: true,
    },
    resolution: {
        type: String,
        default: null,

    },
    contact: {
        type: String,
        required: true,
    },
})
const Query = mongoose.model('Query', QuerySchema);
module.exports = Query;