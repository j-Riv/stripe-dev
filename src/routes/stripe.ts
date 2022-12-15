import cors from 'cors';
import bodyParser from 'body-parser';
import type { Express } from 'express';

import {
  getStripeKey,
  createPaymentIntent,
  createPaymentIntentWithPaymentMethod,
  payWithoutWebhooks,
  createSetupIntent,
  webhook,
  chargeCardOffSession,
  paymentSheet,
  paymentSheetSubscription,
  ephemeralKey,
  issuingCardDetails,
  financialConnectionsSheet,
} from '../controllers/stripe.js';

const stripe = (app: Express) => {
  app.get('/stripe-key', cors(), getStripeKey);

  app.post('/create-payment-intent', cors(), createPaymentIntent);

  app.post(
    '/create-payment-intent-with-payment-method',
    cors(),
    createPaymentIntentWithPaymentMethod,
  );

  app.post('/pay-without-webhooks', cors(), payWithoutWebhooks);

  app.post('/create-setup-intent', cors(), createSetupIntent);

  app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhook);

  app.post('/charge-card-off-session', cors(), chargeCardOffSession);

  app.post('/payment-sheet', cors(), paymentSheet);

  app.post('/payment-sheet-subscription', cors(), paymentSheetSubscription);

  app.post('/ephemeral-key', cors(), ephemeralKey);

  app.post('/issuing-card-details', cors(), issuingCardDetails);

  app.post('/financial-connection-sheet', cors(), financialConnectionsSheet);
};

export default stripe;
