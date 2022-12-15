# Stripe Dev Server

## Stripe CLI

> Use Stripe CLI to simulate Stripe events in your local environment or learn more about Webhooks.

Install the Stripe CLI
https://stripe.com/docs/stripe-cli

Login

```bash
stripe login
```

Forward events to the webhook

```bash
stripe listen --forward-to localhost:3000/webhook
```

Trigger evetns with the CLI

```bash
stripe trigger payment_intent.succeeded
```
