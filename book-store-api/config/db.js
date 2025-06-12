const mongoose = require("mongoose");

function connectToDB()
{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb ");
    }
    catch(error){
        console.log("connection failed to mongodb! ", error);
    }
}

module.exports = connectToDB;