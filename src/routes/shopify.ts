import cors from 'cors';
import type { Express } from 'express';

import {
  calculateDraftOrder,
  createDraftOrder,
} from '../controllers/shopify.js';

const shopify = (app: Express) => {
  app.post('/order/draft/calculate', cors(), calculateDraftOrder);
  app.post('/order/draft/create', cors(), createDraftOrder);
};

export default shopify;
