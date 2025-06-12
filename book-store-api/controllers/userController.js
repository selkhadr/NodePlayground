const asyncHandler = require("express-async-handler");
const {User, validateUpdateUser} = require("../models/user");
const bcrypt = require("bcryptjs");



/**
 * @descp update  User
 * @method Put
 * @url /api/users/:id
 * @access private
 */
const updateUser =  asyncHandler(async(req, res)=>{
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
})

/**
 * @descp get all Users
 * @method get
 * @url /api/users
 * @access private(only admin)
 */
const getAllUsers = asyncHandler(async(req, res)=>{
    const users = await User.find().select("-passwprd");
    
    res.status(200).json(users);
})


/**
 * @descp get User by id
 * @method get
 * @url /api/user/:id
 * @access private(only admin & user himself)
 */
const getUserById =  asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select("password");
    if (user)
        res.status(200).json(user);
    else
        res.status(404).json({message: "user not found"});
})

/**
 * @descp delete user by id
 * @method delete
 * @url /api/user/:id
 * @access private(only admin & user himself)
 */
const deleteUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select("password");
    if (user)
        {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "user deleted successfully"});
    }
    else
        res.status(404).json({message: "user not found"});
})

module.exports = {updateUser,
    getAllUsers,
    getUserById,
    deleteUserById
}