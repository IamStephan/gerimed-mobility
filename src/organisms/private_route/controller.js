import { Machine, assign } from 'xstate'

// Utils
import { axiosQueryAuthFactory } from '../../utils/js'

// Model
import { GET_USER_INFO } from './model'

// Constants
import { TOKEN_KEY } from '../../constants/profile'

// Gatsby
import { navigate } from 'gatsby'

const RETRY_LIMIT = 3
const STALE_LOAD_TIMEOUT = 1500
const TIMEOUT = 5000

const LocalController = new Machine({
  id: 'PrivateRoute',
  initial: 'ready',
  context: {
    retries: 0,
    token: null,
    errors: null,
    staleLoad: false,
    userInfo: null
  },
  states: {
    ready: {
      always: [
        { target: 'loadUserInfo', cond: 'hasToken' },
        { target: 'unauthorized' }
      ]
    },
    loadUserInfo: {
      after: {
        [STALE_LOAD_TIMEOUT]: {
          actions: 'activateStaleLoad'
        }, // <== stale load (show loader)
        //[TIMEOUT]: 'retry' // <== proper timeout (retry, states are self-cancelling, so the request is canceled, STATE MACHINES!)
      },
      entry: 'getToken',
      invoke: {
        src: 'getUser',
        onDone: {
          actions: 'setUserInfo',
          target: 'authorized'
        },
        onError: {
          target: 'unauthorized'
        }
      }
    },
    authorized: {
      /**
       * NOTE:
       * =====
       * When the private route is in this state it means that
       * he/she is logged in, this allows me to spawn an actor
       * of this machine and send events depending on what the
       * actions are
       */
      on: {
        LOGOUT: '',
        UPDATEME: ''
      }
    },
    unauthorized: {
      type: 'final',
      entry: 'goToLogin'
    },
    fail: {
      /**
       * NOTE:
       * =====
       * when this happens, ask the user if they want to refresh the page
       * if not go to the homepage> This could be a problem with either
       * the network of the user(to slow) or it can be something big like
       * the server being down. In that case maybe its a good
       * idea to send an notification of some sorts from the
       * client to a third party service to let me know
       */
      type: 'final',

    },
  }
}, {
  guards: {
    hasToken: () => {
      // sessionSorage and localStorage can throw
      // Reason: the user is in private mode or has storage restriction
      try {
        // The item should be stored as a string and not a stringified object
        // the key can be in either localStorage or sessionStorage, depending on how the user logged in
        // String might be empty, so js cast and short circuit to get a truthy or falsy bool
        console.log(!!sessionStorage.getItem(TOKEN_KEY.jwt) || !!localStorage.getItem(TOKEN_KEY.jwt))
        return !!sessionStorage.getItem(TOKEN_KEY.jwt) || !!localStorage.getItem(TOKEN_KEY.jwt)
      } catch(e) {
        // In this case the user will not be able to get info even if the login was successful
        return false
      }
    }
  },
  actions: {
    getToken: assign({
      token: () => sessionStorage.getItem(TOKEN_KEY.jwt) || localStorage.getItem(TOKEN_KEY.jwt)
    }),
    activateStaleLoad: assign({
      staleLoad: true
    }),
    increaseRetries: assign({
      retries: (context) => context.retries + 1
    }),
    setUserInfo: assign({
      userInfo: (_context, { data: { data: { data}}}) => ({ ...data.meDepth })
    }),
    goToLogin: () => {
      navigate('/profile/login')
    },
  },
  services: {
    getUser: (context) => {
      return axiosQueryAuthFactory('http://localhost:1337/graphql', {
        query: GET_USER_INFO
      }, {
        headers: {
          Authorization: `Bearer ${context.token}`,
        }
      })
    }
  }
})

export {
  LocalController
}