export const draftOrderCreate = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        # DraftOrder fields
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
