const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3,
        maxlenght: 200
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3,
        maxlenght: 200
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlenght: 2,
        maxlenght: 100
    },
    image: {
        type: String,
        default: "defaulmt-avatar"
    }
}, {timestamps: true});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = {Author};