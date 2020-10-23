import { Machine, assign } from 'xstate'

// Utils
import { throttle } from 'lodash'

const SHOW_HIDE_TRIGGER_DISTANCE = 150
const THROTTLE_WAIT = 250

const LocalState = new Machine({
  id: 'NavbarController',
  initial: 'normal',
  context: {
    isTransEnabled: false,
    isDrawerOpen: false
  },
  states: {
    normal: {
      invoke: {
        src: 'normalNavbarScroll'
      },
      initial: 'show',
      states: {
        show: {
          on: {
            SHOW: undefined,
            HIDE: 'hide'
          }
        },
        hide: {
          on: {
            SHOW: 'show',
            HIDE: undefined
          }
        },
      },
      on: {
        TRANS: 'trans',
        NORMAL: undefined
      }
    },

    trans: {
      invoke: {
        src: 'transNavbarScroll'
      },
      on: {
        NORMAL: 'normal',
        TRANS: undefined
      }
    }
  },
  on: {
    TOGGLE_DRAWER: {
      actions: ['toggleDrawer']
    }
  }
}, {
  actions: {
    toggleDrawer: assign({
      isDrawerOpen: (context) => !context.isDrawerOpen
    })
  },
  services: {
    normalNavbarScroll: (context) => (send) => {
      let prevScrollPos = window.pageYOffset
      let currentScrollPos = window.pageYOffset
      
      if(context.isTransEnabled && currentScrollPos < SHOW_HIDE_TRIGGER_DISTANCE) {
        send('TRANS')
      }

      const onScroll = throttle(() => {
        currentScrollPos = window.pageYOffset

        if(context.isTransEnabled && currentScrollPos < SHOW_HIDE_TRIGGER_DISTANCE) {
          send('TRANS')
        }

        if(prevScrollPos > currentScrollPos || currentScrollPos < SHOW_HIDE_TRIGGER_DISTANCE) {
          send('SHOW')
        } else {
          send('HIDE')
        }

        prevScrollPos = currentScrollPos
      }, THROTTLE_WAIT, {
        trailing: true
      })

      window.addEventListener('scroll', onScroll)

      // Clear scroll listener
      return () => window.removeEventListener('scroll', onScroll)
    },

    transNavbarScroll: () => (send) => {
      const onScroll = throttle(() => {
        let currentScrollPos = window.pageYOffset

        if(currentScrollPos > SHOW_HIDE_TRIGGER_DISTANCE) {
          send('NORMAL')
        }
      }, THROTTLE_WAIT, {
        trailing: true
      })

      window.addEventListener('scroll', onScroll)

      // Clear scroll listener
      return () => window.removeEventListener('scroll', onScroll)
    }
  }
})
export {
  LocalState
}