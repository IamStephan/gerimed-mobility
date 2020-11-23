import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'

// Models
import { SET_CART_SHIPPING_OPTION } from '../../models/cart_model'

const state = {
  invoke: {
    src: 'loading.setCartShippingOption',
    onDone: {
      actions: 'success.setCartShippingOption.setCart',
      target: '#CartController.idle'
    },
    onError: {
      target: '#CartController.idle',
      actions: ['error.setCartShippingOption.handle']
    }
  }
}

const service = {
  'loading.setCartShippingOption': (context) => {
    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: SET_CART_SHIPPING_OPTION,
      variables: {
        cartToken: context.cartToken,
        option: context.shippingOption
      }
    })
  }
}

const action = {
  'success.setCartShippingOption.setCart': assign({
    cartData: (_context, event) => {
      const { data: { data: { data: { setCartShippingOption: cart } } } } = event

      return cart
    }
  }),

  'error.setCartShippingOption.handle': (context, event) => {
    context.enqueueSnackbar('Could not update shipping option. Please try again.', {
      variant: 'error'
    })

    console.log(event)
  } 
}

const SetCartShippingOption = {
  state,
  service,
  action
}

export {
  SetCartShippingOption
}