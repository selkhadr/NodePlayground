const express = require("express");
const router = express.Router();
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../models/Authors");
const authors = [
    {
        "id": 1,
        "name": "author 1",
        "description": "author 1 description"
    },
    {
        "id": 2,
        "name": "author 2",
        "description": "author 2 description"
    },
    {
        "id": 3,
        "name": "author 3",
        "description": "author 3 description"
    }
]

/**
 * @descp get all authors
 * @method Get
 * @url /api/authors/
 * @access public
 */
router.get("/", async (req, res)=>{
    try {
        const authorList = await Author.find().sort({firstName: -1}).select("firstName lastName"); 
        res.status(200).json(authorList);
    }
    catch(error)
    {
        res.send(error)
    }
})

/**
 * @descp get author by id
 * @method Get
 * @url /api/authors/:id
 * @access public
 */
router.get("/:id", async (req, res)=>{
    try{
        const id  = req.params.id;
        const author = await Author.findById(id);
        res.status(200).json(author);
    }
    catch(error)
    {
        res.send("author not found");
    }
})

/**
 * @descp create new author
 * @method Post
 * @url /api/authors/
 * @access public
 */
router.post("/", async(req, res)=>{
    const {error} = validateCreateAuthor(req.body);
    if (error)
        return res.send(error.details[0].message);
    try{
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        });
        const result = await author.save();
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
})


/**
 * @descp update an author
 * @method Put
 * @url /api/authors/:id
 * @access public
 */
router.put("/:id", async (req, res)=>{
    try{
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
    catch(error)
    {
        res.status(404).json("author not found");
    }
})

/**
 * @descp delete an author
 * @method Delete
 * @url /api/authors/:id
 * @access public
 */
router.delete("/:id", async (req, res)=>{
    try{
        const id = req.params.id;
    
        const author = await Author.findByIdAndDelete(id); 
        if (!author)
        {
            return res.status(404).json({message: "Author not found"});
        }   
        res.status(200).json({message: "author has been deleted"});
    }
    catch(error)
    {
        res.status(404).json("author not found");
    }
})



module.exports = router;