export const draftOrderComplete = `
  mutation draftOrderComplete($id: ID!) {
    draftOrderComplete(id: $id) {
      draftOrder {
        # DraftOrder fields
        id
        order {
          id
          name
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
