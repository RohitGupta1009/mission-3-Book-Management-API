require("dotenv").config();

//Frame work
const express=require ("express");
const mongoose=require("mongoose");



//Micro-services Routes:

const Books =require("./API/Book");                                                                   // as we haven't specified file name here it will look for index.js (use it when we have single file)
const Authors=require("./API/Author"); 
const Publications=require("./API/Publication"); 


//Initializing express
const shapeAI =express();

//Configurations:
shapeAI.use(express.json());

//Establish Database Connection
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(()=>console.log("connection established !!"));


//Initializing Micro-services:

shapeAI.use("/books",Books);              // ("prefix",Route)
shapeAI.use("/authors",Authors); 
shapeAI.use("/publications",Publications); 




shapeAI.listen(4000,() => console.log("Server is running !!"));                        







