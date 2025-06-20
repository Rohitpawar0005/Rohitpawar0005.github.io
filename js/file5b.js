// Arrow Functions

// function greet(){
//     console.log('This is Regular Function');
// }
// greet()

// Hoisting not applied in arrow function 
// const greet = () => {
//     console.log('This is Arrow Function');
// }
// greet()

// const add = (a,b) =>{
//     return a+b;
// }
// const result = add(45,56)
// console.log(result)


const arg = (...args) => {
    console.log(args)
}
arg(4,5,6,7,8,9)