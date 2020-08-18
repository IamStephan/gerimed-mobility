import React from 'react'
import { ThemeProvider } from '@material-ui/core'

// Theme
import theme from './theme'

// Notifications
import { SnackbarProvider } from 'notistack'

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
      >
        { props.children }  
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Provider
