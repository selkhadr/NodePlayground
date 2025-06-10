const express = require("express");
const joi = require("joi");
const router = require.Router();

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
router.get("/", (req, res)=>{
    res.status(200).json(authors);
})

/**
 * @descp get author by id
 * @method Get
 * @url /api/authors/:id
 * @access public
 */
router.get("/:id", (req, res)=>{
    const id  = req.params.id;
    const author = authors.find(ath => ath === parseInt(id));
    if (author)
        res.status(200).json(author);
    else
        res.send("author not found");
})

/**
 * @descp create new author
 * @method Post
 * @url /api/authors/
 * @access public
 */
router.post("/", (req, res)=>{
    const {error} = validateCreateAuthor(req.body);
    if (error)
        return res.send("author info not enought");
    const author = {
        name: req.body.name,
        description: req.body.description
    }
    authors.push(author);
    res.status(201).json({message: "author created successfuly"})
})

function validateCreateAuthor(obj)
{
    const schema = joi.object({
        name: joi.string().trim().min(3).max(200).required(),
        description: joi.string().trim().min(3).max(200),
    })
    return schema.validate(obj);
}

module.exports = router;