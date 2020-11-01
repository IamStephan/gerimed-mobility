import { Machine, assign, actions } from 'xstate'

// Utils
import { extractStrapiErrors } from '../../../utils/js'
import { getAuthToken } from '../../../utils/js/authToken'

// Storage
import { LocalStorage } from '../index'

// Constants
import { KEYS } from '../../../constants/storage'

// Cart actions
import {
  GetCart,
  GetUserCart,
  AddProduct,
  CartReconcile,
  SetAsUserCart,
  SetCartProducts,
  SetCartDetails
} from './cart_api'

const { pure } = actions

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
        SET_CART_PRODUCTS: '#CartController.loading.setCartProducts',
        SET_DETAILS: '#CartController.loading.setDetails',
        SUBMIT_BANK_TRANSFER: '#CartController.loading.bankTransfer',
        SET_PRODUCTS: '#CartController.loading.setCartProducts'
      }
    },
    loading: {
      states: {
        getCart: GetCart.state,
        getUserCart: GetUserCart.state,
        addProduct: AddProduct.state,
        setCartProducts: SetCartProducts.state,
        setDetails: SetCartDetails.state,

        bankTransfer: {
          invoke: {
            src: 'loading.bankTransfer',
            onDone: {
              actions: 'success.bankTransfer.setCart',
              target: '#CartController.idle'
            },
          }
        },

        cartReconcile: CartReconcile.state,
        setAsUserCart: SetAsUserCart.state
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
    ...GetCart.service,
    ...GetUserCart.service,
    ...AddProduct.service,
    ...SetCartProducts.service,
    ...CartReconcile.service,
    ...SetAsUserCart.service,
    ...SetCartDetails.service
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
     * API Actions
     * ========================================================
     */
    ...GetCart.action,
    ...GetUserCart.action,
    ...AddProduct.action,
    ...CartReconcile.action,
    ...SetAsUserCart.action,
    ...SetCartProducts.action,
    ...SetCartDetails.action,

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