import React, { useLayoutEffect } from 'react'

// Gatsby
import { navigate } from 'gatsby'

const NotFound = () => {
  useLayoutEffect(() => {
    navigate('/')
  }, [])

  return null
}

export default NotFound
