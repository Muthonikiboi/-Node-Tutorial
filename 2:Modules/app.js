const fs = require('fs');

//using 
fs.readFile("data.txt",(error, data)=>{//callback function receiving two parameters;
    if(error) {
        console.error("Error reading file: ", error);
        return;
    }else{
        console.log("File Content: ", data.toString());//use .toString() in place of utf-8.
    }
})

//Using utf8
const textData = fs.readFileSync("data.txt","utf-8");//utf-8 is used to converst to human readable format otherwise gives output as buffer
//<Buffer 48 65 79 20 4d 79 20 6e 61 6d 65 20 69 73 20 4a 6f 79 20 4b 69 62 6f 69 2e 0a>
//You can use .toString() in place if utf-8.(((textData.toString())))
console.log("File Content Second code: ", textData);
//fs-allows you to work with the file system in your computer

//Write contents into a file
fs.writeFileSync("SyncWriting.txt", "Hey let's write into file using fileSync.");

fs.writeFile("AsyncWriting.txt", "Hey let's write into file using asyncWrite.",(err)=>{
    if(err){
        console.error("Error writing to file: ", err);
    }else{
        console.log("File written successfully 🎉🎉🎉.");
    }
});

//FS Promise Module...

