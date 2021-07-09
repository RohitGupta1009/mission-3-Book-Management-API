//Prefix : /authors


const Router=require("express").Router();


const AuthorModel =require("../../database/author");                           //    ../ are known as relative paths 




//1) GET Method:





/* 
     Route         /authors
     Description   to get all authors 
     Access        PUBLIC
     Parameters    None
     Method        GET
*/   



Router.get("/",async(req,res)=>
{
    const getAllAuthors=await AuthorModel.find();
    return res.json({authors:getAllAuthors});
});




/* 
     Route         /authors/specific
     Description   to get an specific author 
     Access        PUBLIC
     Parameters    id
     Method        GET
*/   

Router.get("/specific/:id",async(req,res)=>
{
  const getAuthorById = await AuthorModel.find({id:parseInt(req.params.id)})
  if(!getAuthorById)
  {
      return res.json({error:`No such author with id : ${req.params.id} was found `});
  }
  return res.json({author_by_id : getAuthorById });
});






/* 
     Route         /authors/get/by
     Description   to get a list of authors based on a book's isbn           
     Access        PUBLIC
     Parameters    isbn
     Method        GET
*/   




Router.get("/get/by/:isbn",async(req,res)=>
{
    const getSpecificAuthors= await AuthorModel.find({books:req.params.isbn});
    if(getSpecificAuthors.length===0)
    {
        return res.json({error:`No author found on the basis of ISBN : ${req.params.isbn}`});
    }
    return res.json({authors:getSpecificAuthors});
});

//2) POST Method:






/* 
     Route         /authors/new
     Description   to add new author       
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   




Router.post("/new",async(req,res)=>
{
    try
    {

    
    const {newAuthor} = req.body;                                                                  // Destructuring

    const addNewAuthor= await AuthorModel.create(newAuthor);

    return res.json({message:"author was added!"});
    }
    catch (error)
    {
        return res.json({error:error.message});
    }
});




//3)PUT Method:







/* 
     Route         /authors/name/update                                                       //be specific to avoid clashing
     Description   to update Author name using id     
     Access        PUBLIC
     Parameters    id
     Method        PUT
*/ 

Router.put("/name/update/:id",async(req,res)=>
{
    try{
    const updatedAuthorName = await AuthorModel.findOneAndUpdate(
        {
          id:req.params.id,
        },
        {
            name:req.body.newNameOfAuthor,
        },
        {
            new:true,
            runValidators:true,
        },
    );
     return res.json({author:updatedAuthorName,message:"Name of the author was successfully updated"});
    }
    
     catch (error)
     {
         return res.json({error:error.message});
     }
});
 



//4) Delete Method:



 /* 
     Route         /authors/deletion
     Description   to delete an author 
     Access        PUBLIC
     Parameters    id
     Method        DELETE                                                                // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

Router.delete("/deletion/:id",async(req,res)=>
{ 
     
    const updatedAuthorDatabase= await AuthorModel.findOneAndDelete(
        {
          id:req.params.id,    
        },
        
    );
     return res.json({authors:updatedAuthorDatabase});
    
});



module.exports=Router;