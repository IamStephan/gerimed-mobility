import { assign, send, actions } from 'xstate'

// Utils
import { axiosQueryFactory, extractStrapiErrors } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import {
  GET_CART,
} from '../../models/cart_model'

const { pure } = actions

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
    RESTART_CART: {
      target: '#CartController.ready',
      actions: 'restartCart'
    },

    RECONCILE: {
      target: '#CartController.loading.cartReconcile'
    },

    SET_AS_USER_CART: {
      target: '#CartController.loading.setAsUserCart'
    },

    CANCEL_RECONCILE: {
      actions: 'restartCart',
      target: '#CartController.ready'
    },
    GOTO_IDLE: {
      target: '#CartController.idle'
    }
  },

  invoke: {
    src: 'loading.getCart',
    onDone: {
      actions: 'success.getCart.setCart',
      target: '#CartController.idle'
    },
    onError: {
      actions: 'error.getCart.handle'
    }
  }
}

const service = {
  'loading.getCart': (context) => {
    /**
     * NOTE:
     * ======
     * This service will be called with a token but may or may not have a usertoken
     */
    const userToken = getAuthToken()
    let options = {}

    if(userToken) {
      options = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      }
    }

    return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: GET_CART,
      variables: {
        cartToken: context.cartToken
      }
    }, options)
  },
}

const action = {
  'success.getCart.setCart': assign({
    cartData: (_context, event) => {
      const { data: { data: { data: { getCart: cartData } } } } = event

      return cartData
    }
  }),

  'error.getCart.handle': pure((context, event) => {
    const { data } = event

    if(data.strapiErrors) {
      const errors = extractStrapiErrors(data)

      return errors.map((err) => {
        switch(err.id) {
          case cartErrors.reconcile: {
            return assign({
              reconcileCart: true
            })
          }

          case cartErrors.setAsUserCart: {
            return assign({
              setAsUserCart: true
            })
          }

          default: {
            return send('RESTART_CART')
          }
        }
      })
    } else {
      return send('GOTO_IDLE')
    }
  }),
}

const GetCart = {
  state,
  service,
  action
}

export {
  GetCart
}
