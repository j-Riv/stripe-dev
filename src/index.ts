import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { shopify, stripe } from './routes';

const app = express();

// app.use(express.json());

app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      /* @ts-ignore */
      bodyParser.json()(req, res, next);
    }
  },
);

app.options(
  '*',
  cors({
    origin: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    maxAge: 3600,
  }),
);

app.get('/', (req: express.Request, res: express.Response) =>
  res.status(200).send('Hello, friend...'),
);

shopify(app);
stripe(app);

app.listen(3000, () =>
  console.log('🚀 Server ready at: http://localhost:3000'),
);
