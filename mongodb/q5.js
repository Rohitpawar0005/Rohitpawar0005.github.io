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