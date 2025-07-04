import express from 'express'
import jwt from "jsonwebtoken"
import { ClientSession } from 'mongodb'

const app = express()
app.listen(8080, (req,res)=>{
    console.log("Server started....")
})


const SECRET = "sometext"

const user = {
    name: "John",
    email: "john@gmial.com",
    role: "admin"
}

const token = jwt.sign(user, SECRET, {expiresIn: '1h'})
console.log(token)

const userr = jwt.verify(token, SECRET)
console.log(userr)