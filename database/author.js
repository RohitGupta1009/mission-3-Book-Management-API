const mongoose=require("mongoose");


//Creating an author schema
const AuthorSchema=mongoose.Schema({
 
    id:
    {
        type:Number,
        required:true,
        minlength:1,
    } ,

    name:
    {
        type:String,
        required:true,
        minlength:1,
    },

    books:[String]
});


//Create an author model

const AuthorModel=mongoose.model("authors",AuthorSchema);

module.exports=AuthorModel;