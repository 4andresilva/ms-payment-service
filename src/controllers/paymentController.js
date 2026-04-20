require('dotenv').config();
const { Transaction } = require('../models/Transaction');
const rabbitmq = require('../services/rabbitmq');

async function createTransaction(req, res) {
  const { user_email, amount } = req.body;

  // Salva transação como pendente
  const transaction = await Transaction.create({ user_email, amount });

  // Notifica recebimento
  await rabbitmq.publish('payment_notifications', {
    type: 'TRANSACTION_RECEIVED',
    user_email,
    transaction_id: transaction.id
  });

  // Confirma transação
  await transaction.update({ status: 'success' });

  // Notifica confirmação
  await rabbitmq.publish('payment_notifications', {
    type: 'TRANSACTION_CONFIRMED',
    user_email,
    transaction_id: transaction.id
  });

  res.json({ message: 'Transação processada', transaction });
}

module.exports = { createTransaction };
