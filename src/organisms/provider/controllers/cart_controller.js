import { Machine, assign, send, actions } from 'xstate'

// Utils
import { axiosMutationFactory, axiosQueryFactory, extractStrapiErrors } from '../../../utils/js'
import { getAuthToken } from '../../../utils/js/authToken'

// Models
import {
  GET_CART,
  GET_USER_CART,
  ADD_AND_CREATE,
  ADD_PRODUCT,
  CART_RECONCILE,
  SET_CART_AS_USER_CART
} from '../models/cart_model'

// Storage
import { LocalStorage } from '../index'

// Constants
import { KEYS } from '../../../constants/storage'

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

const CartController = new Machine({
  id: 'CartController',
  context: {
    cartToken: null,
    cartData: null,
    reconcileCart: false,
    setAsUserCart: false,
    enqueueSnackbar: null
  },
  initial: 'ready',
  states: {
    ready: {
      //entry: 'getCartToken',
      target: '#CartController.idle'
      // always: [
      //   {
      //     target: '#CartController.loading.getCart',
      //     cond: 'hasCartToken'
      //   },
      //   {
      //     target: '#CartController.loading.getUserCart',
      //     cond: 'hasUserToken'
      //   },
      //   {
      //     target: '#CartController.idle'
      //   }
      // ]
    },
    idle: {
      // on: {
      //   ADD_PRODUCT: '#CartController.loading.addProduct',
      //   SET_CART_PRODUCTS: '#CartController.loading.setCartProducts',
      //   SET_DETAILS: '#CartController.loading.setDetails',
      //   CLEAR_CART: '#CartController.loading.clearCart',
      //   SUBMIT_BANK_TRANSFER: '#CartController.loading.bankTransfer'
      // }
    },
    loading: {
      states: {
        getCart: {
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
        },

        getUserCart: {
          invoke: {
            src: 'loading.getUserCart',
            onDone: {
              actions: 'success.getUserCart.setCart',
              target: '#CartController.idle'
            },
          }
        },

        addProduct: {
          on: {
            ADD_AND_CREATE: ''
          },
          invoke: {
            src: 'loading.addProduct',
            onDone: {
              actions: 'success.addProduct.setCart',
              target: '#CartController.idle'
            },
            onError: {
              actions: 'error.addProduct.handle'
            }
          }
        },

        setCartProducts: {
          invoke: {
            src: 'loading.setCartProducts',
            onDone: {
              actions: 'success.setCartProducts.setCart',
              target: '#CartController.idle'
            },
          }
        },

        setDetails: {
          invoke: {
            src: 'loading.setDetails',
            onDone: {
              actions: 'success.setDetails.setCart',
              target: '#CartController.idle'
            },
          }
        },

        clearCart: {
          invoke: {
            src: 'loading.clearCart',
            onDone: {
              actions: 'success.clearCart.setCart',
              target: '#CartController.idle'
            },
          }
        },

        bankTransfer: {
          invoke: {
            src: 'loading.bankTransfer',
            onDone: {
              actions: 'success.bankTransfer.setCart',
              target: '#CartController.idle'
            },
          }
        },

        cartReconcile: {
          invoke: {
            src: 'loading.reconcileCart',
            onDone: {
              actions: 'success.reconcileCart.setCart',
              target: '#CartController.idle'
            },
            onError: {
              actions: 'error.reconcileCart.handle',
              target: '#CartController.ready'
            }
          }
        },

        setAsUserCart: {
          invoke: {
            src: 'loading.setAsUserCart',
            onDone: {
              actions: 'success.setAsUserCart.setCart',
              target: '#CartController.idle'
            },
            onError: {
              actions: 'error.setAsUserCart.handle',
              target: '#CartController.ready'
            }
          }
        }
      },
    }
  },
  invoke: {
    src: 'tokenDetection'
  },
  on: {
    SET_NOTIFICATIONS_HANDLER: {
      actions: 'setNotificationsHandler'
    },
    USER_CHANGE: {
      target: '#CartController.ready',
      actions: 'cleanCartData'
    },
  }
}, {
  services: {
    tokenDetection: () => (send) => {
      if(typeof window === 'undefined') return
      
      window.addEventListener('storageChange', (e) => {
        const { detail } = e

        if(detail === KEYS.auth) {
          send('USER_CHANGE')
        }
      })
    },

    /**
     * LOADING SERVICES
     * ========================================================
     */

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

    'loading.getUserCart': () => {
      /**
       * NOTE:
       * ======
       * This service will be called with a token but may or may not have a usertoken
       */
      const userToken = getAuthToken()

      return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: GET_USER_CART
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      })
    },
    
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
        }, options)
      } else {
        return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
          query: ADD_AND_CREATE,
          variables: {
            productID: event.id,
            quantity: event.quantity
          }
        }, options)
      }
    },

    'loading.setCartProducts': (context, event) => {

    },

    'loading.reconcileCart': (context, event) => {
      const {
        mode
      } = event

      const userToken = getAuthToken()

      return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: CART_RECONCILE,
        variables: {
          cartToken: context.cartToken,
          mode: mode
        }
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      })
    },

    'loading.setAsUserCart': (context, event) => {
      const userToken = getAuthToken()

      return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: SET_CART_AS_USER_CART,
        variables: {
          cartToken: context.cartToken
        }
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      })
    }
  },
  actions: {
    /**
     * GENERAL
     * ========================================================
     */
    setNotificationsHandler: assign({
      enqueueSnackbar: (_context, event) => event.enqueueSnackbar
    }),

    getCartToken: assign({
      cartToken: () => LocalStorage.getItem(KEYS.cartToken)
    }),

    cleanCartData: assign({
      cartData: null,
      reconcileCart: false,
      setAsUserCart: false
    }),

    restartCart: pure(() => {
      LocalStorage.removeItem(KEYS.cartToken)
      
      return assign({
        cartToken: null,
        cartData: null,
        reconcileCart: false,
        setAsUserCart: false
      })
    }),

    /**
     * SUCCESS
     * ========================================================
     */
    'success.getCart.setCart': assign({
      cartData: (_context, event) => {
        const { data: { data: { data: { getCart: cartData } } } } = event
  
        return cartData
      }
    }),

    'success.getUserCart.setCart': assign({
      cartData: (_context, event) => {
        const { data: { data: { data: { getUserCart } } } } = event
  
        return getUserCart.cart
      },
      cartToken: (_context, event) => {
        const { data: { data: { data: { getUserCart } } } } = event

        LocalStorage.setItem(KEYS.cartToken, getUserCart.cartToken)
  
        return getUserCart.cartToken
      }
    }),

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

    'success.reconcileCart.setCart': assign({
      cartToken: (_context, event) => {
        const { data: { data: { data: { cartReconciliation: { cartToken } } } } } = event

        LocalStorage.setItem(KEYS.cartToken, cartToken)

        return cartToken
      },
      cartData: (_context, event) => {
        const { data: { data: { data: { cartReconciliation: { cart } } } } } = event

        return cart
      },
      reconcileCart: false
    }),

    'success.setAsUserCart.setCart': assign({
      cartToken: (_context, event) => {
        const { data: { data: { data: { setCartAsUserCart: { cartToken } } } } } = event

        LocalStorage.setItem(KEYS.cartToken, cartToken)

        return cartToken
      },
      cartData: (_context, event) => {
        const { data: { data: { data: { setCartAsUserCart: { cart } } } } } = event

        return cart
      },
      setAsUserCart: false
    }),


    /**
     * ERROR
     * ========================================================
     */
    'error.addProduct.handle': (context, event) => {
      console.log(event)
    },

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

      }
    }),
    
    'error.reconcileCart.handle': assign({
      cartData: null,
      cartToken: () => {
        LocalStorage.removeItem(KEYS.cartToken)

        return null
      },
      reconcileCart: (c, event) => {
        console.log(event)
        return false
      }
    }),

    'error.setAsUserCart.handle': assign({
      cartData: null,
      cartToken: () => {
        LocalStorage.removeItem(KEYS.cartToken)

        return null
      },
      setAsUserCart: (c, event) => {
        console.log(event)
        return false
      }
    }),


    /**
     * DEV Errors
     */
    'cart.invoke.error': (context, event) => {
      const { data } = event

      const errors = extractStrapiErrors(data) || []

      errors.forEach((err) => {
        context.enqueueSnackbar(err.message, {
          variant: 'error'
        })
      })
    }
  },
  guards: {
    hasCartToken: (context) => !!context.cartToken,
    hasUserToken: () => !!getAuthToken()
  }
})

export {
  CartController
}