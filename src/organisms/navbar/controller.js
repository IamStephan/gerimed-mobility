import { Machine, assign } from 'xstate'

const SHOW_HIDE_TRIGGER_DISTANCE = 150

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

      function onScrollNormal() {
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
      }

      window.addEventListener('scroll', onScrollNormal)

      // Clear scroll listener
      return () => window.removeEventListener('scroll', onScrollNormal)
    },

    transNavbarScroll: () => (send) => {
      function onScrollTrans() {
        let currentScrollPos = window.pageYOffset

        if(currentScrollPos > SHOW_HIDE_TRIGGER_DISTANCE) {
          send('NORMAL')
        }
      }

      window.addEventListener('scroll', onScrollTrans)

      // Clear scroll listener
      return () => window.removeEventListener('scroll', onScrollTrans)
    }
  }
})
export {
  LocalState
}