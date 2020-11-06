const TRACK_ORDER = `
  query (
    $reference: String!
  ) {
    trackOrder(
      input: {
        orderReference: $reference
      }
    ) {
      id
      reference
      state
      email
    }
  }
`

export {
  TRACK_ORDER
}