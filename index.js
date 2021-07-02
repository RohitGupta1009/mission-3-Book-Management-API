require("dotenv").config();

//Frame work
const express=require ("express");
const mongoose=require("mongoose");

//Database
const database=require("./database/index");          

//Models

const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");
const { findOneAndUpdate, findOneAndDelete } = require("./database/book");

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


/* 
     Route         /
     Description   get all books
     Access        PUBLIC
     Parameters    NONE
     Method        GET
*/     


shapeAI.get("/",async(req,res)=>
{
    const getAllBooks=await BookModel.find();
  return  res.json(getAllBooks);
});



/* 
     Route         /is
     Description   get specific book based on ISBN
     Access        PUBLIC
     Parameters    isbn
     Method        GET
*/    


shapeAI.get("/is/:isbn",async(req,res)=>
{
    const getSpecificBook=await BookModel.findOne({ISBN:req.params.isbn});
    if(!getSpecificBook)  
    // if mongoDB didn't find any data it will return null not 0 so we can't use if(getSpecificBook.length===0)
    //condition because we are writing findOne which means we are aiming for single object hence it won't be returned in 
    // array hence we can only use length condition if we write find(..) here we are not writing one so it WILL return array.
    {
        return res.json({error:`No book found for ${req.params.isbn}`});
    }
    return res.json({book:getSpecificBook});
});




/* 
     Route         /c     (i.e  category)
     Description   To get a list of books based on category 
     Access        PUBLIC
     Parameters    category
     Method        GET
*/    


 shapeAI.get("/c/:category",async(req,res)=>
 {
    const getSpecificBooks= await BookModel.find({category:req.params.category});
    if(!getSpecificBooks)
    {
        return res.json({error:`No book found for ${req.params.category}`});
    }
    return res.json({book:getSpecificBooks});
 });


 /* 
     Route         /by
     Description   to get a list of books based on author
     Access        PUBLIC
     Parameters    authers
     Method        GET
*/    



shapeAI.get("/by/:authors",async(req,res)=>
{
    const getBooksByAuthor=await BookModel.find({authors:req.params.authors})

    if(!getBooksByAuthor)
    {
        return res.json({error: `No books based on the author id :${req.params.authors} is found`});
    }
    return res.json({by_author:getBooksByAuthor});
});




/* 
     Route         /author
     Description   to get all authors 
     Access        PUBLIC
     Parameters    None
     Method        GET
*/   



shapeAI.get("/author",async(req,res)=>
{
    const getAllAuthors=await AuthorModel.find();
    return res.json({authors:getAllAuthors});
});




/* 
     Route         /author/is
     Description   to get an specific author 
     Access        PUBLIC
     Parameters    id
     Method        GET
*/   

shapeAI.get("/author/is/:id",async(req,res)=>
{
  const getAuthorById = await AuthorModel.find({id:parseInt(req.params.id)})
  if(!getAuthorById)
  {
      return res.json({error:`No such author with id : ${req.params.id} was found `});
  }
  return res.json({author_by_id : getAuthorById });
});






/* 
     Route         /get/author/is
     Description   to get a list of authors based on a book's isbn           
     Access        PUBLIC
     Parameters    isbn
     Method        GET
*/   




shapeAI.get("/get/author/is/:isbn",async(req,res)=>
{
    const getSpecificAuthors= await AuthorModel.find({books:req.params.isbn});
    if(getSpecificAuthors.length===0)
    {
        return res.json({error:`No author found on the basis of ISBN : ${req.params.isbn}`});
    }
    return res.json({authors:getSpecificAuthors});
});




/* 
     Route         /publications
     Description   to get all publications      
     Access        PUBLIC
     Parameters    NONE
     Method        GET
*/   



shapeAI.get("/publications",async(req,res)=>
{
    const allPublications= await PublicationModel.find();
    return res.json({publications:allPublications});
});


shapeAI.listen(3000,()=>console.log("Server running !!"));
    




/* 
     Route         /publications/by
     Description   to get specific publication       
     Access        PUBLIC
     Parameters    id
     Method        GET
*/   



