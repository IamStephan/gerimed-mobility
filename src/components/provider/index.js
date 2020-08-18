import React from 'react'
import { ThemeProvider } from '@material-ui/core'

// Theme
import theme from './theme'

// Notifications
import { SnackbarProvider } from 'notistack'

const notiStyles = {
  success: { zIndex: 999 },
  error: { zIndex: 999 },
  warning: { zIndex: 999 },
  info: { zIndex: 999 },
};

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
      >
        { props.children }  
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Provider
