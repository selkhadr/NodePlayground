const express = require("express");
const app = express();

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

app.listen(5000, ()=>console.log("server start"));