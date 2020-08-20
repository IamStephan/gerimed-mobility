import { createStore } from 'react-hooks-global-state'

// Constants
import { NAV_BAR_ACTIONS } from '../constants/state'

export const { dispatch, useGlobalState } = createStore((state, action) => {
  switch(action.type) {
    case NAV_BAR_ACTIONS.peekNavbar: return {
      ...state,
      navbarPeek: true
    }

    case NAV_BAR_ACTIONS.hideNavbarpeek: return {
      ...state,
      navbarPeek: false
    }
  }
}, {
  navbarPeek: false
})