import { listenToUserEvents } from './listerners/userEvents';

listenToUserEvents()
  .then(() => console.log('Notification Service listening for events...'))
  .catch(err => console.error('Error in Kafka listener:', err));
