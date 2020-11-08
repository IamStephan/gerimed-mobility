import { assign, send, actions } from 'xstate'

// Utils
import { axiosMutationFactory, extractStrapiErrors } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import {
  ADD_PRODUCT,
  ADD_AND_CREATE
} from '../../models/cart_model'

// Storage
import { LocalStorage } from '../../index'

// Constants
import { KEYS } from '../../../../constants/storage'

const { pure } = actions

// Cart Errors
const cartErrors = {
  // General
  reconcile: 'Cart.cart.reconcileCart',
  invalidUser: 'Cart.cart.invalidUser',
  loginRequired: 'Cart.cart.loginRequired',
  notOpen: 'Cart.cart.cartNotOpen',
  notFound: 'Cart.cart.cartNotFound',
  setAsUserCart: 'Cart.cart.anonymousWithLogin',

  // Specific
  invalidQuantity: 'Cart.cart.invalidQuantity',
  productNotFound: 'Cart.cart.productNotFound',
}

const state = {
  on: {
    NEW_CART: {
      internal: false,
      actions: 'restartCart',
      target: '#CartController.loading.addProduct'
    },
    GOTO_IDLE: {
      target: '#CartController.idle'
    }
  },

  invoke: {
    src: 'loading.addProduct',
    onDone: {
      actions: 'success.addProduct.setCart',
      target: '#CartController.idle'
    },
    onError: {
      actions: ['errors.general.notify']
    }
  }
}

const service = {
  'loading.addProduct': (context, event) => {
    const userToken = getAuthToken()
    let options = {}

    if(userToken) {
      options = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      }
    }

    if(context.cartToken) {
      return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: ADD_PRODUCT,
        variables: {
          productID: event.id,
          quantity: event.quantity,
          cartToken: context.cartToken
        }
      }, options, {
        id: event.id,
        quantity: event.quantity
      })
    } else {
      return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: ADD_AND_CREATE,
        variables: {
          productID: event.id,
          quantity: event.quantity
        }
      }, options, {
        id: event.id,
        quantity: event.quantity
      })
    }
  }
}

const action = {
  'success.addProduct.setCart': pure((context, event) => {
    const { data: { data: { data } } } = event

    if(data?.addAndCreate) {
      LocalStorage.setItem(KEYS.cartToken, data.addAndCreate.cartToken)

      return assign({
        cartToken: data.addAndCreate.cartToken,
        cartData: data.addAndCreate.cart
      })
    }

    if(data?.addProduct) {
      return assign({
        cartData: data.addProduct
      })
    }
  }),

  'error.addProduct.handle': pure((context, event) => {
    const { data } = event

    if(data.strapiErrors) {
      const errors = extractStrapiErrors(data)

      return errors.map((err) => {
        switch(err.id) {
          case cartErrors.invalidUser:
          case cartErrors.loginRequired:
          case cartErrors.notFound:
          case cartErrors.notOpen: {
            return send(() => ({
              type: 'NEW_CART',
              ...data.carryData
            }))
          }

          default: {
            return send('GOTO_IDLE')
          }
        }
      })
    } else {
      return send('GOTO_IDLE')
    }
  }),
}

const AddProduct = {
  state,
  service,
  action
}

export {
  AddProduct
}