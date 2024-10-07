import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const PORT = 4004;
const HOST = '127.0.0.1';

// Serve static files from public directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDirectory = path.join(__dirname, 'public');
const txtFilePath = path.join(__dirname, '../8:Assignment3/data.txt');

// Load product data initially
let fullProductData = [];
fs.readFile(txtFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the text file:', err);
        return;
    }
    try {
        fullProductData = JSON.parse(data);
    } catch (error) {
        console.error('Error parsing JSON from the text file:', error);
    }
});

// Define MIME types for common file types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    if (pathname === '/api/product' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
        res.end(JSON.stringify(fullProductData));
    } else if (req.url.match(/\/api\/product\/\d+/) && req.method === 'GET') {
        const id = parseInt(req.url.split("/")[3]);
        const product = fullProductData.find((product) => product.id === id);
        if(product){
            res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json', ...headers });
            res.end(JSON.stringify({message: "Product not found"}));
        }
    } else if (req.url.match(/\/api\/product\/\d+/) && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[3]);
        fullProductData = fullProductData.filter((product) => product.id !== id);
        fs.writeFile(txtFilePath, JSON.stringify(fullProductData, null, 2), (err) => {
            if (err) {
                res.writeHead(500, headers);
                res.end(JSON.stringify({ error: 'Failed to update data' }));
                return;
            }
            res.writeHead(200, headers);
            res.end(JSON.stringify({ message: 'Successfully deleted' }));
        });
    } else if (req.url.match(/\/api\/product\/\d+/) && req.method === 'PATCH') {
        const id = parseInt(req.url.split('/api/product/')[1]);
        const index = fullProductData.findIndex((product) => product.id === id);
        if (index > -1) {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const updateData = JSON.parse(body);
                fullProductData[index] = { ...fullProductData[index], ...updateData };
                fs.writeFile(txtFilePath, JSON.stringify(fullProductData, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, headers);
                        res.end(JSON.stringify({ error: 'Failed to update data' }));
                        return;
                    }
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(fullProductData[index]));
                });
            });
        } else {
            res.writeHead(404, headers);
            res.end(JSON.stringify({ message: 'Product not found' }));
        }
    } else if (req.method === 'POST' && req.url === '/api/product') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const { imageUrl, title, price, date, location, company, confirmed } = JSON.parse(body);
            const newProduct = {
                id: fullProductData.length + 1,
                imageUrl,
                title,
                price,
                date,
                location,
                company,
                confirmed: confirmed || false, // Default to false if not provided
            };
            fullProductData.push(newProduct);
            fs.writeFile(txtFilePath, JSON.stringify(fullProductData, null, 2), (err) => {
                if (err) {
                    res.writeHead(500, headers);
                    res.end(JSON.stringify({ error: 'Failed to save product' }));
                    return;
                }
                res.writeHead(201, headers);
                res.end(JSON.stringify(newProduct));
            });
        });
    } else {
        let filePath = path.join(staticDirectory, pathname === '/' ? 'index.html' : pathname);
        const extname = path.extname(filePath);
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        fs.readFile(filePath, (err, file) => {
            if (err) {
                fs.readFile(path.join(staticDirectory, '404.html'), (err404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html', ...headers });
                    res.end(content404 || '404 Not Found', 'utf-8');
                });
            } else {
                res.writeHead(200, { 'Content-Type': contentType, ...headers });
                res.end(file, 'utf-8');
            }
        });
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
