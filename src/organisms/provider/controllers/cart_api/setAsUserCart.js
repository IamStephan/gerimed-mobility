import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { SET_CART_AS_USER_CART } from '../../models/cart_model'

// Storage
import { LocalStorage } from '../../index'

// Constants
import { KEYS } from '../../../../constants/storage'

const state = {
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

const service = {
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
}

const action = {
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
}

const SetAsUserCart = {
  state,
  service,
  action
}

export {
  SetAsUserCart
}