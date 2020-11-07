import { Machine, assign, send } from 'xstate'

// Model
import { ORDER_QUERY } from './model'

// Utils
import { axiosQueryFactory } from '../../../../utils/js'
import { getAuthToken } from '../../../../utils/js/authToken'

const RETRY_LIMIT = 3

const LocalController = Machine({
  id: 'PurchaseHistory',
  context: {
    page: 1,
    ordersCount: 0,
    orders: [],
    retries: 0,
    page_item_limit: 0
  },
  initial: 'ready',
  states: {
    ready: {
      entry: ['startOrdersLoading'],
    },
    idle: {
      on: {
        SET_PAGE: {
          actions: ['setPage'],
          target: 'loading'
        },
      }
    },
    loading: {
      invoke: {
        src: 'fetchOrderData',
        onDone: {
          target: 'idle',
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
        { target: 'fail' , actions: (_ctx, e) => console.log(e)}
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
    }
  },
  on: {
    FILTER_CHECK: {
      actions: 'deepFilterCompare'
    },
    LOAD_ORDERS: {
      target: 'loading'
    },
    IDLE: {
      target: 'idle'
    },
    RESET_FETCHING: 'loading',
  }
}, {
  actions: {
    reset: assign({
      retries: 0,
      orders: [],
      ordersCount: 0,
      page: 0
    }),
    resetFetching: send('RESET_FETCHING'),
    increaseRetries: assign({
      retries: (context) => context.retries + 1
    }),
    startOrdersLoading: send('LOAD_ORDERS'),
    setData: assign({
      orders: (_context, event) => {
        const { data: { data: { data } } } = event

        return data.getMyOrders
      },
      ordersCount: (_context, event) => {
        const { data: { data: { data } } } = event

        return data?.countMyOrders
      }
    }),
    setPage: assign({
      page: (_context, event) => {
        const { page } = event
        return Number(page)
      }
    }),
  },
  guards: {
    limitNotReached: (context) => context.retries < RETRY_LIMIT
  },
  services: {
    fetchOrderData: (context) => {
      const token = getAuthToken()

      return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: ORDER_QUERY,
        variables: {
          limit: context.page_item_limit,
          offset: (context.page - 1) * context.page_item_limit,
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    }
  }
})

export {
  LocalController
}