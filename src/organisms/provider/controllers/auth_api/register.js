// Utils
import { axiosMutationFactory } from '../../../../utils/js'

// Models
import { REGISTER } from '../../models/auth_model'

const state = {
  invoke: {
    src: 'loading.register',
    onDone: {
      target: '#AuthController.idle.guest',
      actions: 'loading.successRegister'
    },
    onError: {
      target: '#AuthController.idle.guest',
      actions: 'errors.general.notify'
    }
  }
}

const service = {
  'loading.register': (_context, event) => {
    const {
      firstName,
      lastName,
      email,
      username,
      password
    } = event

    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: REGISTER,
      variables: {
        firstName,
        lastName,
        email,
        username,
        password
      }
    })
  }
}

const action = {
  'loading.successRegister': (context) => {
    if(!context.enqueueSnackbar) return

    context.enqueueSnackbar('Success, please check your email for the confirmation link.', {
      variant: 'success'
    })
  }
}

const Register = {
  state,
  service,
  action
}

export {
  Register
}