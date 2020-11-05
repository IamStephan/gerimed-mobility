// Utils
import { axiosMutationFactory } from '../../../../utils/js'

// Models
import { FORGOT } from '../../models/auth_model'

const state = {
  invoke: {
    src: 'loading.forgot',
    onDone: {
      target: '#AuthController.idle.guest',
      actions: 'loading.successForgot'
    },
    onError: {
      target: '#AuthController.idle.guest',
      actions: ['errors.general.notify', 'removeToken']
    }
  }
}

const service = {
  'loading.forgot': (_context, event) => {
    const {
      email,
    } = event

    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: FORGOT,
      variables: {
        email
      }
    })
  }
}

const action = {
  'loading.successForgot': (context) => {
    if(!context.enqueueSnackbar) return

    context.enqueueSnackbar('Success, please check your email for the reset link.', {
      variant: 'success'
    })
  }
}

const Forgot = {
  state,
  service,
  action
}

export {
  Forgot
}