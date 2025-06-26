db.employees.insertMany([
    {
    name:"Amy",
    email:"amy@gmail.com",
    department:"HR",
    salary:2000,
    location:["NY", "TX"],
    date:Date()  
    },
    {
    name:"Rafeal",
    email:"rafeal@gmail.com",
    department:"Admin",
    salary:1500,
    location:["OH", "TX"],
    date:Date()
    }
])

db.employees.updateOne({email:"john@gmail.com"},{$set: {salary:2000}})

db.employees.updateMany({},{$set: {points:1}}) // it will create points field to all documents
db.employees.updateMany({department:"IT"},{$inc: {points:1}}) // increment points by 1
db.employees.updateMany({department:"IT"},{$inc: {points:-1}}) // decrement points by 1

db.employees.updateMany({},{$rename: {points:"score"}}) // change field points to score to all documents
db.employees.updateMany({},{$unset: {score:""}}) // remove the field score
db.employees.updateMany({},{$push: {skills:"Java"}}) // add skills field as an array push java into it
db.employees.updateMany({email:"john@gmail.com"},{$pull: {skills:"MERN"}}) // remove MERN from skills array of john

db.employees.updateMany({email:"john@gmail.com"},{$addToSet: {skills:"MERN"}}) // add MERN if it is not there in the skills array (it is for maintain uniqueness)

db.employees.updateMany({email:"john@gmail.com"},{$pop: {skills:1}}) // Remove the last value in the skills array
db.employees.updateMany({email:"john@gmail.com"},{$pop: {skills:-1}}) // remove the first value in the skills array

db.employees.updateOne({email:"brian@@gmail.com"}, {$set: {name:"Brian"}}, {upsert:true}) // if email not match, it will insert a new one with name and mail because of upsert:true

db.employees.deleteOne({email:"john@gmail.com"}) // delete john ;
db.employees.deleteMAny({department:"IT"}) // delate all that have department IT

