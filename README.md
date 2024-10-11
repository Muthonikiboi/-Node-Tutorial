Here’s a README markdown template for the assignments mentioned (Event-Driven Architectures, Logging Events, and Updating a Product Page with Node.js). I've added sections for images as well:

---

# Node.js Assignments Overview

This repository contains three assignments related to Node.js and its core functionality. Each assignment demonstrates a different aspect of working with Node.js, focusing on event-driven architecture, logging events, and performing CRUD operations (Create, Read, Update, Delete) on a product page.

## Table of Contents
1. [Assignment 1: Event-Driven Architectures](#assignment-1-event-driven-architectures)
2. [Assignment 2: Logging Events](#assignment-2-logging-events)
3. [Assignment 3: Updating a Product Page with Node.js](#assignment-3-updating-a-product-page-with-nodejs)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [How to Run](#how-to-run)
7. [Future Improvements](#future-improvements)
8. [Images](#images)

## Assignment 1: Event-Driven Architectures

### Objective
The goal of this assignment was to implement an event-driven architecture in Node.js. The architecture allows the application to respond to different events asynchronously.

### Key Concepts
- **Event Emitter**: Understanding how to create and manage custom events using Node.js's `events` module.
- **Event-Driven Design**: How Node.js's non-blocking I/O system is inherently event-driven.
  
### Example
```javascript
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Create an event handler
eventEmitter.on('start', () => {
    console.log('Event-driven architecture in action!');
});

// Trigger the event
eventEmitter.emit('start');
```

## Assignment 2: Logging Events

### Objective
This assignment focuses on creating a logging system that captures and stores the occurrence of events. It extends the event-driven concept by keeping track of actions through logging.

### Key Concepts
- **Logging Events**: Using events to log specific activities or operations.
- **File Handling**: Logging the events into a file using Node.js's built-in `fs` module.

### Example
```javascript
const fs = require('fs');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Log events to a file
eventEmitter.on('log', (message) => {
    fs.appendFile('log.txt', `${message}\n`, (err) => {
        if (err) throw err;
    });
});

// Trigger log event
eventEmitter.emit('log', 'A new event was logged!');
```

## Assignment 3: Updating a Product Page with Node.js

### Objective
This assignment demonstrates how to create, update, and delete products from a product page. It focuses on building a RESTful API using Node.js and Express.js for handling HTTP requests.

### Features
- **POST**: Add a new product.
- **PUT**: Update an existing product.
- **DELETE**: Remove a product.
- **GET**: View all products.

### CRUD API Endpoints

| Method |  Description                |
|--------|----------------------------|
| GET    | Fetch all products         |
| GET    | Fetch a specific product   |
| POST   | Add a new product          |
| PUT    | Update an existing product |
| DELETE | Delete a product           |


## Technologies Used
- **Node.js**
- **EventEmitter API**
- **File System (fs) module**

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repository-url.git
    ```

2. Navigate to the project directory:
    ```bash
    cd assignment-project
    ```

3. Install dependencies:
    ```bash
    pnpm install
    ```

## How to Run

To start the Node.js server, run:

```bash
pnpm run start
```

You can then access the app at `http://localhost:3000`.

## Future Improvements
- Add database integration (Xata and Expressjs).

## Images
Include screenshots of the assignment output here.


### Assignment 2: Logging Events
![Screenshot from 2024-10-11 12-13-05](https://github.com/user-attachments/assets/f8b39720-6c3a-43f1-97cc-9ce34f5ffcf8)


### Assignment 3: Product Page with CRUD Operations
![Product Page](./images/product-page.png)
![Screenshot from 2024-10-11 12-21-04](https://github.com/user-attachments/assets/9b5cc6b7-3984-4331-8e83-c32573fcd14f)
![Screenshot from 2024-10-11 12-20-11](https://github.com/user-attachments/assets/3a53cf49-4ac5-423c-ab8b-b87bca09c220)

