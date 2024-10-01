const fs = require('fs');
console.log("Starting Operations .......");

//using 
fs.readFile("data.txt",(error, data)=>{
    if(error) {
        console.error("Error reading file: ", error);
        return;
    }else{
        console.log("File Content: ", data.toString());
    }
})

//Using utf8
const textData = fs.readFileSync("data.txt", "utf8");
console.log("File Content Second code: ", textData);