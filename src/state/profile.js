import { createStore } from 'react-hooks-global-state'

// Constants
import { PROFILE_ACTIONS } from '../constants/state'

/**
 * NOTE:
 * =====
 * This does need to be persisted since if the user is logged in
 * an api call is made anyway and the state is updated.
 * 
 * The private route updates the initial state and this initial state
 * is just here to infer the structure of the data
 */

export const { dispatch, useGlobalState } = createStore((state, action) => {
  switch(action.type) {
    case PROFILE_ACTIONS.initialSetup: return {
      ...state,
      auth: {
        ...state.auth,
        ...action.auth
      },
      info: {
        ...state.info,
        ...action.info
      },
      shipping: {
        ...state.shipping,
        ...action.shipping
      },
      settings: {
        ...state.settings,
        ...action.settings
      },
    }

    case PROFILE_ACTIONS.updateInfo: return {
      ...state,
      info: {
        ...state.info,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
      }
    }

    case PROFILE_ACTIONS.updateShipping: return {
      ...state,
      shipping: {
        ...state.shipping,
        street: action.street,
        suburb: action.suburb,
        postCode: action.postCode,
        province: action.province,
        country: action.country,
      }
    }

    case PROFILE_ACTIONS.updateSettings: return {
      ...state,
      settings: {
        ...state.settings,
        subscribeNews: action.subscribeNews
      }
    }
  }
}, {
  auth: {
    token: '',
  },
  info: {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  
  shipping: {
    street: '',
    suburb: '',
    postCode: '',
    province: '',
    country: '',
  },

  settings: {
    subscribeNews: false
  }
})