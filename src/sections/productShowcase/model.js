const GET_PRODUCT = `
  query($id: ID!) {
    product(id: $id) {
      name
      description
      details
      quantity
      price
      isLimited
      categories {
        id
        name
      }
      showcase {
        url
        formats
      }
    }
  }
`

export {
  GET_PRODUCT
}