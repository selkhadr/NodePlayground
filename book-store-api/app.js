const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const logger = require("./middlewares/logger");
const {notFound, Errors} = require("./middlewares/errors");
const connectToDB = require("./config/db");

connectToDB();

const app = express();

app.use(express.json());

app.use(logger);

app.set('view engine', 'ejs');


app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password"));

app.use(notFound);

app.use(Errors);

const PORT= process.env.PORT||8000;
console.log(PORT);
app.listen(PORT, ()=>console.log(`server is running in  ${process.env.NODE_ENV} ON PORT ${PORT}`));
