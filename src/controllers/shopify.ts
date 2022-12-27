import dotenv from 'dotenv';
import fetch from 'node-fetch';
import type { Request, Response } from 'express';

import {
  draftOrderCalculate,
  draftOrderCreate,
  draftOrderComplete,
} from '../handlers';

dotenv.config();

const shopifyStore = process.env.SHOPIFY_STORE || '';
const shopifyPassword = process.env.SHOPIFY_PASSWORD || '';
const apiVersion = process.env.API_VERSION || '';

async function completeOrder(draftId: string) {
  const query = draftOrderComplete;

  const variables = {
    id: draftId,
    paymentPending: true,
  };
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

    const jsonResponse: any = await response.json();

    return jsonResponse;
  } catch (err: any) {
    console.log(err);
    return err.message;
  }
}

export const calculateDraftOrder = async (req: Request, res: Response) => {
  const query = draftOrderCalculate;
  const { lineItems } = req.body;

  const variables = {
    input: {
      billingAddress: {
        address1: '2831 West 1st Street',
        address2: '',
        city: 'Santa Ana',
        company: '',
        country: 'United States',
        countryCode: 'US',
        firstName: 'Jose',
        lastName: 'Rivera',
        phone: '7143886920',
        province: 'California',
        provinceCode: 'CA',
        zip: '92703',
      },
      customAttributes: [
        {
          key: '',
          value: '',
        },
      ],
      customerId: 'gid://shopify/Customer/5615408971874',
      email: '',
      lineItems: lineItems.map((el: any) => el),
      note: 'This is my note',
      shippingAddress: {
        address1: '2831 West 1st Street',
        address2: '',
        city: 'Santa Ana',
        company: '',
        country: 'United States',
        countryCode: 'US',
        firstName: 'Jose',
        lastName: 'Rivera',
        phone: '7143886920',
        province: 'California',
        provinceCode: 'CA',
        zip: '92703',
      },
      // shippingLine: {
      //   price: '5.74',
      //   shippingRateHandle: 'usps-first-class-package',
      //   title: 'USPS First Class Package',
      // },
      tags: [''],
      taxExempt: false,
      useCustomerDefaultAddress: true,
    },
  };

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

    const jsonResponse: any = await response.json();
    // eslint-disable-next-line operator-linebreak
    const calculation =
      jsonResponse.data.draftOrderCalculate.calculatedDraftOrder;

    res.status(200).send(calculation);
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ success: false, error: err.message });
  }
};

export const createDraftOrder = async (req: Request, res: Response) => {
  const query = draftOrderCreate;
  const { lineItems, shippingLine } = req.body;

  const variables = {
    input: {
      billingAddress: {
        address1: '2831 West 1st Street',
        address2: '',
        city: 'Santa Ana',
        company: '',
        country: 'United States',
        countryCode: 'US',
        firstName: 'Jose',
        lastName: 'Rivera',
        phone: '7143886920',
        province: 'California',
        provinceCode: 'CA',
        zip: '92703',
      },
      customAttributes: [
        {
          key: '',
          value: '',
        },
      ],
      customerId: 'gid://shopify/Customer/5615408971874',
      email: '',
      lineItems: lineItems.map((el: any) => ({
        variantId: el.variant.id,
        quantity: el.quantity,
      })),
      note: 'This is my note',
      shippingAddress: {
        address1: '2831 West 1st Street',
        address2: '',
        city: 'Santa Ana',
        company: '',
        country: 'United States',
        countryCode: 'US',
        firstName: 'Jose',
        lastName: 'Rivera',
        phone: '7143886920',
        province: 'California',
        provinceCode: 'CA',
        zip: '92703',
      },
      shippingLine,
      // shippingLine: {
      //   price: '5.74',
      //   shippingRateHandle: 'usps-first-class-package',
      //   title: 'USPS First Class Package',
      // },
      tags: [''],
      taxExempt: false,
      useCustomerDefaultAddress: true,
    },
  };
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

    const jsonResponse: any = await response.json();
    // res.status(200).send(jsonResponse);
    const draftOrderId = jsonResponse.data.draftOrderCreate.draftOrder.id;

    const orderData = await completeOrder(draftOrderId);
    res.status(200).send(orderData);
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
