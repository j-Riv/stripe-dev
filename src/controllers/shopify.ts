import dotenv from 'dotenv';
import fetch from 'node-fetch';
import type { Request, Response } from 'express';

import { draftOrderCreate, draftOrderComplete } from '../handlers';

dotenv.config();

const shopifyStore = process.env.SHOPIFY_STORE || '';
const shopifyPassword = process.env.SHOPIFY_PASSWORD || '';
const apiVersion = process.env.API_VERSION || '';

export const createDraftOrder = async (req: Request, res: Response) => {
  const query = draftOrderCreate;

  const variables = `
    {
      "input": {
        "billingAddress": {
          "address1": "2831 West 1st Street",
          "address2": "",
          "city": "Santa Ana",
          "company": "",
          "country": "United States",
          "countryCode": "US",
          "firstName": "Jose",
          "lastName": "Rivera",
          "phone": "7143886920",
          "province": "California",
          "provinceCode": "CA",
          "zip": "92703"
        },
        "customAttributes": [
          {
            "key": "",
            "value": ""
          }
        ],
        "customerId": "gid://shopify/Customer/5615408971874",
        "email": "",
        "lineItems": [
          {
            "grams": 1,
            "quantity": 1,
            "requiresShipping": true,
            "sku": "P001NN",
            "taxable": true,
            "title": "4 oz",
            "variantId": "gid://shopify/ProductVariant/3196687777832",
            "weight": {
              "unit": "POUNDS",
              "value": 0.35
            }
          }
        ],
        "note": "This is my note",
        "shippingAddress": {
          "address1": "2831 West 1st Street",
          "address2": "",
          "city": "Santa Ana",
          "company": "",
          "country": "United States",
          "countryCode": "US",
          "firstName": "Jose",
          "lastName": "Rivera",
          "phone": "7143886920",
          "province": "California",
          "provinceCode": "CA",
          "zip": "92703"
        },
        "shippingLine": {
          "price": "5.74",
          "shippingRateHandle": "usps-first-class-package",
          "title": "USPS First Class Package"
        },
        "tags": [
          ""
        ],
        "taxExempt": false,
        "useCustomerDefaultAddress": true
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${shopifyStore}.myshopify.com/admin/api/${apiVersion}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': shopifyPassword,
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    const jsonResponse = await response.json();

    res.status(200).send(jsonResponse);
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ success: false, error: err.message });
  }
};

export const completeDraftOrder = async (req: Request, res: Response) => {
  // gid://shopify/DraftOrder/
  const { id } = req.body;

  const query = draftOrderComplete;

  const variables = `
    {
      "id": "${id}",
      "paymentPending": true
    }
  `;

  try {
    const response = await fetch(
      `https://${shopifyStore}.myshopify.com/admin/api/${apiVersion}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': shopifyPassword,
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    const jsonResponse = await response.json();

    res.status(200).send(jsonResponse);
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ success: false, error: err.message });
  }
};
