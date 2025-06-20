// Objects

const student = {
    name: "Rohit",
    age: 21
};

console.log(student);
console.log(student.name)
console.log(student['name'])
console.log(student.age)
student.city = 'Jalandhar';
console.log(student)
delete student.city
console.log(student)
const keys = Object.keys(student)
console.log(keys)
const values = Object.values(student)
console.log(values)