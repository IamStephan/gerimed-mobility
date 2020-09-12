import { Machine, assign } from 'xstate'

// utils
import { extractStrapiErrors, axiosMutationFactory } from '../../../../utils/js'

// Gatsby
import { navigate } from 'gatsby'

// Model
import { LoginMutation } from './model'

// Constants
import { TOKEN_KEY } from '../../../../constants/profile'

// Specific strapi error
const emailNeedsVerify = 'Auth.form.error.confirmed' // <== For some reason, this is allowed through graphQL, WT actual 🤬
const incorrectDetails = 'Auth.form.error.invalid'

const LocalState = new Machine({
  id: 'LoginUser',
  initial: 'idle',
  context: {
    showPassword: false,
    shouldRemember: false
  },
  states: {
    idle: {
      on: {
        LOGIN: {
          actions: 'setShouldRemember',
          target: 'loading'
        }
      }
    },
    loading: {
      invoke: {
        id: 'LoginUser',
        src: 'login',
        onDone: {
          actions: [
            'redirect'
          ],
          target: 'idle'
        },
        onError: {
          actions: 'notifyErrors',
          target: 'idle'
        }
      }
    }
  },
  on: {
    // Global event for ui toggle
    TOGGLEPASSWORD: {
      actions: 'togglePassword'
    }
  }
}, {
  actions: {
    notifyErrors: (context, { data }) => {
      if(data.strapiErrors) {
        let errors = extractStrapiErrors(data)

        errors.forEach((err) => {
          switch(err.id) {
            // There are cases where the notifications need to be custom
            case incorrectDetails: {
              context.notifications.enqueueSnackbar('Email or password is incorrect', {
                variant: 'error'
              })
              break
            }

            // this never actually gets fired when using graphql
            case emailNeedsVerify: {
              context.notifications.enqueueSnackbar('Your email is not verified, check your emails', {
                variant: 'error'
              })
              break
            }
  
            default: {
              context.notifications.enqueueSnackbar(err.message, {
                variant: 'error'
              })
            }
          }
        })

      } else {
        context.notifications.enqueueSnackbar(data.message, {
          variant: 'error'
        })
      }
    },
    redirect: (context, { data: { data: { data}}}) => {
      const token = data.login.jwt

      try {
        if(context.shouldRemember) {
          // set as local storage
          localStorage.setItem(TOKEN_KEY.jwt, token)
        } else {
          // set as sessionstorage
          sessionStorage.setItem(TOKEN_KEY.jwt, token)
        }

        navigate('/profile')
      } catch(e) {
        // Let the user know that they cannot log in due to browser restrictions
        context.notifications.enqueueSnackbar('Unable to properly log in due to browser restrictions', {
          variant: 'error'
        })
      }
      
    },
    setShouldRemember: assign({
      shouldRemember: (_context, event) => event.shouldRemember
    }),
    togglePassword: assign({
      showPassword: (context) => !context.showPassword
    })
  },
  services: {
    login: (_context, event) => {
      // GraphQL returns status code 200 even if there were some sort of error, like unauthorized|unauthenticated
      return axiosMutationFactory('http://localhost:1337/graphql', {
        query: LoginMutation,
        variables: {
          credentials: {
            identifier: event.identifier,
            password: event.password
          }
        }
      })
    }
  }
})

export {
  LocalState
}