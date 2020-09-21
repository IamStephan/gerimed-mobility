import { Machine } from 'xstate'

// Constants
import { TOKEN_KEY } from '../../constants/profile'

// Gatsby
import { navigate } from 'gatsby'

const LocalController = new Machine({
  id: 'PrivateRoute',
  initial: 'ready',
  states: {
    ready: {
      always: [
        { target: 'authorized', cond: 'hasToken' },
        { target: 'unauthorized' }
      ]
    },
    authorized: {},
    unauthorized: {
      type: 'final',
      entry: 'goToLogin'
    },
  }
}, {
  guards: {
    hasToken: () => {
      try {
        return !!sessionStorage.getItem(TOKEN_KEY.jwt) || !!localStorage.getItem(TOKEN_KEY.jwt)
      } catch(e) {
        alert('Could not get/set token due to browser restrictions. Authenticated pages might not work')
        return false
      }
    }
  },
  actions: {
    goToLogin: () => {
      navigate('/profile/login')
    },
  },
})

export {
  LocalController
}