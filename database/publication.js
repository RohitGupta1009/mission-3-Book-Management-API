const mongoose=require("mongoose");


//Creating a Publication schema
const PublicationSchema=mongoose.Schema({
 
    id:Number,
    name:String,
    books:[String]
});


//Create a Publication model

const PublicationModel=mongoose.model(PublicationSchema);

module.exports=PublicationModel;