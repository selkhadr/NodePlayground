const express = require("express");
const booksPath = require("./routes/books");


const app = express();

app.use(express.json());

app.use("/api/books", booksPath);

app.listen(5000, ()=>console.log("server start"));