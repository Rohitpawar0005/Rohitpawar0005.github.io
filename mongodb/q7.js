const { Collection } = require("mongoose")

db.employees.aggregate([
    {$match:{department:"IT"}},
    {$project:{name:1, salary:1}},
    {$sort:{salary:1}},
    {$limit:2}
])

db.employees.aggregate([
    {$group:
        {_id: "$department", total: {$sum:"$salary"}}
    }
])

db.employees.aggregate([
    {$project: {empName:"$name"}}
])

db.employees.aggregate([
    {$project:{name:0}}
])

db.employees.aggregate([
    {$project:{name:1, 
    salary:1, 
    _id:0, 
    bonus:{$multiply:["$salary",2]}
}}
])

db.employees.aggregate([
    {$match: {department:"IT"}},
    {$project: {_id:0, name:1, email:1, salary:1}}
])

db.employees.aggregate([
    {$project: {_id:0, name:1, email:1, salary:1, Annual_Salary:{$multiply:["$salary", 2]}}}
])


db.employees.aggregate([
    {$match:{salary:{$gt:3000}}},
    {$project: {
        _id:0,
        name:1,
        email:1,
        CTC:"$salary"
    }}
])

db.students.insertOne({
    name:"Alice Jhonson",
    age:23,
    courses:["Math", "Physics"],
    enrolled: true
})

db.students.insertMany([
    {name:"Tom", age:22},
    {name:"Sara", age:24},
    {name:"Mike", age:21}
])

db.students.aggregate([
    {$group:
        {_id: "null", avgAge: {$avg: "$age"}}
    }
])


db.students.updateMany(
    {name:"Alice Jhonson"},
    {$set:{age:24}}
)

db.students.updateMany(
    {},
    {$addToSet:{courses:"Chemistry"}}
)

db.students.updateMany(
    {},
    {$inc:{age:1}}
)

db.students.aggregate([
    {$project: {_id:0, name:1, age:1}}
])

db.students.updateOne(
    {name:"Alice Jhonson"},
    {$pull:{courses:"Chemistry"}}
)

db.address.insertMany([
    {student_id: ObjectId("685cdcff5af95c9a46748a61"), city:"Jalandhar", country:"India"},
    {student_id: ObjectId("685cdd7b5af95c9a46748a62"), city:"New York", country:"USA"},
    {student_id: ObjectId("685cdd7b5af95c9a46748a63"), city:"LA", country:"USA"},
    {student_id: ObjectId("685cdd7b5af95c9a46748a64"), city:"London", country:"UK"},
])

db.students.aggregate([
    {
        $lookup: {
            from: "address",
            localField: "_id",
            foreignField: "student_id",
            as: "address"
        }
    },
    {$unwind: "$address"},
    {$project: {name:1, "address.city":1, "address.country":1}}
]);


db.employees.aggregate([
    {$project:{name:1, location:1}},
    {$unwind:"$location"}
]) 


// -----------------------------------------


db.posts.insertMany([
    {_id:"p1", post:"Post1"},
    {_id:"p2", post:"Post2"}
])

db.comments.insertMany([
    {_id:'c1', pi_d:"p1", comment: "This is comment 1 of post 1"},
    {_id:'c2', pi_d:"p1", comment: "This is comment 2 of post 1"},
    {_id:'c3', pi_d:"p2", comment: "This is comment 1 of post 2"},
    {_id:'c4', pi_d:"p2", comment: "This is comment 2 of post 2"},
    {_id:'c5', pi_d:"p2", comment: "This is comment 3 of post 2"},
])

db.posts.aggregate([
    {
        $lookup: {
            from:"comments",
            localField:"_id",
            foreignField:"pi_d",
            as:"comments"
        }
    },
    {$unwind:"$comments"},
    {$project: {_id:0, post:1, "comments.comment":1}}
])




db.employees.aggregate([
    {$group:{_id:"$department", total:{$sum: "$salary"}}}
])



db.marks.insertMany([
    { name:"John", term:"t1", subject:"Maths", marks:95 },
    { name:"John", term:"t2", subject:"Maths", marks:80 },
    { name:"John", term:"t3", subject:"Maths", marks:70 },
    { name:"John", term:"t1", subject:"Science", marks:50 },
    { name:"John", term:"t2", subject:"Science", marks:60 },
    { name:"John", term:"t3", subject:"Science", marks:90 },
    { name:"Cathy", term:"t1", subject:"Maths", marks:91 },
    { name:"Cathy", term:"t2", subject:"Maths", marks:81 },
    { name:"Cathy", term:"t3", subject:"Maths", marks:71 },
    { name:"Cathy", term:"t1", subject:"Science", marks:51 },
    { name:"Cathy", term:"t2", subject:"Science", marks:61 },
    { name:"Cathy", term:"t3", subject:"Science", marks:91 }
])

db.marks.aggregate([
    {$group: {_id:"$name", totalMatks:{$sum: "$marks"}}}
])
db.marks.aggregate([
    {$group: {_id:"$subject", totalMatks:{$sum: "$marks"}}}
])

db.marks.find({}, {_id:0}).sort({name:1, term:1})


db.marks.aggregate([
    {$group: {_id:{name:"$name", subject:"$subject"}, totalMatks:{$sum: "$marks"}}}
])

db.marks.aggregate([
    {$group: {_id:{name:"$name", term:"$term"}, totalMatks:{$avg: "$marks"}}},
]).sort({"_id.name":1})