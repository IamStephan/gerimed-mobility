import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { SET_CART_PRODUCTS } from '../../models/cart_model'

const state = {
  invoke: {
    src: 'loading.setCartProducts',
    onDone: {
      actions: 'success.setCartProducts.setCart',
      target: '#CartController.idle'
    },
    onError: {
      target: '#CartController.idle',
      actions: 'error.setCartProducts.handle'
    }
  }
}

const service = {
  'loading.setCartProducts': (context, event) => {
    const {
      products
    } = event

    const userToken = getAuthToken()
    let options = {}

    if(userToken) {
      options = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      }
    }

    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: SET_CART_PRODUCTS,
      variables: {
        cartToken: context.cartToken,
        products: products
      }
    }, options)
  }
}

const action = {
  'success.setCartProducts.setCart': assign({
    cartData: (_context, event) => {
      const { data: { data: { data: { setCartProducts: cart } } } } = event

      return cart
    }
  }),

  'error.setCartProducts.handle': (context, event) => {
    context.enqueueSnackbar('Could not update cart. Please try again.', {
      variant: 'error'
    })

    console.log(event)
  } 
}

const SetCartProducts = {
  state,
  service,
  action
}

export {
  SetCartProducts
}