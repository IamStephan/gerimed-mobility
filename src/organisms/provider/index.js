import React, { useEffect } from 'react'

// Material
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

// Controllers
import { AuthController } from './controllers/auth_controller'

// Xstate
import { interpret } from 'xstate'

// Hooks
import { useService } from '@xstate/react'

// Notifications
import { SnackbarProvider, useSnackbar } from 'notistack'

// Global Theme
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#FFFF01',
      main: '#FFFF01',
      dark: '#FFFF01'
    },
    secondary: {
      main: '#008835',
    }
  },
});

// Notification styles
const notiStyles = {
  success: { zIndex: 999 },
  error: { zIndex: 999 },
  warning: { zIndex: 999 },
  info: { zIndex: 999 },
};


// Create an event for token detections
if(typeof window !== 'undefined') {
  const eventSet = new Event('storageSet')
  const eventRemove = new Event('storageRemove')
  // Add
  const originalSetItemLocal = window.localStorage.setItem;
  const originalSetItemSession = window.sessionStorage.setItem;

  // Remove
  const originalRemoveItemLocal = window.localStorage.removeItem
  const originalRemoveItemSession = window.sessionStorage.removeItem

  // Add
  window.localStorage.setItem = function (...args) {
    window.dispatchEvent(eventSet)
    originalSetItemLocal.apply(this, args);
  }

  window.sessionStorage.setItem = function (...args) {
    window.dispatchEvent(eventSet)
    originalSetItemSession.apply(this, args);
  }

  // Remove
  window.localStorage.removeItem = function (...args) {
    window.dispatchEvent(eventRemove)
    originalRemoveItemLocal.apply(this, args);
  }

  window.sessionStorage.removeItem = function (...args) {
    window.dispatchEvent(eventRemove)
    originalRemoveItemSession.apply(this, args);
  }
}



export const AuthService = interpret(AuthController).start()

const AuthNotifications = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [, send] = useService(AuthService)

  useEffect(() => {
    send('SET_NOTIFICATIONS_HANDLER', {
      enqueueSnackbar
    })
  }, [])

  return null
}

const Provider = props => {
  return (
    <ThemeProvider
      theme={theme}
    >
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        classes={{
          variantSuccess: notiStyles.success,
          variantError: notiStyles.error,
          variantWarning: notiStyles.warning,
          variantInfo: notiStyles.info,
        }}
        preventDuplicate
      >
        <AuthNotifications />

        { props.children }  
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Provider
