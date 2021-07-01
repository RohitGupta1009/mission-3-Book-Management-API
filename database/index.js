let books=[
     {
     ISBN:"12345ONE",
     title:"Getting started with MERN",
     authors:[1,2],  // using author id instead of name -> Remove this comment while putting on postman, otherwise postman will throw error
     language:"en",
     pubDate:"2021-07-07",
     numOfPage:225,
     category:["fiction","tech","web dev"],
     publication:1
     },
                     
    {
        ISBN:"12345Two",
        title:"Getting started with Python",
        authors:[1,2],  // using author id instead of name
        language:"en",
        pubDate:"2021-07-07",
        numOfPage:225,
        category:["fiction","programming","web dev"],
        publication:1
    },

];

const authors=[  
    {
        id:1,
        name:"pavan",
        books:["12345Two"]
    },
    {
        id:2,
        name:"Deepak",
        books:["12345ONE"]
    },
    
];
const publications=[
    {
      id:1,
      name:"Chakra",
      books:["12345ONE"]
    },
    {
        id:2,
        name:"Rohit",
        books:[]
      },
    
];

module.exports={books,authors,publications}; // since we have 3 so create a object to send them , if it's one send directly