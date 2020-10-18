import { Machine, assign, send, actions } from 'xstate'

// Utils
import { axiosQueryFactory } from '../../../utils/js'
import { getAuthToken } from '../../../utils/js/authToken'

// Models
import {
  GET_CART,
  GET_USER_CART,
  ADD_AND_CREATE,
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from '../models/cart_model'

// Storage
import { LocalStorage } from '../index'

// Constants
import { KEYS } from '../../../constants/storage'

const { pure } = actions

const CartController = new Machine({
  id: 'CartController',
  context: {
    cartToken: null,
    cartData: null,
    enqueueSnackbar: null
  },
  initial: 'ready',
  states: {
    ready: {
      entry: 'getCartToken',
      always: [
        {
          target: '#CartController.loading.getCart',
          cond: 'hasCartToken'
        },
        {
          target: '#CartController.loading.getUserCart',
          cond: 'hasUserToken'
        },
        {
          target: '#CartController.idle'
        }
      ]
    },
    idle: {
      on: {
        ADD_PRODUCT: '#CartController.loading.addProduct',
        REMOVE_PRODUCT: '#CartController.loading.removeProduct',
        SET_PRODUCT_QUANTITIES: '#CartController.loading.setProductQuantities',
        SET_DETAILS: '#CartController.loading.setDetails',
        CLEAR_CART: '#CartController.loading.clearCart',
        SUBMIT_BANK_TRANSFER: '#CartController.loading.bankTransfer'
      }
    },
    loading: {
      states: {
        getCart: {
          invoke: {
            src: 'loading.getCart',
            onDone: {
              actions: 'success.getCart.setCart',
              target: '#CartController.idle'
            },
    
            onError: {
              actions: 'error.getCart.notify',
              target: '#CartController.idle'
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
    
            onError: {
              actions: 'error.getUserCart.notify',
              target: '#CartController.idle'
            }
          }
        },

        addProduct: {
          invoke: {
            src: 'loading.addProduct',
            onDone: {
              actions: 'success.addProduct.setCart',
              target: '#CartController.idle'
            },
            onDone: {
              actions: 'error.addProduct.notify',
              target: '#CartController.idle'
            }
          }
        },

        removeProduct: {
          invoke: {
            src: 'loading.removeProduct',
            onDone: {
              actions: 'success.removeProduct.setCart',
              target: '#CartController.idle'
            },
            onDone: {
              actions: 'error.removeProduct.notify',
              target: '#CartController.idle'
            }
          }
        },

        setProductQuantities: {
          invoke: {
            src: 'loading.setProductQuantities',
            onDone: {
              actions: 'success.setProductQuantities.setCart',
              target: '#CartController.idle'
            },
            onDone: {
              actions: 'error.setProductQuantities.notify',
              target: '#CartController.idle'
            }
          }
        },

        setDetails: {
          invoke: {
            src: 'loading.setDetails',
            onDone: {
              actions: 'success.setDetails.setCart',
              target: '#CartController.idle'
            },
            onDone: {
              actions: 'error.setDetails.notify',
              target: '#CartController.idle'
            }
          }
        },

        clearCart: {
          invoke: {
            src: 'loading.clearCart',
            onDone: {
              actions: 'success.clearCart.setCart',
              target: '#CartController.idle'
            },
            onDone: {
              actions: 'error.clearCart.notify',
              target: '#CartController.idle'
            }
          }
        },

        bankTransfer: {
          invoke: {
            src: 'loading.bankTransfer',
            onDone: {
              actions: 'success.bankTransfer.setCart',
              target: '#CartController.idle'
            },
            onDone: {
              actions: 'error.bankTransfer.notify',
              target: '#CartController.idle'
            }
          }
        },

        getUserCart: {},

        cartReconcile: {}
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
    }
  }
}, {
  services: {
    tokenDetection: () => (send) => {
      if(typeof window === 'undefined') return
      
      window.addEventListener('storageChange', () => {
        send('USER_CHANGE')
      })
    },

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
    }
  },
  actions: {
    setNotificationsHandler: assign({
      enqueueSnackbar: (_context, event) => event.enqueueSnackbar
    }),

    getCartToken: assign({
      cartToken: () => LocalStorage.getItem(KEYS.cartToken)
    }),

    cleanCartData: assign({
      cartData: null
    }),

    /**
     * GET CART
     */
    'success.getCart.setCart': assign({
      cartData: (_context, event) => {
        const { data: { data: { data: { getCart: cartData } } } } = event
  
        return cartData
      }
    }),

    'error.getCart.notify': (context, event) => {
      console.log(event)
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