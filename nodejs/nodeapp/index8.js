import express from 'express'
const app = express()
app.listen(8080, ()=>{
    console.log("Server Started")
})

app.use(express.static("public"))
// app.use("/images", express.static("images"))

app.get("/products", (req,res)=>{
    res.send("Product List")
}) 