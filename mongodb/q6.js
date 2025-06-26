db.employees.getIndexes() // get index

db.employees.createIndex({email:1}) // create index
db.employees.dropIndex({email:1}) // delete index

db.employees.find({email:"john@gmial.com"}).explain("executionStats")