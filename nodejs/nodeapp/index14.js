import mongoose from 'mongoose'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const app = express()
const userRouter = express.Router()

mongoose.connect("mongodb://localhost:27017/lpu").then(()=>{
    app.listen(8080, ()=>{
        console.log("Server started...")
    })
})

//models > userModel

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    role:{type:String},
},
{timestamps: true})

const userModel = mongoose.model("User", userSchema)

app.use(express.json())
const authenticate = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, "secret")
        if(!user) return res.status(400).json({message:"Token Not Found"})
        req.role = user.role
        next()
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong"})
    }
}

const authorize = (req,res,next)=>{
    try{
        if(req.role == "admin"){
            next()
        }
        else{
            return res.status(400).json({message:"You are not authorized"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong"})
    }
}


userRouter.get("/users", authenticate, authorize, async (req,res)=>{
    try{
        const result = await userModel.find()
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong"})
    }
})


userRouter.post("/register", async (req,res)=>{
    try{
        const {name, email, password, role} = req.body
        const hashedPass = await bcrypt.hash(password, 10)
        const user = {
        name, email, password:hashedPass, role
        }
        const result = await userModel.create(user);
        res.status(201).json(result)
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong"})
    }
})

userRouter.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body
        const found = await userModel.findOne({email})
        if(!found) return res.status(400).json({message:"User not found"})
    
        const validate = await bcrypt.compare(password, found.password)
        if(!validate) return res.status(400).json({message:"Password incorrect"})
        
        const userObj = {
            id: found._id,
            name: found.name,
            email: found.email,
            role: found.role
        }
        const token = jwt.sign(userObj, "secret", {expiresIn: '1h'})
        res.status(200).json({message:"Login Success", userObj, token})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong"})
    }

}) 




app.use("/api", userRouter)