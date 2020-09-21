import { Machine, assign, send } from 'xstate'

// Utils
import { axiosMutationFactory, axiosQueryFactory } from '../../utils/js'

// Models
import {
  LOGIN
} from './model'

// Constants
import { KEYS } from '../../constants/localStorage'

/**
 * NOTE:
 * ======
 * UI components using the global controller
 * has to be completely submissive towards it
 * 
 * UI aware states:
 * ================
 * These states should only be aware that the ui
 * can depend on these states but should never
 * actively do anything to the UI (e.g. Navigating)
 */

const CartController = new Machine({
  id: 'CartController',
  context: {
    cart: null
  },
  initial: 'ready',
  states: {
    ready: {},
    idle: {
      initial: 'idle',
      states: {
        idle: {},
        loading: {},
        fail: {},
        retrying: {}
      }
    }
  }
})

export {
  CartController
}