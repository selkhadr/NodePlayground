const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {User, validateUpdateUser} = require("../models/user");
const bcrypt = require("bcryptjs");
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("../middlewares/verifyToken");

/**
 * @descp update  User
 * @method Put
 * @url /api/users/:id
 * @access private
 */
router.put("/:id", verifyTokenAndAuthorization, asyncHandler(async(req, res)=>{
    if(req.user.id !== req.params.id)
    {
        return res.status(403).json({message: 'you are not allowed, you only can update your profile'});
    }
    const {error} = validateUpdateUser(req.body);
    if (error)
        return res.status(400).json({message: error.details[0].message + "error f validateupdate"});
    console.log(req.headers);
 
    if (req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    }}, {new: true}).select("-password");
    console.log("good in update route");
    res.status(200).json(updatedUser);
}))

/**
 * @descp get all Users
 * @method get
 * @url /api/users
 * @access private(only admin)
 */
router.get("/", verifyTokenAndAdmin, asyncHandler(async(req, res)=>{
    const users = await User.find().select("-passwprd");
    
    res.status(200).json(users);
}))


module.exports= router; 