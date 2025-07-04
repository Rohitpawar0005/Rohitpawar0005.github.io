import express from 'express'
import bcrypt from 'bcrypt'
const app = express()

app.listen(8080, (req,res)=>{
    console.log("server started...")
})

const pwd = "pass1234"
const hashedpwd = await bcrypt.hash(pwd, 10);
console.log(hashedpwd)

const validate = await bcrypt.compare(pwd, hashedpwd)

console.log(validate)