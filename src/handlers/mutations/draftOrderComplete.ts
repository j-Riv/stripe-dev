export const draftOrderComplete = `
  mutation draftOrderComplete($id: ID!) {
    draftOrderComplete(id: $id) {
      draftOrder {
        # DraftOrder fields
      }
      userErrors {
        field
        message
      }
    }
  }
`;
