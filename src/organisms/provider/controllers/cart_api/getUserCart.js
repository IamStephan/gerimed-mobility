import { assign } from 'xstate'

// Utils
import { axiosQueryFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { GET_USER_CART } from '../../models/cart_model'

// Storage
import { LocalStorage } from '../../index'

// Constants
import { KEYS } from '../../../../constants/storage'

const state = {
  invoke: {
    src: 'loading.getUserCart',
    onDone: {
      actions: 'success.getUserCart.setCart',
      target: '#CartController.idle'
    },
    onError: {
      actions: ['restartCart'],
      target: '#CartController.idle'
    }
  }
}

const service = {
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
  }
}

const action = {
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
  })
}

const GetUserCart = {
  state,
  service,
  action
}

export {
  GetUserCart
}