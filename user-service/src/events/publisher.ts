import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();

  console.log('Kafka producer connected');
}

export async function publishEvent(topic: string, message: object) {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log(`Published event to ${topic}:`, message);
  } catch (error) {
    console.error('Error publishing event:', error);
  }
}
