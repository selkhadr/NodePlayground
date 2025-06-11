const mongoose = require("mongoose");
const joi = require("joi");

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

function validateCreateAuthor(obj)
{
    const schema = joi.object({
        firstName: joi.string().trim().min(3).max(200).required(),
        lastName: joi.string().trim().min(3).max(200).required(),
        nationality: joi.string().trim().min(2).max(100).required(),
        image: joi.string(),
    })
    return schema.validate(obj);
}

function validateUpdateAuthor(obj)
{
    const schema = joi.object({
        firstName: joi.string().trim().min(3).max(200),
        lastName: joi.string().trim().min(3).max(200),
        nationality: joi.string().trim().min(2).max(100),
        image: joi.string(),
    })
    return schema.validate(obj); 
}


module.exports = {Author,
    validateCreateAuthor,
    validateUpdateAuthor
};