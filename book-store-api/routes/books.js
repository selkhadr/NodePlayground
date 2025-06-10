const express = require("express");
const Joi = require('joi');

const router = express.Router();


const books = [
    {
        "id": 1,
        "name": "talala",
        "author": "sara"
    },
    {
        "id": 2,
        "name": "book",
        "author": "author name"
    }
]


/**
 * @desc get all books
 * @route /api/books
 * @method Get
 * @access puplic
 */

router.get("/", (req, res) => {
    res.json(books);
})


/**
 * @desc get book by id
 * @route /api/books/:id
 * @method Get
 * @access puplic
 */
router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const book = books.find(b => b.id === parseInt(id));
    if (book)
    {
        res.status(200).json(book);
        return ;
    }
    res.send("no such book");
})


/**
 * @desc create new book
 * @route /api/books/:id
 * @method Post
 * @access puplic
 */
router.post("/", (req, res) => {

    const {error} = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = {
        id: books.length + 1,
        name: req.body.name, 
        author: req.body.author
    };

    books.push(book);
    res.status(201).json(book);
});

/**
 * @desc update a book
 * @route /api/books/:id
 * @method Put
 * @access puplic
 */
router.put("/:id", (req, res) => {
    const {error} = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const id = req.params.id;

    const book = books.find(bk => bk.id === parseInt(id));
    if (book)
    {

        res.status(200).json({message: "book has been updated"})
    }
    else
    res.status(404).json("book not found");

})


/**
 * @desc delete a book
 * @route /api/books/:id
 * @method Delete
 * @access puplic
 */
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const book = books.find(bk => bk.id === parseInt(id));
    if (book)
    {
        res.status(200).json({message: "book has been deleted"})
    }
    else
    res.status(404).json("book not found");

})

function validateCreateBook(obj)
{
    const schema = Joi.object({
    name: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().min(3).max(200).required()
    });

    return schema.validate(obj); 

}

function validateUpdateBook(obj)
{
    const schema = Joi.object({
    name: Joi.string().trim().min(3).max(200),
    author: Joi.string().min(3).max(200)
    });

    return schema.validate(obj); 

}

module.exports = router;