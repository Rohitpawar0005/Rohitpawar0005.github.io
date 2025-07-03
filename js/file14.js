// const student = {
//   name: "Omil",
//   age: 21,
// };
// console.log(JSON.stringify(student));  // json to string conversion
const student = '{"name":"Omil","age":21}';
const newStudent = JSON.parse(student);  // string to json conversion
console.log(newStudent)
console.log(newStudent.name)