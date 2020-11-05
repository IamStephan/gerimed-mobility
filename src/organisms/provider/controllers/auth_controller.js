import { Machine, assign } from 'xstate'

// Utils
import { extractStrapiErrors } from '../../../utils/js'
import { getAuthToken, setAuthToken, removeAuthToken } from '../../../utils/js/authToken'

// APIs
import {
  Login,
  User,
  Update,
  Register,
  Forgot,
  ResetPassword
} from './auth_api'

const AuthController = new Machine({
  id: 'AuthController',
  initial: 'ready',
  context: {
    user: null,
    enqueueSnackbar: null,
  },
  states: {
    ready: {
      always: [
        {
          cond: 'hasToken',
          target: '#AuthController.idle.user',
        },
        {
          target: '#AuthController.idle.guest'
        },
      ]
    },
    idle: {
      states: {
        user: {
          on: {
            GET_ME: {
              target: '#AuthController.loading.user',
            },
            UPDATE_ME: {
              target: '#AuthController.loading.update',
            },
            LOGOUT: {
              actions: ['removeToken', 'removeUserData'],
              target: '#AuthController.idle.guest'
            }
          }
        },
        guest: {
          on: {
            LOGIN: {
              target: '#AuthController.loading.login'
            },
            REGISTER: {
              target: '#AuthController.loading.register'
            },
            FORGOT: {
              target: '#AuthController.loading.forgot'
            },
            RESET_PASSWORD: {
              target: '#AuthController.loading.reset_password'
            }
          }
        }
      }
    },

    loading: {
      states: {
        user: User.state,
        update: Update.state,
        login: Login.state,
        register: Register.state,
        forgot: Forgot.state,
        reset_password: ResetPassword.state
      }
    }
  },
  on: {
    SET_NOTIFICATIONS_HANDLER: {
      actions: 'setNotificationsHandler'
    }
  }
}, {
  services: {
    ...User.service,
    ...Update.service,
    ...Login.service,
    ...Register.service,
    ...Forgot.service,
    ...ResetPassword.service
  },
  guards: {
    hasToken: () => !!getAuthToken()
  },
  actions: {
    logger: (_context, event) => {
      console.log(event)
    },
    setNotificationsHandler: assign({
      enqueueSnackbar: (_context, event) => event.enqueueSnackbar
    }),
    setToken: (_context, event) => {
      const {
        data: {
          data: { data: { signin: { jwt } } },
          carryData: { shouldRemember }
        }
      } = event

      setAuthToken(jwt, shouldRemember)
    },
    removeToken: () => removeAuthToken(),
    removeUserData: assign({
      user: null
    }),

    /**
     * API Actions
     */
    ...Login.action,
    ...User.action,
    ...Update.action,
    ...Register.action,
    ...Forgot.action,

    'errors.general.notify': (context, event) => {
      if(!context.enqueueSnackbar) return

      // Get the errors
      const { data } = event

      if(data.strapiErrors) {
        const errors = extractStrapiErrors(data) || []

        errors.forEach((err) => {
          context.enqueueSnackbar(err.message, {
            variant: 'error'
          })
        })
      } else {
        context.enqueueSnackbar('An nnknown error occured', {
          variant: 'error'
        })
        console.log(event)
      }
    },
  }
})

export {
  AuthController
}