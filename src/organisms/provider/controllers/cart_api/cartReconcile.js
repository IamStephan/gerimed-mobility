import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { CART_RECONCILE } from '../../models/cart_model'

// Storage
import { LocalStorage } from '../../index'

// Constants
import { KEYS } from '../../../../constants/storage'

const state = {
  invoke: {
    src: 'loading.reconcileCart',
    onDone: {
      actions: 'success.reconcileCart.setCart',
      target: '#CartController.idle'
    },
    onError: {
      actions: ['error.reconcileCart.handle'],
      target: '#CartController.ready'
    }
  }
}

const service = {
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
  }
}

const action = {
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
  })
}

const CartReconcile = {
  state,
  service,
  action
}

export {
  CartReconcile
}