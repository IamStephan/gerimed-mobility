import { actions, send } from 'xstate'

// Utils
import { axiosQueryFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// URL
import { stringify } from 'qs'

// Models
import { SUBMIT_BANK_TRANSFER } from '../../models/cart_model'

// Gatsby
import { navigate } from 'gatsby'

// Constants
import { KEYS } from '../../../../constants/storage'

const { pure } = actions

const state = {
  on: {
    DONE: {
      actions: 'restartCart',
      target: '#CartController.idle'
    }
  },
  invoke: {
    src: 'loading.bankTransfer',
    onDone: {
      actions: 'success.bankTranfer.message'
    },
    onError: {
      actions: (ctx, e) => {
        console.log(e)
      },
      target: '#CartController.idle'
    }
  }
}

const service = {
  'loading.bankTransfer': (context) => {
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
      query: SUBMIT_BANK_TRANSFER,
      variables: {
        cartToken: context.cartToken
      }
    }, options)
  }
}

const action = {
  'success.bankTranfer.message': pure((context, event) => {
    /**
     * NOTE:
     * =====
     * This is a sort of final action, therefore,
     * redirection to a transaction page would be acceptable
     * 
     * Also this action gets called first meaning the cart data
     * still exists. When redirecting use this information and put the
     * cart reference inside the url.
     * 
     * This has a few beneifts. One being that it makes the transaction page stateless.
     * Giving the user a second chance at order reference recovery(being that the reference is in the
     * location history)
     */
    const data = {
      type: 'manual',
      reference: context.cartData?.reference
    }

    const queryString = stringify(data)
    
    navigate(`/results?${queryString}`)
    
    return send('DONE')
  })
}

const BankTransfer = {
  state,
  service,
  action
}

export {
  BankTransfer
}