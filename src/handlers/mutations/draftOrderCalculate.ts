export const draftOrderCalculate = `
mutation draftOrderCalculate($input: DraftOrderInput!) {
  draftOrderCalculate(input: $input) {
    calculatedDraftOrder {
      subtotalPrice
      totalPrice
      totalShippingPrice
      totalTax
      availableShippingRates {
        handle
        title
        price {
          amount
        }
      }
      lineItems {
        name
        sku
        originalUnitPrice {
          amount
        }
        product {
          handle
        }
        variant {
          id
        }
        quantity
        image {
          url
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}

`;
