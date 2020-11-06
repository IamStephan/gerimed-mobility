import { Machine, assign, send } from 'xstate'

// Model
import {
  TRACK_ORDER
} from './model'

// Utils
import { axiosQueryFactory } from '../../utils/js'

const RETRY_LIMIT = 3
const REQUEST_TIMEOUT = 10000

/**
 * NOTE:
 * =====
 * This is a modified version of the fetchGraphqlData
 */
const TrackMyOrderController = Machine({
  initial: 'idle',
  context: {
    data: null,
    errors: null,
    searchTerm: null,
    retries: 0,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      }
    },
    loading: {
      after: {
        [REQUEST_TIMEOUT]: {
          target: 'retry'
        }
      },
      invoke: {
        id: 'fetchQueryData',
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: 'setData'
        },
        onError: 'retry'
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
    success: {
      on: {
        FETCH: 'loading',
      }
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
    }
  },
  on: {
    RESET_FETCHING: 'loading'
  }
}, {
  actions: {
    reset: assign({
      retries: 0,
      data: null
    }),
    resetFetching: send('RESET_FETCHING'),
    increaseRetries: assign({
      retries: (context) => context.retries + 1
    }),
    setData: assign({
      data: (_context, event) => {
        /**
         * Destruction Explained:
         * =======================
         *  - the service itself returns data
         *  - axios returns data
         *  - graphql has a data field
         */
        const { data: { data: { data } } } = event

        return data
      }
    })
  },
  guards: {
    limitNotReached: (context) => context.retries < RETRY_LIMIT
  },
  services: {
    fetchData: (context, event) => {
      return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: TRACK_ORDER,
        variables: {
          reference: event.searchTerm
        }
      }, context.options)
    }
  }
})

export {
  TrackMyOrderController
}