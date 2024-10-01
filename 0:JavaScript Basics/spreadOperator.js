//SPREAD OPERATOR
//used to spread numbers into individual elements used to copy arrays and objects
const numbers=[1,2,3]
console.log(numbers) //output: [1,2,3]
console.log(...numbers) //output: 1,2,3


//REST OPERATOR(spread operator used as a parameter)
const printArray = (...args)=>{
    return args;
}
console.log(printArray(1))
console.log(printArray(1,2,3,4,5))


//DESTRUCTURING
//object destructuring
const person ={
    name:'Joy Kiboi',
    age:22,
    school:'Dkut'
}
const {name , age}=person;
console.log( name ,age)
//array destructuring
const units=["Data Mining","E-commerce","Enterprenuership"]
const [unit1,unit2,unit3]=units
console.log(unit1,unit2,unit3)