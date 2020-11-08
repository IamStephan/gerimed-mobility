import { Machine, assign, actions, send } from 'xstate'

// Gatsby
import { navigate } from 'gatsby'

// URL
import { stringify, parse } from 'qs'
import { isEqual, get } from 'lodash'

const { pure } = actions

function filterFormBuilder(params) {
  const {
    categories = {},
    availability = {},
    search,
    min_price,
    max_price
  } = params

  // Default Values
  let query = {}
  let categoriesArray = []
  let availabilityArray = []

  // Array-like query
  for(const key in categories) {
    if(categories[key]) {
      categoriesArray.push(key)
    }
  }

  for(const key in availability) {
    if(availability[key]) {
      availabilityArray.push(key)
    }
  }

  // Query Builder
  if(categoriesArray.length) query.categories = categoriesArray
  if(availabilityArray.length) query.availability = availabilityArray
  if(search) query.search = search
  if(min_price) query.min_price = min_price
  if(max_price) query.max_price = max_price

  return query
}

function filterURLBuilder(params) {
  const {
    categories = [],
    availability = [],
    search,
    min_price,
    max_price
  } = params

  // Default Values
  let query = {}

  // Query Builder
  query.categories = categories
  query.availability = availability
  if(search) query.search = search
  if(min_price) query.min_price = min_price
  if(max_price) query.max_price = max_price

  return query
}

const LocalController = Machine({
  id: 'ShopFilterController',
  context: {
    setValue: null,
    getValues: null,
    categories: [],
    filters: {}
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        APPLY_FILTERS: {
          actions: ['applyFilters', 'navigateWithFilters']
        },

        /**
         * NOTE:
         * =====
         * These events should not touch the navbar
         */
        CHECK_FILTERS: {
          actions: 'checkFilters'
        },
        MATCH_FILTERS: {
          actions: ['matchFiltersWithForm']
        }
      }
    }
  }
}, {
  actions: {
    applyFilters: assign({
      filters: (_context, event) => {
        // When filters are applied reset the page aswell since it can change the results
        const { data } = event
  
        return filterFormBuilder(data)
      }
    }),
    navigateWithFilters: (context) => {
      let filterString = stringify(context.filters)
      
      navigate(`?${filterString}`)
    },
    checkFilters: pure((context) => {
      // Gatsby SSR
      if(typeof window === 'undefined') return send('IDLE')
  
      const search = window.location.search.substring(1)
      let filters
  
      try {
        filters = parse(search)
      } catch(e) {
        filters = context.filters
      }

      const filtersBuilt = filterURLBuilder(filters)
  
      if(!isEqual(context.filters, filtersBuilt)) {
        return send('MATCH_FILTERS', {
          data: filtersBuilt
        })
      }
    }),
    matchFiltersWithForm: assign({
      filters: (context) => {
        const { setValue, categories, filters } = context
        // Gatsby SSR
        if(typeof window === 'undefined') return

        // Get url params
        const search = window.location.search.substring(1)

        let preFilters
        try {
          preFilters = parse(search)
        } catch(e) {
          preFilters = context.filters
        }

        const filtersBuilt = filterURLBuilder(preFilters)

        // No need to update since its the same
        if(isEqual(context.filters, filtersBuilt)) return

        // Search
        setValue('search', get(filtersBuilt, 'search', ''), {
          isDirty: true
        })

        // Price
        setValue('min_price', get(filtersBuilt, 'min_price', ''), {
          isDirty: true
        })
      
        setValue('max_price', get(filtersBuilt, 'max_price', ''))

        // Categories
        categories.forEach((category) => {
          setValue('categories', {
            [category.name]: !!filtersBuilt.categories.includes(category.name)
          }, {
            isDirty: true
          })
        })
        
        // Availability
        setValue('availability', {
          available: !!filtersBuilt.availability.includes('available')
        }, {
          isDirty: true
        })
        setValue('availability', {
          instock: !!filtersBuilt.availability.includes('instock')
        }, {
          isDirty: true
        })

        return filters
      }
    })
  }
})

export {
  LocalController
}