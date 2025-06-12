const asyncHandler = require("express-async-handler");
const {Book, validateCreateBook, validateUpdateBook} = require("../models/books")


/**
 * @desc get all books
 * @route /api/books
 * @method Get
 * @access puplic
 */

const getAllBooks = asyncHandler( async (req, res) => {
    //comparison Query operators
    // $eq (aqual)
    // $ne (not equal)
    // $lt (less than)
    // $lte (less than and equal)
    // $gt (less than and equal)
    const {minPrice, maxPrice} = req.query;
    let books;
    if (minPrice && maxPrice)
    {
         books = await Book.find({price: {$gt: minPrice, $lte: maxPrice}}) 
        .populate("author", ["_id", "firstName", "lastName"]);
    }
    else
        books = await Book.find() 
        .populate("author", ["_id", "firstName", "lastName"]);
    res.status(200).json(books);
})

/**
 * @desc get book by id
 * @route /api/books/:id
 * @method Get
 * @access puplic
 */
const getBookById= asyncHandler(async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id).populate("author");
    if (book)
    {
        res.status(200).json(book);
        return ;
    }
    res.status(404).json({message: "no such book"});
})

/**
 * @desc create new book
 * @route /api/books/:id
 * @method Post
 * @access private(only admin)
 */
const createNewBook = asyncHandler(async (req, res) => {

    const {error} = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
        title: req.body.title, 
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(result);
})



/**
 * @desc update a book
 * @route /api/books/:id
 * @method Put
 * @access private (only admin)
 */
const updateABook = asyncHandler(async (req, res) => {
    const {error} = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const id = req.params.id;

    const updatedBook = await Book.findByIdAndUpdate(id, {
        $set: {
        title: req.body.title, 
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
    }
    }, {new: true})
    res.status(200).json(updatedBook);
})


/**
 * @desc delete a book
 * @route /api/books/:id
 * @method Delete
 * @access private (only admin)
 */
const deleteABook = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const book = await Book.findByIdAndDelete(id);
    if (book)
    {
        res.status(200).json({message: "book has been deleted"})
    }
    else
    res.status(404).json("book not found");

})

module.exports = {getAllBooks, getBookById, createNewBook,
    updateABook,
    deleteABook
};