import { Machine, assign, send } from 'xstate'

// Utils
import { axiosQueryFactory } from '../../utils/js'

// Constants
import { USER_TABS } from '../../constants/profile'
import { TOKEN_KEY } from '../../constants/profile'

// Model
import { GET_USER_INFO } from './model'

const RETRY_LIMIT = 3

const LocalState = Machine({
  id: 'GetUserData',
  context: {
    currentTab: USER_TABS.info,
    data: null,
    token: null
  },
  initial: 'loading',
  states: {
    loading: {
      entry: 'getToken',
      invoke: {
        src: 'loadUserInfo',
        onDone: {
          actions: 'setUserData',
          target: 'idle'
        },
        onError: {
          actions: 'notifyErrors',
          target: 'retry'
        }
      }
    },
    retry: {
      entry: ['increaseRetries'],
      always: [
        {
          target: 'loading',
          cond: 'limitNotReached'
        },
        { target: 'fail'}
      ]
    },
    fail: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            RESET: 'reset'
          }
        },
        reset: {
          entry: ['reset', 'resetFetching'],
        }
      },
    },
    idle: {

    }
  },
  on: {
    RESET_FETCHING: 'loading',
    SET_TAB: {
      actions: 'setTab'
    }
  }
}, {
  actions: {
    setTab: assign({
      currentTab: (_context, event) => event.tab
    }),
    getToken: assign({
      token: () => sessionStorage.getItem(TOKEN_KEY.jwt) || localStorage.getItem(TOKEN_KEY.jwt)
    }),
    reset: assign({
      retries: 0,
      data: null
    }),
    increaseRetries: assign({
      retries: (context) => context.retries + 1
    }),
    setUserData: assign({
      data: (_context, event) => {
        const { data: { data: { data: { meMore } } } } = event

        return {
          ...meMore
        }
      }
    }),
    resetFetching: send('RESET_FETCHING'),
  },
  guards: {
    limitNotReached: (context) => context.retries < RETRY_LIMIT,
  },
  services: {
    loadUserInfo: (context) => {
      return axiosQueryFactory('http://localhost:1337/graphql', {
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
  LocalState
}