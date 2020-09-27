import { Machine, assign } from 'xstate'
import { send } from 'xstate/lib/actionTypes'

const LocalContoller = Machine({
  id: 'DrawerConroller',
  context: {
    dimmerRef: null,
    shouldBeHidden: true
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        SET_DIMMER_REF: {
          actions: 'setDimmerRef',
          target: 'ready'
        }
      }
    },
    ready: {
      on: {
        SET_SHOULD_HIDE: {
          actions: 'setShouldHide'
        },
        SET_SHOULD_UNHIDE: {
          actions: 'setShouldUnhide'
        }
      },
      invoke: {
        src: 'transitionDetection'
      }
    }
  }
}, {
  actions: {
    setDimmerRef: assign({
      dimmerRef: (_context, event) => event.dimmerRef
    }),
    setShouldHide: assign({
      shouldBeHidden: true
    }),
    setShouldUnhide: assign({
      shouldBeHidden: false
    }),
  },
  services: {
    transitionDetection: (context, event) => (send) => {
      // Gatsby SSR
      if(typeof window === 'undefined') return

      function _handleTransitionStart() {
        const opacity = Number(window.getComputedStyle(context.dimmerRef.current).getPropertyValue("opacity"))

        if(opacity < 0.5) {
          /**
           * The transition started and is about to open
           */
          console.log('SHOW')
          send('SET_SHOULD_UNHIDE')
        }
      }

      function _handleTransitionEnd() {
        const opacity = Number(window.getComputedStyle(context.dimmerRef.current).getPropertyValue("opacity"))

        if(opacity < 0.5) {
          /**
           * The transition ended and is closed
           */
          console.log('HIDE')
          send('SET_SHOULD_HIDE')
        }
      }

      context.dimmerRef.current.addEventListener('transitionstart', _handleTransitionStart)
      context.dimmerRef.current.addEventListener('transitionend', _handleTransitionEnd)

      return () => {
        context.dimmerRef.current.removeEventListener('transitionstart', _handleTransitionStart)
        context.dimmerRef.current.removeEventListener('transitionend', _handleTransitionEnd)
      }
    }
  }
})

export {
  LocalContoller
}