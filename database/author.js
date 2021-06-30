const mongoose=require("mongoose");


//Creating an author schema
const AuthorSchema=mongoose.Schema({
 
    id:Number,
    name:String,
    books:[String]
});


//Create an author model

const AuthorModel=mongoose.model("authors",AuthorSchema);

module.exports=AuthorModel;