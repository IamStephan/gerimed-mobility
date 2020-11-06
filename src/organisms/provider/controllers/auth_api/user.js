import { assign } from 'xstate'

// Utils
import { axiosQueryFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { GET_USER } from '../../models/auth_model'

const state = {
  invoke: {
    src: 'loading.user',
    onDone: {
      target: '#AuthController.idle.user',
      actions: 'user.setUser'
    },
    onError: {
      target: '#AuthController.idle.guest',
      actions: 'errors.general.notify'
    }
  }
}

const service = {
  'loading.user': (_context) => {
    const token = getAuthToken()

    return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: GET_USER
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}

const action = {
  'user.setUser': assign({
    user: (_context, event) => {
      const {
        data: {
          data: { data: { getMe: user } }
        }
      } = event

      return user
    }
  }),
}

const User = {
  state,
  service,
  action
}

export {
  User
}