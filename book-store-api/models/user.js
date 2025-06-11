const mongoose = require("mongoose");
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

function validateRegisterUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).required().email(),
        username: Joi.string().trim().min(2).max(200).required(),
        password: Joi.string().trim().min(6).required(),
        isAdmin: Joi.bool(),
    })
    return schema.validate(obj);
}

function validateLoginterUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).required().email(),
        password: Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}

function validateUpdateUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(5).email(),
        username: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(6),
        isAdmin: Joi.bool(),
    })
    return schema.validate(obj);
}

module.exports = {User,
    validateLoginterUser,
    validateRegisterUser,
    validateUpdateUser
};
