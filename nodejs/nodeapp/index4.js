import express from 'express'

const app = express()

// app.get("/", (req,res)=>{
//     res.send("Hello World")
// })

app.get("/ab*cd", (req,res)=>{
    res.send("Hello")
})

app.get("/products", (req,res)=>{
    // res.send("Product List")
    res.json([
        {id:1, name:"Product1", price:25},
        {id:2, name:"Product2", price:50}
    ])
})

// app.get("/name", (req,res)=>{
//     res.send("Good Morning")
// })

// app.get("/:name", (req,res)=>{      // localhost:8080/anything_here it works because of colon(:) before the name, name is passing as a variable here
//     res.send(req.params.name)
// })

// app.get("/name/:name", (req,res)=>{
//     res.send(req.params.name)
// })

// app.get("/:name/:age", (req,res)=>{
//     // res.send(req.params.name +" " +req.params.age)
//     res.send(req.params) 
// })

app.get("/name/:name/age/:age", (req,res)=>{
    res.send(req.params.name +" " +req.params.age)
    // res.send(req.params) 
})

// app.get("/", (req,res)=>{
//     res.send(req.headers.authorization)
// })

// app.get("/", (req,res)=>{
//     // res.send(req.query.name + req.query.age)
//     res.send(req.query)
// })

app.get("/", (req,res)=>{
    res.send("Get Request")
})

app.post("/", (req,res)=>{
    res.send("Post Request")
})

app.delete("/", (req,res)=>{
    res.send("Delete Request")
})

app.patch("/", (req,res)=>{
    res.send("Path Request")
})
app.listen(8080, ()=>{
    console.log("Server started...")
})