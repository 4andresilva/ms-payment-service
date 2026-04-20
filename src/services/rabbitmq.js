const amqp = require('amqplib');

let channel;

async function connect() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();
  await channel.assertQueue('payment_notifications');
  console.log('RabbitMQ conectado');
}

async function publish(queue, message) {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

module.exports = { connect, publish };
