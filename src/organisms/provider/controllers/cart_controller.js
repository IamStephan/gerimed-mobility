import { Machine, assign, send, actions } from 'xstate'

// Utils
import { getAuthToken } from '../../../utils/js/authToken'

// Storage
import { LocalStorage } from '../index'

// Constants
import { KEYS } from '../../../constants/storage'

const { pure } = actions

const CartController = new Machine({
  id: 'CartController',
  context: {
    products: {},
    shipping: {},
    contact: {},
    activeCartToken: null,
    enqueueSnackbar: null
  },
  initial: 'ready',
  states: {
    ready: {
      invoke: {
        src: 'cartStartup'
      }
    },
    idle: {},
    loading: {
      states: {
        getUserCart: {},

      }
    },
  },
  invoke: {
    src: 'tokenDetection'
  },
  on: {
    SET_NOTIFICATIONS_HANDLER: {
      actions: 'setNotificationsHandler'
    },
    USER_CHANGE: {

    },
    GET_USER_CART_TOKEN: {

    }
  }
}, {
  services: {
    tokenDetection: () => (send) => {
      window.addEventListener('storageChange', () => {
        send('USER_CHANGE')
      })
    },
    cartStartup: () => async (send) => {
      let userToken = getAuthToken()
      let cartToken = LocalStorage.getItem(KEYS.cartToken)

      if(userToken) {
        // Get currently active cart of the user
        
      }
    }
  },
  actions: {
    setNotificationsHandler: assign({
      enqueueSnackbar: (_context, event) => event.enqueueSnackbar
    })
  }
})

export {
  CartController
}