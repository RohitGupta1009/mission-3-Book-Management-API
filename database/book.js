const mongoose=require("mongoose");


//Creating a book schema
const BookSchema=mongoose.Schema({

    ISBN:
    {
        type:String,
        required:true,
        minlength:8,
        maxlength:10,
    },
    title:
    {
        type:String,
        required:true,
        minlength:2,
        maxlength:7,
        
    },
    

    authors:
    {
        type: [Number], 
        required:true,
    },
    language:
    {
       type: String,
       required:true,
       minlength:1,
    },
    pubDate:
    {
        type:String,
        required:true,
        
    },
    numOfPage:
    {
        type:Number,
        required:true,
    },
    category:
    {
        type:[String],
        required:true,
    },
    publication:Number

});


//Create a book model

const BookModel=mongoose.model("books",BookSchema);

module.exports=BookModel;