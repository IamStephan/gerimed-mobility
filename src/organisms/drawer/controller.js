import { Machine, assign } from 'xstate'

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
    /**
     * NOTE:
     * =====
     * This is super frustrating. React and xstate are not
     * two way data binding. This means one has to be the source of truth
     * or the both should be. I want xstate to be the controller therefore
     * I cannot be reactive to prop changes unless the view layer gets
     * overly complicated.
     * 
     * What i ended up doing is look at the dimmers opacity to see what the intent
     * of the view is. Then set the zindex on the view layer BECAUSE the slider component
     * completely ignores the css pointer events property. 😠
     */
    transitionDetection: (context) => (send) => {
      // Gatsby SSR
      if(typeof window === 'undefined') return

      function _handleTransitionStart() {
        const opacity = Number(window.getComputedStyle(context.dimmerRef.current).getPropertyValue("opacity"))

        if(opacity < 0.5) {
          send('SET_SHOULD_UNHIDE')
        }
      }

      function _handleTransitionEnd() {
        const opacity = Number(window.getComputedStyle(context.dimmerRef.current).getPropertyValue("opacity"))

        if(opacity < 0.5) {
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