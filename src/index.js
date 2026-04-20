require('dotenv').config();
const express = require('express');
const rabbitmq = require('./services/rabbitmq');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3001;

rabbitmq.connect().then(() => {
  app.listen(PORT, () => console.log(`Payment service rodando na porta ${PORT}`));
});
