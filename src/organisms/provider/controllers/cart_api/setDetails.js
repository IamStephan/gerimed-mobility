import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { SET_CART_DETAILS } from '../../models/cart_model'

const state = {
  invoke: {
    src: 'loading.setCartDetails',
    onDone: {
      actions: 'success.setCartDetails.setCart',
      target: '#CartController.idle'
    },
    onError: {
      target: '#CartController.idle',
      actions: 'error.setCartDetails.handle'
    }
  }
}

const service = {
  'loading.setCartDetails': (context, event) => {
    const {
      address,
      contact
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
      query: SET_CART_DETAILS,
      variables: {
        cartToken: context.cartToken,
        address: address,
        contact: contact
      }
    }, options)
  }
}

const action = {
  'success.setCartDetails.setCart': assign({
    cartData: (_context, event) => {
      const { data: { data: { data: { setCartDetails: cart } } } } = event

      return cart
    }
  }),

  'error.setCartDetails.handle': (context, event) => {
    context.enqueueSnackbar('Could not update details. Please try again.', {
      variant: 'error'
    })

    console.log(event)
  } 
}

const SetCartDetails = {
  state,
  service,
  action
}

export {
  SetCartDetails
}