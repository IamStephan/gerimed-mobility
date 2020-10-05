import { Machine, assign, send } from 'xstate'

// URL
import { parse } from 'qs'

// Utils
import { axiosMutationFactory, axiosQueryFactory, extractStrapiErrors } from '../../../utils/js'
import { getAuthToken, setAuthToken, removeAuthToken } from '../../../utils/js/authToken'

// Models
import {
  LOGIN,
  REGISTER,
  FORGOT,
  RESET_PASSWORD,
  GET_USER,
  UPDATE_ME
} from '../models/auth_model'

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
        user: {
          invoke: {
            src: 'loading.user',
            onDone: {
              target: '#AuthController.idle.user',
              actions: ['user.setUser', 'loading.successUser']
            },
            onError: {
              target: '#AuthController.idle.user',
              actions: ['notify.errors', 'loading.failUser']
            }
          }
        },
        update: {
          invoke: {
            src: 'loading.update',
            onDone: {
              target: '#AuthController.idle.user',
              actions: ['update.setUser', 'loading.successUpdate']
            },
            onError: {
              target: '#AuthController.idle.user',
              actions: ['notify.errors', 'loading.failUpdate']
            }
          }
        },
        login: {
          invoke: {
            src: 'loading.login',
            onDone: {
              target: '#AuthController.idle.user',
              actions: ['setToken', 'login.setUser', 'loading.successLogin']
            },
            onError: {
              target: '#AuthController.ready',
              actions: ['notify.errors', 'loading.failLogin']
            }
          }
        },
        register: {
          invoke: {
            src: 'loading.register',
            onDone: {
              target: '#AuthController.idle.guest',
              actions: ['loading.successRegister']
            },
            onError: {
              target: '#AuthController.ready',
              actions: ['notify.errors', 'loading.failRegister']
            }
          }
        },
        forgot: {
          invoke: {
            src: 'loading.forgot',
            onDone: {
              target: '#AuthController.idle.guest',
              actions: ['loading.successForgot']
            },
            onError: {
              target: '#AuthController.ready',
              actions: ['notify.errors', 'deleteToken', 'loading.failForgot']
            }
          }
        },
        reset_password: {
          invoke: {
            src: 'loading.reset_password',
            onDone: {
              target: '#AuthController.idle.guest',
              actions: ['loading.successReset']
            },
            onError: {
              target: '#AuthController.ready',
              actions: ['notify.errors', 'loading.failReset']
            }
          }
        }
      }
    }
  },
  invoke: {
    src: 'tokenDetection'
  },
  on: {
    SET_NOTIFICATIONS_HANDLER: {
      actions: 'setNotificationsHandler'
    }
  }
}, {
  services: {
    tokenDetection: () => (send) => {
      if(typeof window === 'undefined') return

      function _onStorageSet() {}

      window.addEventListener('storageSet', _onStorageSet)

      return () => window.removeEventListener('storageSet', _onStorageSet)
    },
    'loading.user': (_context) => {
      const token = getAuthToken()

      return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: GET_USER
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    },
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
    },
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
    },
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
    },
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
    },
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
    'login.setUser': assign({
      user: (_context, event) => {
        const {
          data: {
            data: { data: { signin: { user } } }
          }
        } = event

        return user
      }
    }),
    'user.setUser': assign({
      user: (_context, event) => {
        const {
          data: {
            data: { data: { getMe } }
          }
        } = event

        return getMe
      }
    }),
    'update.setUser': assign({
      user: (_context, event) => {
        const {
          data: {
            data: { data: { updateMe } }
          }
        } = event

        return updateMe
      }
    }),

    /**
     * SUCCESS
     * =================
     */

    'loading.successLogin': (context) => {
      context.enqueueSnackbar('Successfully logged in.', {
        variant: 'success'
      })
    },

    'loading.successRegister': (context) => {
      context.enqueueSnackbar('Successfully registered. Please, check your email to confirm your account.', {
        variant: 'success'
      })
    },

    'loading.successReset': (context) => {
      context.enqueueSnackbar('Successfully reset your password, you can now login.', {
        variant: 'success'
      })
    },

    'loading.successForgot': (context) => {
      context.enqueueSnackbar('Successfully sent request. Please, check your emails.', {
        variant: 'success'
      })
    },

    'loading.successUpdate': (context) => {
      context.enqueueSnackbar('Successfully updated your account details.', {
        variant: 'success'
      })
    },

    'loading.successUser': (context) => {
      
    },

    /**
     * FAIL
     * ===============
     */

    'loading.failLogin': (context) => {
      
    },

    'loading.failRegister': (context) => {
      
    },

    'loading.failReset': (context) => {
      
    },

    'loading.failForgot': (context) => {
      
    },

    'loading.failUpdate': (context) => {
      
    },

    'loading.failUser': (context) => {
      
    },

    'notify.errors': (context, event) => {
      const { data } = event

      const errors = extractStrapiErrors(data) || []

      console.log(event)

      errors.forEach((err) => {
        context.enqueueSnackbar(err.message, {
          variant: 'error'
        })
      })
    }
  }
})

export {
  AuthController
}