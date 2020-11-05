// URL
import { parse } from 'qs'

// Utils
import { axiosMutationFactory } from '../../../../utils/js'

// Models
import { RESET_PASSWORD } from '../../models/auth_model'

const state = {
  invoke: {
    src: 'loading.reset_password',
    onDone: {
      target: '#AuthController.idle.guest'
    },
    onError: {
      target: '#AuthController.idle.guest',
      actions: 'errors.general.notify'
    }
  }
}

const service = {
  'loading.reset_password': (_context, event) => {
    const {
      password,
      confirmPassword
    } = event

    const search = window.location.search.substring(1)
    let code

    try {
      const obj = parse(search)
      code = obj.code || '___NOCODE___'
    } catch(e) {
      code = '___NOCODE___'
    }

    return axiosMutationFactory(`${process.env.GATSBY_API_URL}/graphql`, {
      query: RESET_PASSWORD,
      variables: {
        password,
        confirmPassword,
        code
      }
    })
  }
}

const ResetPassword = {
  state,
  service
}

export {
  ResetPassword
}