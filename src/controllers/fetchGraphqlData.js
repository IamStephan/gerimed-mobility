import { Machine, assign } from 'xstate'

// API
import axios from 'axios'

const RETRY_LIMIT = 3
const REQUEST_TIMEOUT = 3000

const FetchGraphqlData = new Machine({
  initial: 'idle',
  context: {
    data: null,
    graphqlQuery: null,
    graphqlVariables: null,
    retries: 0,
    // Lazy Loading
    containerRef: null,
    lazyLoadThreshold: 0.25
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
      return axios.post(`${process.env.GATSBY_API_URL}/graphql`, {
        query: context.graphqlQuery,
        variables: context.graphqlVariables || {}
      })
    }
  }
})

export {
  FetchGraphqlData
}