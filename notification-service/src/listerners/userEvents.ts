import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

export async function listenToUserEvents() {
  await consumer.connect();
  console.log('Kafka consumer connected');

  await consumer.subscribe({ topic: 'userCreated', fromBeginning: true });
  await consumer.subscribe({ topic: 'userDeleted', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value!.toString());

      if (topic === 'userCreated') {
        console.log('Notification: User Created', event);
      } else if (topic === 'userDeleted') {
        console.log('Notification: User Deleted', event);
      }
    },
  });
}
