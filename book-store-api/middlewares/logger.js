const express = require("express");

const logger = (req,res,next)=>{
    console.log("logginh ...");
    next();
}

module.exports = logger;