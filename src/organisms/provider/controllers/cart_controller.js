import { Machine, assign, send } from 'xstate'

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