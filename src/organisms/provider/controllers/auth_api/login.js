import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'

// Models
import { LOGIN } from '../../models/auth_model'

const state = {
  invoke: {
    src: 'loading.login',
    onDone: {
      target: '#AuthController.idle.user',
      actions: ['setToken', 'login.setUser']
    },
    onError: {
      target: '#AuthController.idle.guest',
      actions: 'errors.general.notify'
    }
  }
}

const service = {
  'loading.login': (_context, event) => {
    const {
      email,
      password,
      shouldRemember
    } = event

    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: LOGIN,
      variables: {
        email,
        password
      }
    }, {}, {
      shouldRemember
    })
  }
}

const action = {
  'login.setUser': assign({
    user: (_context, event) => {
      const {
        data: {
          data: { data: { signin: { user } } }
        }
      } = event

      return user
    }
  })
}

const Login = {
  state,
  service,
  action
}

export {
  Login
}