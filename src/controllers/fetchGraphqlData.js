import { Machine, assign, send } from 'xstate'

// Utils
import { axiosQueryFactory } from '../utils/js'

const RETRY_LIMIT = 3
const REQUEST_TIMEOUT = 10000

const FetchGraphqlData = new Machine({
  initial: 'idle',
  context: {
    data: null,
    errors: null,
    graphqlQuery: null,
    graphqlVariables: null,
    retries: 0,
    // Lazy Loading
    containerRef: null,
    lazyLoadThreshold: 0.25,

    runOnce: true
  },
  states: {
    idle: {
      invoke: {
        src: 'lazyMode'
      },
      on: {
        LOAD: 'loading'
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
      always: [
        {target: 'success_final', cond: 'shouldRunOnce'}
      ]
    },
    success_final: {
      type: 'final'
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
    RESET_FETCHING: 'loading',
    SET_NEW_FETCH_CONTEXT: {
      actions: 'setNewFetchData'
    }
  }
}, {
  actions: {
    reset: assign({
      retries: 0,
      data: null
    }),
    resetFetching: send('RESET_FETCHING'),
    setNewFetchData: assign({
      graphqlQuery: (context, event) => event?.context?.graphqlQuery ? event.context.graphqlQuery : context.graphqlQuery,
      graphqlVariables: (context, event) => event?.context?.graphqlVariables ? event.context.graphqlVariables : context.graphqlVariables,
      retries: 0,
      errors: null
    }),
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
    limitNotReached: (context) => context.retries < RETRY_LIMIT,
    shouldRunOnce: (context) => context.runOnce
  },
  services: {
    lazyMode: (context) => (send) => {
      
      if(!window.IntersectionObserver || !context.containerRef){
        send('LOAD')
      } else {
        let observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if(entry.isIntersecting) {
              observer.disconnect()
              send('LOAD')
            }
          })
        }, {
          threshold: context.lazyLoadThreshold
        })

        observer.observe(context.containerRef.current)
      }
    },
    fetchData: (context) => {
      return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: context.graphqlQuery,
        variables: context.graphqlVariables || {}
      })
    }
  }
})

export {
  FetchGraphqlData
}