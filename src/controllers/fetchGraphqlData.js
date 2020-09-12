import { Machine, assign } from 'xstate'

// API
import axios from 'axios'

const RETRY_LIMIT = 3
const REQUEST_TIMEOUT = 3000

/**
 * Data that needs to be provided:
 * ===============================
 *  id: string (for debugging)
 *  context: {
 *    query: string
 *  }
 */

const FetchGraphqlData = new Machine({
  initial: 'loading',
  context: {
    data: null,
    graphqlQuery: null,
    graphqlVariables: null,
    retries: 0,
  },
  states: {
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
        { target: 'fail' }
      ]
    },
    success: {
      type: 'final'
    },
    fail: {
      type: 'final'
    }
  }
}, {
  actions: {
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
         *  - graphql has a data field ( can be changed in the query, but this is a reusable controller )
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
    fetchData: (context) => {
      return axios.post(`http://localhost:1337/graphql`, {
        query: context.graphqlQuery,
        variables: context.graphqlVariables || {}
      })
    }
  }
})

export {
  FetchGraphqlData
}