const GET_PRODUCT = `
  query($id: ID!) {
    product(id: $id) {
      id
      name
      description
      details
      quantity
      price
      shopOnly
      isLimited
      quantity
      product_discount {
        discounted_price
      }
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