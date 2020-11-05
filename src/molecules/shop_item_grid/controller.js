import { Machine, assign, actions, send } from 'xstate'

// Gatsby
import { navigate } from 'gatsby'

// Model
import { ProductsQuery } from './model'

// Utils
import { isEqual, set } from 'lodash'
import { axiosQueryFactory } from '../../utils/js'
import { parse, stringify } from 'qs'

const { pure } = actions
const RETRY_LIMIT = 3

function queryBuilder(filters = {}) {
  let query = {}

  // Query Builder
  if(filters.search) query.name_contains = filters.search
  if(filters.categories) set(query, 'categories.name_contains', filters.categories)
  if(filters.min_price) query.price_gte = filters.min_price
  if(filters.max_price) query.price_lte = filters.max_price

  if(filters.availability) query.isLimited= false
  /**
   * TODO
   * =====
   *  - Add check for quantity and variants
   */

  return query
}

const LocalController = Machine({
  id: 'ShopGrid',
  context: {
    filter: {},
    page: 1,
    productCount: 0,
    products: [],
    retries: 0,
    page_item_limit: 0
  },
  initial: 'ready',
  states: {
    ready: {
      entry: ['startProductLoading'],
    },
    idle: {
      entry: ['getPage'],
      on: {
        SET_PAGE: {
          actions: ['setPage', 'navigateToPage'],
          target: 'loading'
        },
      }
    },
    loading: {
      entry: 'getFilters',
      invoke: {
        src: 'fetchProductData',
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
    LOAD_PRODUCTS: {
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
      products: [],
      productCount: 0,
      page: 0
    }),
    resetFetching: send('RESET_FETCHING'),
    increaseRetries: assign({
      retries: (context) => context.retries + 1
    }),
    getFilters: assign({
      filter: (context, _event) => {
        // Gatsby SSR
        if(typeof window === 'undefined') return context.filter

        const search = window.location.search.substring(1)

        let filterParams

        try {
          filterParams = parse(search)
        } catch(e) {
          return context.filter
        }

        return queryBuilder(filterParams)
      }
    }),
    startProductLoading: send('LOAD_PRODUCTS'),
    deepFilterCompare: pure((context, event) => {
      // Gatsby SSR
      if(typeof window === 'undefined') return send('IDLE')
  
      const search = window.location.search.substring(1)
      let filters
  
      try {
        filters = parse(search)
      } catch(e) {
        filters = context.filter
      }

      const query = queryBuilder(filters)
  
      if(!isEqual(context.filter, query) || context.page !== filters.page) {
        return send('LOAD_PRODUCTS')
      }
    }),
    setData: assign({
      products: (_context, event) => {
        /**
         * Destruction Explained:
         * =======================
         *  - the service itself returns data
         *  - axios returns data
         *  - graphql has a data field
         */
        const { data: { data: { data } } } = event

        return data.products
      },
      productCount: (_context, event) => {
        /**
         * Destruction Explained:
         * =======================
         *  - the service itself returns data
         *  - axios returns data
         *  - graphql has a data field
         */
        const { data: { data: { data } } } = event

        return data?.productsConnection?.aggregate?.count
      }
    }),
    getPage: assign({
      page: (context, event) => {
        if(typeof window === 'undefined') return

        const search = window.location.search.substring(1)
        let filters

        try {
          filters = parse(search)
        } catch(e) {
          filters = context.filters
        }

        return Number(filters.page) || 1
      }
    }),
    setPage: assign({
      page: (_context, event) => {
        const { page } = event
        

        return Number(page)
      }
    }),
    navigateToPage: (context, event) => {
      // Gatsby SSR
      if(typeof window === 'undefined') return

      const search = window.location.search.substring(1)
      let filters

      try {
        filters = parse(search)
      } catch(e) {
        filters = context.filters
      }

      let filtersAndPage = {
        ...filters,
        page: context.page
      }

      navigate(`?${stringify(filtersAndPage)}`)
    }
  },
  guards: {
    limitNotReached: (context) => context.retries < RETRY_LIMIT
  },
  services: {
    fetchProductData: (context) => {
      // Gatsby SSR
      if(typeof window === 'undefined') return

      const search = window.location.search.substring(1)
      let filters
  
      try {
        filters = parse(search)
      } catch(e) {
        filters = context.filters
      }

      let page = Number(filters.page) || 1

      return axiosQueryFactory(`${process.env.GATSBY_API_URL}/graphql`, {
        query: ProductsQuery,
        variables: {
          limit: context.page_item_limit,
          offset: (page - 1) * context.page_item_limit,
          filter: context.filter
        }
      })
    }
  }
})

export {
  LocalController
}