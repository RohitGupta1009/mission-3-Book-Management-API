//Prefix : /publications


const Router=require("express").Router();

//Database Models:

const PublicationModel=require("../../database/publication");
const BookModel=require("../../database/book")





//1) GET Method:


/* 
     Route         /publications
     Description   to get all publications      
     Access        PUBLIC
     Parameters    NONE
     Method        GET
*/   



Router.get("/",async(req,res)=>
{
    const allPublications= await PublicationModel.find();
    return res.json({publications:allPublications});
});






/* 
     Route         /publications/by
     Description   to get specific publication       
     Access        PUBLIC
     Parameters    id
     Method        GET
*/   



Router.get("/by/:id",async(req,res)=>
{
    const getPublicationById = await PublicationModel.findOne({id:parseInt(req.params.id)});

    if(!getPublicationById)
    {
        return res.json({error: `No publication found at id : ${req.params.id}`});
    }
    return res.json({publication_by_id : getPublicationById});
});




/* 
     Route         /publications
     Description   to get a list of publications based on a book       
     Access        PUBLIC
     Parameters    book
     Method        GET
*/   


Router.get("/:book",async(req,res)=>
{
    const getPublicationByBook = await PublicationModel.find({books:req.params.book});
    if(getPublicationByBook.length===0)
    {
        return res.json({Error:`No such publication was found for the book having isbn: ${req.params.book}`});
    }
    return res.json({Publication_using_book : getPublicationByBook });
})


//------------------------------------------------------------------------------------------------------------------




//2) POST Method:






                                                         


/* 
     Route         /publications/add/new
     Description   to add new publication      
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   




Router.post("/add/new",async (req,res)=>
{
    try
    {

    
    const {newPublication} = req.body;                                                        // Destructuring

    const addNewPublication=await PublicationModel.create(newPublication)

    return res.json({message:"publication was added!"});
    }
    catch (error)
    {
        return res.json({error:error.message});
    }
});





//-------------------------------------------------------------------------------------------------------------------



//3)PUT Method:



/* 
     Route         /publications/name/update                                                      //be specific to avoid clashing
     Description   to update publication name using id of publication     
     Access        PUBLIC
     Parameters    id
     Method        PUT
*/ 

Router.put("/name/update/:id",async(req,res)=>
{
    try
    {

    
    const updatedPublicationName = await PublicationModel.findOneAndUpdate(
        {
          id:req.params.id,
        },
        {
            name:req.body.newNameOfPublication,
        },
        {
            new:true,
            runValidators:true,
        },
    )
     return res.json({publication:updatedPublicationName,message:"Name of the publication was successfully updated"});
    }
    catch (error)
    {
        return res.json({error:error.message});
    }
    });

 

/* 
     Route         /publications/add/book
     Description   to update/add new book to a publication   
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/     


Router.put("/add/book/:isbn",async(req,res)=>
{
    try
    {

    
    //update the publication database
      const updatedPublicationData =await PublicationModel.findOneAndUpdate(
          { 
              id:req.body.id,
          },
          {
              $addToSet:
              {
                  books:req.params.isbn,
              }
          },
          {
              new:true,
              runValidators:true,
          }
      );
    
    


    //update the book database

   const updatedBookPublicationData = await BookModel.findOneAndUpdate(
       {
           ISBN:req.params.isbn,
       },

       {
           publication:req.body.id,
       },

       {
           new:true,
           runValidators:true,
       },
   );


    return res.json({books:updatedBookPublicationData,publications:updatedPublicationData,message:"Successfully updated publication"});
    }
    catch (error)
    {
        return res.json({error:error.message});
    }
});



//-------------------------------------------------------------------------------------------------------------------



//4) Delete Method:



/* 
     Route         /publications/delete/book
     Description   to delete a book from publication 
     Access        PUBLIC
     Parameters    isbn,pubId
     Method        DELETE
*/     




  Router.delete("/delete/book/:isbn/:pubId",async(req,res)=>
  {
      //update publication database


      const newPublicationData= await PublicationModel.findOneAndUpdate(
          {
              id:req.params.pubId,
          },
          {
              $pull:
              {
                 books:req.params.isbn,
              }
          },
          {
               new:true,
          },

      );
    


       //update book database


       const newBookData=await BookModel.findOneAndUpdate(
           {
               publication:req.params.pubId,
           },
           {
               publication:0,
           },
           {
               new:true,
           },
       );
          

       return res.json({books:newBookData,publication:newPublicationData});

  });







  /* 
     Route         /publications/delete
     Description   to delete a publication   
     Access        PUBLIC
     Parameters    id
     Method        DELETE                                                                   // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

Router.delete("/delete/:id",async(req,res)=>
{ 
     const updatedPublicationDataBase = await PublicationModel.findOneAndDelete(
         {
             id:req.params.id,
         },
     );
     
     return res.json({message:"publication was deleted"});
});



module.exports=Router;
