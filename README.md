# ms-payment-service

Serviço de pagamento com comunicação REST e AMQP.

## Requisitos
- Node.js
- Docker e Docker Compose

## Instalação

```bash
npm install
```

## Infraestrutura (Postgres + RabbitMQ)

```bash
docker compose up -d
```

## Executar

```bash
npm run dev
```

## Endpoint

POST /api/transactions
Body: { "user_email": "email@email.com", "amount": 100.00 }
