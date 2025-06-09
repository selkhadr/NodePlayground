const express = require("express");
const Joi = require('joi');
const app = express();

app.use(express.json());

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

app.get("/api/books", (req, res) => {
    res.json(books);
})

app.get("/api/books/:id", (req, res) => {
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

app.post("/api/books", (req, res) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().min(3).max(200).required()
    });

    const { error, value } = schema.validate(req.body); // Correct extraction

    if (error) {
        console.log("\n\n");
        console.log(error.details[0].message);
        console.log("\n\n");
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = {
        id: books.length + 1,
        name: value.name, // Use validated `value` instead of raw `req.body`
        author: value.author
    };

    books.push(book);
    res.status(201).json(book);
});


app.listen(5000, ()=>console.log("server start"));