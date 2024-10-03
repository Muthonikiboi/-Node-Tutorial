import EventEmitter from 'events';
import logEvents from './LogEvents.js';

const eventEmitter = new EventEmitter();

// Emit an event after 2 seconds
eventEmitter.on('log', (message) => {
  logEvents(message);
});

setTimeout(() => {
  console.log('Emitting new log event...');
  eventEmitter.emit('log', 'New log event emitted.');
}, 2000);
