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
    showcase {
      formats
      url
    }
    product_name
    quantity
    price
  }
`
// Using this to decrease data load and as a temp measure
const ORDER_FRAGMENT_SIMPLIFIED = `
  id
  createdAt
  state
  reference
`

const GET_MY_ORDERS = `
  query{
    getMe {
      orders {
        ${ORDER_FRAGMENT_SIMPLIFIED}
      }
    }
  }
`

export {
  GET_MY_ORDERS
}