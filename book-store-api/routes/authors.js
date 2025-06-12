const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

const {getAllAuthors,
    getAuthorById,
    createNewAuthor,
    updateAnAuthor,
    deleteAnAuthor
}= require("../controllers/authorsController")

router.get("/", getAllAuthors);


router.get("/:id", getAuthorById);


router.post("/",verifyTokenAndAdmin, createNewAuthor);



router.put("/:id",verifyTokenAndAdmin , updateAnAuthor);


router.delete("/:id",verifyTokenAndAdmin , deleteAnAuthor);



module.exports = router;