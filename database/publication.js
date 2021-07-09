const mongoose=require("mongoose");


//Creating a Publication schema
const PublicationSchema=mongoose.Schema({
 
    id:
    {
        type:Number,
        required:true,

    },
    name:
    {
        type:String,
        required:true,
    },
    books:
    {
        type:[String],
        required:true,
        
    }
});


//Create a Publication model

const PublicationModel=mongoose.model("publications",PublicationSchema);

module.exports=PublicationModel;