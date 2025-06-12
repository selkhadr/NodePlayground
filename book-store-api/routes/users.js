const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("../middlewares/verifyToken");
const {updateUser,
    getAllUsers,
    getUserById,
    deleteUserById
} = require("../controllers/userController");

router.route(":id")
.get(verifyTokenAndAdmin, getUserById)
.put(verifyTokenAndAuthorization, updateUser)
.delete(verifyTokenAndAuthorization, deleteUserById);


router.get("/", verifyTokenAndAdmin, getAllUsers);


module.exports= router; 