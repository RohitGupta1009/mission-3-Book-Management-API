//Frame work
const express=require ("express");

//Database
const database=require("./database/index");          

//Initializing express
const shapeAI =express();

//Configurations:
shapeAI.use(express.json());


/* 
     Route         /
     Description   get all books
     Access        PUBLIC
     Parameters    NONE
     Method        GET
*/     


shapeAI.get("/",(req,res)=>
{
  return  res.json({books:database.books});
});



/* 
     Route         /is
     Description   get specific book based on ISBN
     Access        PUBLIC
     Parameters    isbn
     Method        GET
*/    


shapeAI.get("/is/:isbn",(req,res)=>
{
    const getSpecificBook=database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getSpecificBook.length===0)
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


 shapeAI.get("/c/:category",(req,res)=>
 {
    const getSpecificBooks=database.books.filter((book)=>book.category.includes(req.params.category));
    if(getSpecificBooks.length===0)
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



shapeAI.get("/by/:authers",(req,res)=>
{
    const getBooksByAuther = database.books.filter((book)=>book.authors.includes(parseInt(req.params.authers)));

    if(getBooksByAuther.length===0)
    {
        return res.json({error: `No books based on the auther id :${req.params.authers} is found`});
    }
    return res.json({by_author:getBooksByAuther});
});




/* 
     Route         /author
     Description   to get all authors 
     Access        PUBLIC
     Parameters    None
     Method        GET
*/   



shapeAI.get("/author",(req,res)=>
{
    return res.json({authors:database.authors});
});




/* 
     Route         /author/is
     Description   to get an specific author 
     Access        PUBLIC
     Parameters    id
     Method        GET
*/   

shapeAI.get("/author/is/:id",(req,res)=>
{
  const getAuthorById = database.authors.filter((author)=> author.id===parseInt(req.params.id));
  if(getAuthorById.length===0)
  {
      return res.json({error:`No such author with id : ${req.params.id} was found `});
  }
  return res.json({author_by_id : getAuthorById });
});






/* 
     Route         /author/is
     Description   to get a list of authors based on a book's isbn           
     Access        PUBLIC
     Parameters    isbn
     Method        GET
*/   




shapeAI.get("/author/is/:isbn",(req,res)=>
{
    const getSpecificAuthors= database.authors.filter((author)=> author.books.includes(req.params.isbn));
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



shapeAI.get("/publications",(req,res)=>
{
    return res.json({publications:database.publications});
});


shapeAI.listen(3000,()=>console.log("Server running !!"));
    




/* 
     Route         /publications/by
     Description   to get specific publication       
     Access        PUBLIC
     Parameters    id
     Method        GET
*/   



shapeAI.get("/publications/by/:id",(req,res)=>
{
    const getPublicationById = database.publications.filter((publication)=> publication.id===parseInt(req.params.id));

    if(getPublicationById.length===0)
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


shapeAI.get("/publications/:book",(req,res)=>
{
    const getPublicationByBook = database.publications.filter((publication)=> publication.books.includes(req.params.book));
    if(getPublicationByBook.length===0)
    {
        return res.json({Error:`No such publication was found for the book having isbn: ${req.params.book}`});
    }
    return res.json({Publication_using_book : getPublicationByBook });
})




/* 
     Route         /book/new
     Description   to upload a new book     
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   

shapeAI.post("/book/new",(req,res)=>
{
    const {newBook} = req.body;                                                 // Destructuring

    database.books.push(newBook);

    return res.json({books:database.books,message:"book was added!"});
});




/* 
     Route         /author/new
     Description   to add new author       
     Access        PUBLIC
     Parameters    None
     Method        POST
*/   




shapeAI.post("/author/new",(req,res)=>
{
    const {newAuthor} = req.body;                                                 // Destructuring

    database.authors.push(newAuthor);

    return res.json({authors:database.authors,message:"author was added!"});
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

    database.publications.push(newPublication);

    return res.json({publications:database.publications,message:"publication was added!"});
});








/* 
     Route         /book/update                               //be specific to avoid clashing
     Description   to update basic book details like title    
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/ 




shapeAI.put("/book/update/:isbn",(req,res)=>
{
    database.books.forEach((book)=>
    {
        if(book.ISBN===req.params.isbn)
        {
            book.title=req.body.bookTitle;
            return;
        }
    });
    return res.json({books:database.books});
});






/* 
     Route         /book/author/update                               //be specific to avoid clashing
     Description   to update or add new author  
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/ 




shapeAI.put("/book/author/update/:isbn",(req,res)=>
{
   //update the book database 

   database.books.forEach((book)=>
   {
       if(book.ISBN===req.params.isbn)
       {
          return  book.authors.push(req.body.newAuthor);
       }
   });
   
 

   //update the author database as well

  database.authors.forEach((author)=>
  {
     if(author.id===req.body.newAuthor)
     {
         return author.books.push(req.params.isbn);
     }
  });
      
   return res.json({books:database.books,authors:database.authors,message:"New author was added"});
  

});






/* 
     Route         /author/name/update                               //be specific to avoid clashing
     Description   to update Author name using id     
     Access        PUBLIC
     Parameters    id
     Method        PUT
*/ 

shapeAI.put("/author/name/update/:id",(req,res)=>
{
    database.authors.forEach((author)=>
    {
       if(author.id===parseInt(req.params.id))
       {
           return author.name=req.body.newName;
       }
    });

     return res.json({author:database.authors,message:"Name of the author was successfully updated"});
  
});
 






/* 
     Route         /publication/name/update                               //be specific to avoid clashing
     Description   to update publication name using id of publication     
     Access        PUBLIC
     Parameters    id
     Method        PUT
*/ 

shapeAI.put("/publication/name/update/:id",(req,res)=>
{
    database.publications.forEach((publication)=>
    {
       if(publication.id===parseInt(req.params.id))
       {
           return publication.name=req.body.newName;
       }
    });

     return res.json({publication:database.publications,message:"Name of the publication was successfully updated"});
  
});
 







/* 
     Route         /publication/update/book
     Description   to update/add new book to a publication   
     Access        PUBLIC
     Parameters    isbn
     Method        PUT
*/     


shapeAI.put("/publication/update/book/:isbn",(req,res)=>
{
    //update the publication database

    database.publications.forEach((publication)=>{
        if(publication.id===req.body.pubId)
        {
           return publication.books.push(req.params.isbn)
        }
    });


    //update the book database

    database.books.forEach((book)=>
    {
        if(book.ISBN===req.params.isbn)
        {
            return book.publication=req.body.pubId;
             
        }
    });

    return res.json({books:database.books,publications:database.publications,message:"Successfully updated publication"});
});






/* 
     Route         /book/delete
     Description   to delete a book   
     Access        PUBLIC
     Parameters    isbn
     Method        DELETE          // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

shapeAI.delete("/book/delete/:isbn",(req,res)=>
{
     const updatedBookDataBase = database.books.filter((book)=> book.ISBN !==req.params.isbn);
     database.books=updatedBookDataBase;
     return res.json({books:database.books});
});




/* 
     Route         /book/delete/author
     Description   to delete an author from a book 
     Access        PUBLIC
     Parameters    isbn,authorId
     Method        DELETE
*/     

  

shapeAI.delete("/book/delete/author/:isbn/:authorId",(req,res)=>
{
    //update the book database


   database.books.forEach((book)=>                      // using forEach as we are modifying one property not whole obj.
   {
     if(book.ISBN===req.params.isbn)
     {
         const newAuthorList= book.authors.filter((author)=> author!==parseInt(req.params.authorId));
         book.authors=newAuthorList;
         return ;
     }
   });
    


   //update the author database


     database.authors.forEach((author)=>
     {
         if(author.id===parseInt(req.params.authorId))
         {
             const newBooksList=author.books.filter((book)=>book !== req.params.isbn);
             author.books=newBooksList;
             return ;
         }
     });
    
         
       return res.json({message:"Ahh you hate him;Author was deleted",books:database.books,authors:database.authors})

});







/* 
     Route         /publication/delete/book
     Description   to delete a book from publication 
     Access        PUBLIC
     Parameters    isbn,pubId
     Method        DELETE
*/     




  shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>
  {
      //update publication database


      database.publications.forEach((publication)=>
      {
          if(publication.id===parseInt(req.params.pubId))
          {
              const newBooksInPublication = publication.books.filter((book)=>book!==req.params.isbn);
              publication.books=newBooksInPublication;
              return;
          }
      });


       //update book database


       database.books.forEach((book)=>
       {
             if(book.ISBN===req.params.isbn)
             {
                 book.publication=0;                     // assume 0 as no publication available
                 return;
             }
       });

          

       return res.json({books:database.books,publication:database.publications});

  });







  /* 
     Route         /publication/delete
     Description   to delete a publication   
     Access        PUBLIC
     Parameters    id
     Method        DELETE          // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

shapeAI.delete("/publication/delete/:id",(req,res)=>
{ 
     const updatedPublicationDataBase = database.publications.filter
     ((publication)=> publication.id !==parseInt(req.params.id));
     database.publications=updatedPublicationDataBase;
     return res.json({publications:database.publications});
});







  /* 
     Route         /author/delete
     Description   to delete an author 
     Access        PUBLIC
     Parameters    id
     Method        DELETE          // use filter(map method not forEach) in delete method as we want a new array in delete 
*/     

shapeAI.delete("/author/delete/:id",(req,res)=>
{ 
     const updatedAuthorDataBase = database.authors.filter
     ((author)=> author.id !==parseInt(req.params.id));
     database.authors=updatedAuthorDataBase;
     return res.json({authors:database.authors});
});
   





  






shapeAI.listen(4000,() => console.log("Server is running !!"));  

//-> Some fault occurred that's why not 3000
                                                                 