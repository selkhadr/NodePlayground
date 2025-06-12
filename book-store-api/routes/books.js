const express = require("express");


const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

const {getAllBooks, getBookById,
    createNewBook,
    updateABook,
    deleteABook
}= require("../controllers/bookController")

router.route("/").get(getAllBooks)
.post(verifyTokenAndAdmin , createNewBook);

router.route("/:id")
    .get(getBookById)
    .put(verifyTokenAndAdmin , updateABook)
    .delete(verifyTokenAndAdmin , deleteABook);

module.exports = router;