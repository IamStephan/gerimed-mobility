import { assign } from 'xstate'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

// Models
import { UPDATE_ME } from '../../models/auth_model'

const state = {
  invoke: {
    src: 'loading.update',
    onDone: {
      target: '#AuthController.idle.user',
      actions: 'update.setUser'
    },
    onError: {
      target: '#AuthController.idle.guest',
      actions: 'errors.general.notify'
    }
  }
}

const service = {
  'loading.update': (_context, event) => {
    const { data } = event
    const token = getAuthToken()

    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: UPDATE_ME,
      variables: {
        data
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}

const action = {
  'update.setUser': assign({
    user: (_context, event) => {
      const {
        data: {
          data: { data: { updateMe } }
        }
      } = event

      return updateMe
    }
  })
}

const Update = {
  state,
  service,
  action
}

export {
  Update
}