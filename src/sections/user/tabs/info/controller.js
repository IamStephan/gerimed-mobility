import { Machine } from 'xstate'

const LocalState = new Machine({
  id: 'UserGenInfo',
  initial: 'idle',
  context: {

  },
  states: {
    idle: {
      on: {
        EDIT: 'edit'
      }
    },
    edit: {
      on: {
        SAVE: 'loading',
        CANCEL: 'idle'
      }
    },
    loading: {
      invoke: {
        src: 'updateUser'
      }
    }
  }
}, {

})

export {
  LocalState
}