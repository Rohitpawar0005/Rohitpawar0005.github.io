db.employees.find({department: {$eq: "IT"}}) // equal to
db.employees.find({salary: {$gt: 3000}}) // greater then
db.employees.find({salary: {$gte: 3000}}) // greater then equal to
db.employees.find({salary: {$lt: 3000}}) // less then equal to
db.employees.find({salary: {$lte: 3000}}) // less then equal to
db.employees.find({salary: {$ne: 3000}}) // not equal to

db.employees.find(
    {salary: {$ne: 3000}, department: {$eq: "IT"}},
    {_id:0, name:1}
)
db.employees.find(
    {salary: {$gt: 3000}, department: {$eq: "IT"}},
    {_id:0, name:1}
)

db.employees.find(
    {salary: {$gt: 3000}, department: {$eq: "IT"}},
    {_id:0, name:1}
).limit(1)

// Display the top two highest paid employees
db.employees.find().sort({salary:-1}).limit(2)


db.employees.find({
  $and: [{ salary: { $gt: 3000 }, department: { $eq: "IT" } }],
});

db.employees.find({
  $or: [{ salary: { $gt: 3000 }, department: { $eq: "IT" } }],
});