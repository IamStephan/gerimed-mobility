import { Machine, assign } from 'xstate'

const CarouselController = new Machine({
  id: 'ProductCarouselController',
  initial: 'ready',
  context: {
    index: 0
  },
  states: {
    ready: {
      on: {
        SET_INDEX: {
          actions: 'setIndex'
        },
        RESET_INDEX: {
          actions: 'resetIndex'
        }
      }
    },
  }
}, {
  actions: {
    setIndex: assign({
      index: (context, event) => event.index
    }),
    resetIndex: assign({
      index: 0
    })
  }
})

export {
  CarouselController
}