/**
 * Fragments
 */
const CART_FRAGMENT = `
  contact {
    email
    phone
  }
  address {
    addressLineOne
    addressLineTwo
    addressLineTwo
    suburb
    post_code
    province
    country
  }
  cart {
    products {
      product {
        name
        price
        weight
        isLimited
        quantity
        showcase(
          limit: 1,
          start: 0
        ) {
          url
          formats
        }
        categories {
          name
          id
        }
      }
      quantity
    }
  }
`


const GET_CART = `
  query($cartToken: String!) {
    getCart(cartToken: $cartToken) {
      ${CART_FRAGMENT}
    }
  }
`

const GET_USER_CART = `
  query {
    getUserCart {
      cartToken
      cart {
        ${CART_FRAGMENT}
      }
    }
  }
`

const ADD_AND_CREATE = `
  mutation(
    $productID: ID!,
    $quantity: Int!
  ) {
    addAndCreate(
      input: {
        productID: $productID,
        quantity: $quantity
      }
    ) {
      cartToken
      cart {
        ${CART_FRAGMENT}
      }
    }
  }
`

const ADD_PRODUCT = `
  mutation(
    $cartToken: String!,
    $productID: ID!,
    $quantity: Int!
  ) {
    addProduct(
      input: {
        cartToken: $cartToken,
        productID: $productID,
        quantity: $quantity
      }
    ) {
      ${CART_FRAGMENT}
    }
  }
`

const SET_CART_PRODUCTS = `
  
`

const CLEAR_PRODUCT = `
  mutation(
    $cartToken: String!
  ) {
    clearCart(
      input: {
        cartToken: $cartToken
      }
    ) {
      ${CART_FRAGMENT}
    }
  }
`

const SET_PRODUCT_QUANTITY = `
  mutation(
    $cartToken: String!,
    $products: [{
      $productID: ID!,
      $quantity: Int!
    }]
  ) {
    setProductQuantity(
      input: {
        cartToken: cartToken,
        products: $products
      }
    ) {
      ${CART_FRAGMENT}
    }
  }
`

const SET_CART_DETAILS = `
  mutation(

  ) {
    setCartDetails(

    ) {
      ${CART_FRAGMENT}
    }
  }
`

const CART_RECONCILE = `
  mutation(
    $cartToken: String!,
    $mode: ReconcileMode!
  ) {
    cartReconciliation(
      input: {
        cartToken: $cartToken,
        mode: $mode
      }
    ) {
      cart {
        ${CART_FRAGMENT}
      }
      cartToken
    }
  }
`

const SET_CART_AS_USER_CART = `
  mutation(
    $cartToken: String!
  ) {
    setCartAsUserCart(
      input: {
        cartToken: $cartToken
      }
    ) {
      cart {
        ${CART_FRAGMENT}
      }
      cartToken
    }
  }
`

const SUBMIT_BANK_TRANSFER = ``

const SUBMIT_PAYMENT_GATEWAY = ``
 
export {
  GET_CART,
  GET_USER_CART,
  ADD_AND_CREATE,
  ADD_PRODUCT,
  SET_CART_PRODUCTS,
  CART_RECONCILE,
  SET_CART_AS_USER_CART
}