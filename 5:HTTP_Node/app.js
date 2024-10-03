const http =require('http');//Import node js core modules
const port=3000;
const server=http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;  // status code 200 means OK.(SUCCESS)
    res.end('Message:Hello from the server');
});
server.listen(port);
console.log(`Server running on ${port} 🎉🎉`);