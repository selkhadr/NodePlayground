const {Book} = require("./models/books");
const {Author} = require("./models/Authors");
const {books} = require("./data");
const {authors} = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();


connectToDB();


const importBooks = async()=> {
    try{
        await Book.insertMany(books);
        console.log("books imported")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

const removeBooks = async()=> {
    try{
        await Book.deleteMany();
        console.log("books removed")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

const importAuthors = async()=> {
    try{
        await Author.insertMany(authors);
        console.log("authors imported")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

const removeAuthors = async()=> {
    try{
        await Author.deleteMany();
        console.log("authors removed")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}


if (process.argv[2] === "-import")
    importBooks();
else if(process.argv[2] === "-remove")
    removeBooks();

if (process.argv[2] === "-import-authors")
    importAuthors();
else if(process.argv[2] === "-remove-authors")
    removeAuthors();


