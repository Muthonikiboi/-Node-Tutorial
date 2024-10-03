//Event emitters are objects that can emit events and notify registered listeners when these events occur.
//It facilitates communication between objects in node

//Has two main objective registering main events and emit named ebents
//1.Emmiter Objects
const EventEmitter = require('events');

//create instance of that event
const myEmitter = new EventEmitter();
//or create class that extends event emmitter
// class MyEmitter extends EventEmitter{}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Emit an event
//use instance of EventEmitter.emit method to emit an event
myEmitter.emit('event');

//listen to an event
// 0n() and ()once are used to listen to events
myEmitter.on('event', () => {
    console.log('Event triggered');
});

myEmitter.once('event', () => {
    console.log('Event triggered once');
});

//multple listeners on same registered name
myEmitter.on("event", () => {
    //Lipa na PayBill
})
myEmitter.on("event", () => {
    //lipa Pochi la Biashara
})

//Real world scenarios of event listeners
//INtrractive apps
//Realtime Chat
//Job Queue