shapeAI.get("/publications/by/:id",async(req,res)=>
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


shapeAI.get("/publications/:book",async(req,res)=>
{
    const getPublicationByBook = await PublicationModel.find({books:req.params.book});
    if(getPublicationByBook.length===0)
    {
        return res.json({Error:`No such publication was found for the book having isbn: ${req.params.book}`});
    }
    return res.json({Publication_using_book : getPublicationByBook });
})




/* 
     Route         /post/book/new
     Description   to upload a new book     
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   

shapeAI.post("/post/book/new",async(req,res)=>
{
    const {newBook} = req.body;                                                 // Destructuring

    const addNewBook= BookModel.create(newBook);

    return res.json({message:"book was added!"});
});




/* 
     Route         /author/new
     Description   to add new author       
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   




shapeAI.post("/author/new",async(req,res)=>
{
    const {newAuthor} = req.body;                                                 // Destructuring

    const addNewAuthor= AuthorModel.create(newAuthor);

    return res.json({message:"author was added!"});
});



                                                         


/* 
     Route         /publication/add/new
     Description   to add new publication      
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   




shapeAI.post("/publication/add/new",(req,res)=>
{
    const {newPublication} = req.body;                                                 // Destructuring

    const addNewPublication=PublicationModel.create(newPublication)

    return res.json({message:"publication was added!"});
});








/* 
     Route         /book/update                               //be specific to avoid clashing
     Description   to update basic book details like title    
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/ 




shapeAI.put("/book/update/:isbn",async(req,res)=>
{

    const updatedBook=await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            title:req.body.bookTitle,
        },

        {
            new:true,                               // as we will get old data on postmon output so to see updated data 
        });

        return res.json({books:updatedBook});
});
    

    /*database.books.forEach((book)=>
    {
        if(book.ISBN===req.params.isbn)
        {
            book.title=req.body.bookTitle;
            return;
        }
    }); */
 





/* 
     Route         /book/author/update                               //be specific to avoid clashing
     Description   to update or add new author  
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/ 




shapeAI.put("/book/author/update/:isbn",async(req,res)=>
{
   //update the book database 

  const updatedBookAuthorData=await BookModel.findOneAndUpdate(
    {
        ISBN:req.params.isbn,
    },

    {
        $addToSet:{                         // Here we are not using mongoDB $push operator but $addToSet as author id should be unique in this array to avoid repetition of authorid for arrays
            authors:req.body.aNewAuthor
        },
    },
    
    {
        new:true,
    }
  );




   //update the author database as well
   

   const updatedAuthorBookData=await AuthorModel.findOneAndUpdate(
    {
        id:req.body.aNewAuthor,
    },

    {
        $addToSet:{                                                             //mongoDB push operator for arrays
            books:req.params.isbn,
        },
    },
    

    {
        new:true,
    },
  );
   
  
      
   return res.json({books:updatedBookAuthorData,authors:updatedAuthorBookData,message:"New author was added"});
  

});






/* 
     Route         /author/name/update                               //be specific to avoid clashing
     Description   to update Author name using id     
     Access        PUBLIC
     Parameters    id
     Method        PUT
*/ 

shapeAI.put("/author/name/update/:id",async(req,res)=>
{
    const updatedAuthorName = await AuthorModel.findOneAndUpdate(
        {
          id:req.params.id,
        },
        {
            name:req.body.newNameOfAuthor,
        },
        {
            new:true,
        },
    );
     return res.json({author:updatedAuthorName,message:"Name of the author was successfully updated"});
  
});
 






/* 
     Route         /publication/name/update                               //be specific to avoid clashing
     Description   to update publication name using id of publication     
     Access        PUBLIC
     Parameters    id
     Method        PUT
*/ 

shapeAI.put("/publication/name/update/:id",async(req,res)=>
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
        },
    )
     return res.json({publication:updatedPublicationName,message:"Name of the publication was successfully updated"});
    });

 







/* 
     Route         /publication/update/book
     Description   to update/add new book to a publication   
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/     


shapeAI.put("/publication/update/book/:isbn",async(req,res)=>
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
       },
   );


    return res.json({books:updatedBookPublicationData,publications:updatedPublicationData,message:"Successfully updated publication"});
});






/* 
     Route         /book/delete
     Description   to delete a book   
     Access        PUBLIC
     Parameters    isbn
     Method        DELETE          // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     




shapeAI.delete("/book/delete/:isbn",async(req,res)=>
{
     const updatedBookDataBase = await BookModel.findOneAndDelete(
         {
           ISBN:req.params.isbn,    
         },
         
     );
     
     return res.json({books:updatedBookDataBase});
});




/* 
     Route         /book/delete/author
     Description   to delete an author from a book 
     Access        PUBLIC
     Parameters    isbn,authorId
     Method        DELETE
*/     


  

shapeAI.delete("/book/delete/author/:isbn/:authorId",async(req,res)=>
{
    //update the book database


    const updatedBookData=await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },

        {
             $pull:
             {
                 authors:parseInt(req.params.authorId),
             },
        },

        {
            new:true                         //as technically we are updating 
        },
        
    );

  

   //update the author database


    const updatedAuthorData=await AuthorModel.findOneAndUpdate(
        {
           id:parseInt(req.params.authorId),
        },
        {
            $pull:
            {
                books:req.params.isbn,
            },   
        },
        {
            new:true,
        }
    );
         
       return res.json({message:"Ahh you hate him;Author was deleted",books:updatedBookData,authors:updatedAuthorData})

});







/* 
     Route         /publication/delete/book
     Description   to delete a book from publication 
     Access        PUBLIC
     Parameters    isbn,pubId
     Method        DELETE
*/     




  shapeAI.delete("/publication/delete/book/:isbn/:pubId",async(req,res)=>
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
     Route         /publication/delete
     Description   to delete a publication   
     Access        PUBLIC
     Parameters    id
     Method        DELETE          // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

shapeAI.delete("/publication/delete/:id",async(req,res)=>
{ 
     const updatedPublicationDataBase = await PublicationModel.findOneAndDelete(
         {
             id:req.params.id,
         },
     );
     
     return res.json({message:"publication was deleted"});
});








  /* 
     Route         /author/delete
     Description   to delete an author 
     Access        PUBLIC
     Parameters    id
     Method        DELETE          // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

shapeAI.delete("/author/delete/:id",async(req,res)=>
{ 
    const updatedAuthorDatabase= await AuthorModel.findOneAndDelete(
        {
          id:req.params.id,    
        },
        
    );
     return res.json({authors:updatedAuthorDatabase});
});
   




shapeAI.listen(4000,() => console.log("Server is running !!"));  

//-> Some fault occurred that's why not 3000
                                                           

