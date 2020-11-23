/**
 * Fragments
 */
const CART_FRAGMENT = `
  id
  contact {
    email
    phone
  }
  reference
  address {
    addressLineOne
    addressLineTwo
    addressLineTwo
    suburb
    post_code
    province
    country
  }
  shippingOption {
    option
  }
  cart {
    products {
      product {
        id
        name
        price
        weight
        isLimited
        quantity

        product_discount {
          discounted_price
        }

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
  mutation(
    $cartToken: String!
    $products: [SetProductQuantityProductsInput]
  ) {
    setCartProducts(
      input: {
        cartToken: $cartToken,
        products: $products
      }
    ) {
      ${CART_FRAGMENT}
    }
  }
`

const CLEAR_CART = `
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



const SET_CART_DETAILS = `
  mutation(
    $cartToken: String!
    $address: editComponentUserAddressInput!
    $contact: editComponentUserContactDetailInput!
  ) {
    setCartDetails(
      input: {
        cartToken: $cartToken,
        address: $address
        contact: $contact
      }
    ) {
      ${CART_FRAGMENT}
    }
  }
`

const SET_CART_SHIPPING_OPTION = `
  mutation(
    $cartID: ID!
    $option: ENUM_COMPONENTSHIPPINGSHIPPING_OPTION!
  ) {
    updateCart(
      where: {
        id: $cartID
      }
      input: {
        data: {
          shippingOption: {
            option: $option
          }
        }
      }
    ) {
      cart {
        ${CART_FRAGMENT}
      }
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

const SUBMIT_BANK_TRANSFER = `
  mutation(
    $cartToken: String!
  ) {
    bankTransfer(
      input: {
        cartToken: $cartToken
      }
    ) {
      ok
    }
  }
`

// const SUBMIT_PAYMENT_GATEWAY = ``
 
export {
  GET_CART,
  GET_USER_CART,
  ADD_AND_CREATE,
  ADD_PRODUCT,
  SET_CART_PRODUCTS,
  SET_CART_DETAILS,
  SET_CART_SHIPPING_OPTION,
  CLEAR_CART,
  CART_RECONCILE,
  SET_CART_AS_USER_CART,
  SUBMIT_BANK_TRANSFER
}