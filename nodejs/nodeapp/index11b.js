import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const users = [
    {
    name: "John",
    email: "john@gmail.com",
    pass: "$2b$10$7RjOZ0iYdKiwJWB9tubqwuLgQ2PuCqZdpb9xTprGIBAlHE1QJ4UQO", // hashed "1234"
    role: "user",
  },
  {
    name: "Cathy",
    email: "cathy@gmail.com",
    pass: "$2b$10$7RjOZ0iYdKiwJWB9tubqwuLgQ2PuCqZdpb9xTprGIBAlHE1QJ4UQO", // hashed "1234"
    role: "admin",
  }
]

const app = express()

app.use(express.json())

const authenticate = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return res.send("No token found")

        const user = jwt.verify(token, 'secret')
        req.role = user.role
        next()
    }
    catch(err){
        return res.send("Something went wrong")
    }
}

const authorize = (req,res,next)=>{
    const role = req.role
    if (role == "admin") {
      next();
    } else {
      return res.json({ message: "Not authorized", role});
    }
}


app.post("/register", async (req,res)=>{
    const {name, email, pass, role} = req.body
    const hashedPss = await bcrypt.hash(pass, 10)
    const user = {name, email, pass:hashedPss, role}
    users.push(user)
    res.json({message : "Registered Successfully", user})
})


app.post("/login", async (req,res)=>{
    const {email, pass} = req.body
    const found = users.find(user=> user.email === email)
    if(!found) return res.send("User not found")
    
    const validatePass = await bcrypt.compare(pass, found.pass)
    if(!validatePass) return res.send("Wrong Password")
    const role = found.role
    const token = jwt.sign(found, "secret", {expiresIn: '1h'})
    res.json({message:"Login Success", role, token:token})

})



app.get("/show", authenticate, authorize, (req,res)=>{
    res.json(users)
})

app.listen(8080, ()=>{
    console.log("Server started...")
})