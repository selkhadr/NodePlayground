const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../models/Authors");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

/**
 * @descp get all authors
 * @method Get
 * @url /api/authors/
 * @access public
 */
router.get("/", asyncHandler(
    async (req, res)=>{
        const authorList = await Author.find().sort({firstName: -1}).select("firstName lastName"); 
        res.status(200).json(authorList);
    }
))

/**
 * @descp get author by id
 * @method Get
 * @url /api/authors/:id
 * @access public
 */
router.get("/:id", asyncHandler(
    async (req, res)=>{
        const id  = req.params.id;
        const author = await Author.findById(id);
        res.status(200).json(author);
}
))

/**
 * @descp create new author
 * @method Post
 * @url /api/authors/
 * @access private(only admin)
 */
router.post("/",verifyTokenAndAdmin , asyncHandler(
    async(req, res)=>{
    const {error} = validateCreateAuthor(req.body);
    if (error)
        return res.send(error.details[0].message);
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });
        const result = await author.save();
        res.status(201).json(result);
}
))


/**
 * @descp update an author
 * @method Put
 * @url /api/authors/:id
 * @access private(only admine)
 */
router.put("/:id",verifyTokenAndAdmin , asyncHandler(
    async (req, res)=>{
        const {error} = validateUpdateAuthor(req.body);
        if (error)
            return res.send(error.details[0].message);
        const id = req.params.id;
    
        const author = await Author.findByIdAndUpdate(id, {
            $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
    }}, {new: true});
        res.status(200).json({author})
}
))

/**
 * @descp delete an author
 * @method Delete
 * @url /api/authors/:id
 * @access private(only admin)
 */
router.delete("/:id",verifyTokenAndAdmin ,asyncHandler(
    async (req, res)=>{
        const id = req.params.id;
    
        const author = await Author.findByIdAndDelete(id); 
        if (!author)
        {
            return res.status(404).json({message: "Author not found"});
        }   
        res.status(200).json({message: "author has been deleted"});
}
))



module.exports = router;