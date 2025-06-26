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
            foreignField: "stident_id",
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