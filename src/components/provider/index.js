import React from 'react'
import { ThemeProvider } from '@material-ui/core'

// Theme
import theme from './theme'

const Provider = props => {
  return (
    <ThemeProvider theme={theme}>
      { props.children }
    </ThemeProvider>
  )
}

export default Provider
