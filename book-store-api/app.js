const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/bookStoreDB")
.then(()=>console.log("connected to mongodb "))
.catch((error)=>console.log("connection failed to mongodb"));

const app = express();

app.use(express.json());

app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

app.listen(5000, ()=>console.log("server start"));
