const ORDER_FRAGMENT = `
  id
  createdAt
  state
  reference
  contact {
    email
    phone
  }
  address {
    addressLineOne
    addressLineTwo
    suburb
    post_code
    province
    country
  }
  products {
    id
    product_name
    quantity
    price
  }
`

const ORDER_QUERY = `
  query(
    $limit: Int!,
    $offset: Int!
  ) {
    getMyOrders(
      input: {
        start: $offset,
        limit: $limit
      }
    ) {
      ${ORDER_FRAGMENT}
    }

    countMyOrders
  }
`

export {
  ORDER_QUERY
}