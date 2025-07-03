import express from 'express'

const app = express()

app.listen(8080, ()=>{
    console.log("Server started...")
})

app.use(express.json())

let products = []

app.post("/add", (req,res)=>{
    // products.push(req.body)
    const {id, name, price} = req.body

    const isExist = products.find(product=> product.id===id)
    if(isExist) return res.send("Product already exist")

    products.push({id, name, price})
    res.send("Product Added")
})

app.get("/show", (req,res)=>{
    res.json(products)
})


app.delete("/delete/:id", (req,res)=>{
    const {id} = req.params

    products = products.filter(product=> product.id!=id)

    res.send("Delete successfully")
})


app.patch("/update/:id", (req,res)=>{
    const {id} = req.params

    const {name, price} = req.body
    
    products = products.map(value=> value.id==id ? {...value, name, price}: value)

    res.send("Update Successfully")

})