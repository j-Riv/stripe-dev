import cors from 'cors';
import type { Express } from 'express';

import { createDraftOrder } from '../controllers/shopify.js';

const shopify = (app: Express) => {
  app.post('/order/draft/create', cors(), createDraftOrder);
};

export default shopify;
