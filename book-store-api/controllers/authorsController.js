const asyncHandler = require("express-async-handler");
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../models/Authors");


/**
 * @descp get all authors
 * @method Get
 * @url /api/authors/
 * @access public
 */
const getAllAuthors = asyncHandler(
    async (req, res)=>{
        const {pageNumber} = req.query;
        const authorsPerPage = 2;
        const authorList = await Author.find()
        .skip((pageNumber - 1)* authorsPerPage)
        .limit(authorsPerPage);
        res.status(200).json(authorList);
    }
)

/**
 * @descp get author by id
 * @method Get
 * @url /api/authors/:id
 * @access public
 */
const getAuthorById = asyncHandler(
    async (req, res)=>{
        const id  = req.params.id;
        const author = await Author.findById(id);
        res.status(200).json(author);
}
)

/**
 * @descp create new author
 * @method Post
 * @url /api/authors/
 * @access private(only admin)
 */
const createNewAuthor = asyncHandler(
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
)

/**
 * @descp update an author
 * @method Put
 * @url /api/authors/:id
 * @access private(only admine)
 */
const updateAnAuthor = asyncHandler(
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
)

/**
 * @descp delete an author
 * @method Delete
 * @url /api/authors/:id
 * @access private(only admin)
 */
const deleteAnAuthor= asyncHandler(
    async (req, res)=>{
        const id = req.params.id;
    
        const author = await Author.findByIdAndDelete(id); 
        if (!author)
        {
            return res.status(404).json({message: "Author not found"});
        }   
        res.status(200).json({message: "author has been deleted"});
})

module.exports = {getAllAuthors
    ,getAuthorById
    ,createNewAuthor
    ,updateAnAuthor
    ,deleteAnAuthor
}