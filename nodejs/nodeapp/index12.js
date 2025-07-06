import express from 'express'

const app = express()

const port = process.argv[2] || 8080

app.listen(port, ()=>{
    console.log(`Server started at port no ${port}`)
})

// let name1 = process.argv[2];
// let name2 = process.argv[3] || "John"
// console.log(`Hello ${name1} and ${name2}`)

