//SET TIMEOUT
const greetings = setTimeout(()=>{
    console.log("Hello World")
},3000)

console.log("This message displays first")



//CALLBACK FUNCTION -Function that passes another function as an argument in another function
const greet =(name ,callback)=>{
    console.log("Hi"+" "+name)
    callback()
}

const callbackFunc=()=>{
    console.log("hi I am a callback function")
}

greet('Joy',callbackFunc)



//PROMISE
//Chaining promise with then
let countValue= new Promise(function(resolve,reject){
    resolve('Promise has been resolved')
})

countValue
.then(
    function success(result){
        console.log(result)
    }
)
.then(
    function success2(){
        console.log('This is the second success output')
    }
)
//using catch
let count= new Promise(function(resolve,reject){
    reject('This promise has been rejected.')
})
count
.then(function success(result){
    console.log(result)
})
.catch(function error(result){
    console.log(result)
})



//ASYNC/AWAIT
//Simple Async function
async function first() {
    console.log('First Async Function')
    return Promise.resolve(1)
}
first().then(function(result){
    console.log(result)
})

//Await Keyword
let promise= new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('promise resolved'),4000
    })
})
async function asyncFunc() {
    let result= await promise;
    console.log(result);
    console.log("Testing")
}
asyncFunc();

//Using Try/Catch(Error Handling)
async function asyncFunct() {
    try{
        let result= await promise;
        console.log(result);
    }
    catch(error){
        console.log(error)
    }
}
asyncFunct();