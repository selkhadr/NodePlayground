const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
const {notFound, Errors} = require("./middlewares/errors");
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to mongodb "))
.catch((error)=>console.log("connection failed to mongodb"));

const app = express();

app.use(express.json());

app.use(logger);


app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

app.use(notFound);

app.use(Errors);

const PORT= process.env.PORT||8000;
console.log(PORT);
app.listen(PORT, ()=>console.log(`server is running in  ${process.env.NODE_ENV} ON PORT ${PORT}`));
